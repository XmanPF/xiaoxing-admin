import { getUsers } from '@/apis/user';
import { UserRecord } from '@/apis/user/types';
import Icon from '@/components/icon';
import PageContainer from '@/components/page-container';
import { usePagination } from 'ahooks';
import { Button, Card, Row, Space, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import FilterForm from './components/filter-form';

const columns: TableProps<UserRecord>['columns'] = [
  {
    title: '用户名',
    key: 'nickname',
    dataIndex: 'nickname',
  },
  {
    title: '角色',
    key: 'username',
    dataIndex: 'username',
  },
  {
    title: '创建时间',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    align: 'center',
    render: () => {
      return <>
      <Button type='link' danger>删除</Button>
      <Button type="link">停用</Button>
      </>
    },
  },
];
const QueryTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [payload, setPayload] = useState({});
  const { data, loading, pagination } = usePagination(
    async ({ current, pageSize }) => {
      const res = await getUsers({ ...payload,page: current, pageSize });
      return {
        list: res.data,
        total: res.meta.total,
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
          <FilterForm setPayload={setPayload} />
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
      </Space>
    </PageContainer>
  );
};

export default QueryTable;
