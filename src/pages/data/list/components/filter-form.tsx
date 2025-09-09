import { roleList } from '@/config/const';
import { Button, Col, Form, Input, Row, Select, Space,DatePicker } from 'antd';
import type React from 'react';
const { RangePicker } = DatePicker;
const FilterForm: React.FC<{ setPayload: (payload: any) => void }> = ({ setPayload }) => {

  const [form] = Form.useForm();
  const onFinish = ()=>{
    const values =form.getFieldsValue()
    console.log(values)
    setPayload(values)
  }
  const reset = () => {
    form.resetFields();
    setPayload({})
  }

  const add = () => {
    
  }
  return (
    <Form
      form={form}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 19,
      }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
          <Form.Item name="nickname" label="用户名称">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
          <Form.Item name="role" label="角色">
            <Select options={roleList} allowClear />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
          <Form.Item name="created_at" label="创建时间">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item
            wrapperCol={{
              style: {
                textAlign: 'right',
              },
            }}
          >
            <Space>
              <Button onClick={reset}>重置</Button>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="primary" onClick={add}>新增</Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterForm;
