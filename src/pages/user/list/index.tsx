import { getUsers, delUser, addUser } from '@/apis/user';
import { UserRecord } from '@/apis/user/types';
import Icon from '@/components/icon';
import PageContainer from '@/components/page-container';
import { usePagination } from 'ahooks';
import { Button, Card, Row, Space, Table, TableProps, Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react';
import FilterForm from './components/filter-form';
import AddModal from './components/addModal';
import AuthModal from './components/authModal';
import { authorization } from '@/apis/job';


const QueryTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [payload, setPayload] = useState({});
  const [formData, setFormData] = useState({});
  const [addVisible, setAddVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const { data, loading, pagination } = usePagination(
    async ({ current, pageSize }) => {
      const res:any = await getUsers({ ...payload, pageIndex: current, pageSize });
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

  const handleAuth:any = (record) => {
    setFormData(record);
    setAuthVisible(true);
  }

  const handleEdit = (record) => () => {
    setAddVisible(true);
    setFormData(record);
  }

  const onAuthOk = async (payload) => {
    try {
      const { userId } = formData as any;
      await authorization({ userId, ...payload });
      message.success('操作成功');
      setAuthVisible(false);
    } catch (error) {
      message.error('操作失败');
    }
  }

  const onAddOk = async (payload) => {
    try {
      const { userId } = formData as any;
      await addUser(userId ? { ...{ userId }, ...payload } : payload);
      message.success('操作成功');
      setAddVisible(false);
    } catch (error) {
      message.error('操作失败');
    }
  }

  const handleDel: any = async (record) => {
    await delUser({ userId: record.userId });
    message.success('删除成功');
  }

  const columns: TableProps<UserRecord>['columns'] = [
    {
      title: '用户名称',
      key: 'nikeName',
      dataIndex: 'nikeName',
    },
    {
      title: '公司名称',
      key: 'companyName',
      dataIndex: 'companyName',
    },
    {
      title: '角色',
      key: 'userType',
      dataIndex: 'userType',
      render: (text) => text === 1 ? '公司' : '个人',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 240,
      align: 'center',
      render: (text, record) => {
        return <>
          <Popconfirm
            title="确认删除？"
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger onClick={handleDel(record)}>删除</Button>
          </Popconfirm>
          <Button type="link" onClick={handleAuth(record)}>授权</Button>
          <Button type="link" onClick={handleEdit(record)}>编辑</Button>
        </>
      },
    },
  ];

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
          <FilterForm setPayload={setPayload} handleAdd={() => {
            setAddVisible(true)
            setFormData({})
          }} />
        </Card>
        <Card
          bordered={false}
          className="with-table"
          title={`总共 ${pagination.total.toLocaleString()} 条`}
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
        {addVisible && <AddModal onOk={onAddOk} formData={formData} onCancel={() => { setAddVisible(false) }} />}
        {authVisible && <AuthModal onOk={onAuthOk} formData={formData} onCancel={() => { setAuthVisible(false) }} />}
      </Space>
    </PageContainer>
  );
};
export default QueryTable;
