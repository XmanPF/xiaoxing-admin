import { getUsers } from '@/apis/user';
import { UserRecord } from '@/apis/user/types';
import Icon from '@/components/icon';
import PageContainer from '@/components/page-container';
import { usePagination } from 'ahooks';
import { Button, Card, Row, Space, Table, TableProps, Popconfirm, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadPage from './components/upload';
import { executePackage, getPackageList, submit } from '@/apis/job';
import AuthModal from './components/authModal';
import { set } from 'nprogress';

const QueryTable: React.FC = () => {

  const columns: TableProps<UserRecord>['columns'] = [
  {
    title: '包名',
    key: 'nickname',
    dataIndex: 'nickname',
  },
  {
    title: '用户名',
    key: 'nickname',
    dataIndex: 'nickname',
  },
  {
    title: '公司名',
    key: 'companyName',
    dataIndex: 'companyName',
  },
  {
    title: '上传时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    align: 'center',
    render: (text, record) => {
      return <>
        <Popconfirm
          title="确认删除？"
          okText="是"
          cancelText="否"
        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>
        <Button type="link">下载</Button>
        <Button type="link" onClick={excute(record)}>执行</Button>
      </>
    },
  },
];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [payload, setPayload] = useState({});
  const [uploadVisible, setUploadVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const { data, loading, pagination } = usePagination(
    async ({ current, pageSize }) => {
      const res = await getPackageList({ ...payload, pageIndex: current, pageSize });
      return {
        list: res.data.list,
        total: res.data.total,
      };
    },
    {
      refreshDeps: [payload],
    },
  );

  useEffect(() => {
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const excute = (record) => {
    setFormData(record);
    setAuthVisible(true);
  }

   const onAuthOk = async (payload) => {
    try {
      const { packageId } = formData as any;
      await executePackage({ packageId, ...payload });
      message.success('操作成功');
      setAuthVisible(false);
    } catch (error) {
      message.error('操作失败');
    }
  }

  return (
    <PageContainer
      size="large"
    >
      <Space direction="vertical" size="large">
        <Card
          bordered={false}
          styles={{
            body: {
              paddingBlock: '0px 8px 32px 8px',
            },
          }}
        >
         <Button onClick={() => setUploadVisible(true)}>上传数据包</Button>
        </Card>
        <Card
          bordered={false}
          className="with-table"
          // title={`总共 ${pagination.total.toLocaleString()} 条`}
          extra={
            <Row justify="space-between" align="middle">
              <Space>
                {selectedRowKeys.length > 0 && (
                  <>
                    <Button icon={<Icon name="trash" />} danger>
                      删除
                    </Button>
                  </>
                )}
              </Space>
            </Row>
          }
        >
          <Table<UserRecord>
            columns={columns}
            loading={loading}
            rowKey="id"
            dataSource={data?.list}
            rowSelection={rowSelection}
            pagination={pagination}
          />
        </Card>
        {uploadVisible && <UploadPage onCancel={() => setUploadVisible(false)} />}
        {authVisible && <AuthModal onOk={onAuthOk} formData={formData} onCancel={() => { setAuthVisible(false) }} />}
        
      </Space>
    </PageContainer>
  );
};

export default QueryTable;
