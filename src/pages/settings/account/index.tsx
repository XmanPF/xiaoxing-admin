import Icon from '@/components/icon';
import PageContainer from '@/components/page-container';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  List,
  message,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from 'antd';
import type React from 'react';
import {submit} from '@/apis/job';

const AccountPage: React.FC = () => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log('Success:', values);
    const res = await submit(values);
    if(res.code === 0){
      message.success('操作成功');
    }
  }

  return (
    <PageContainer size="middle" title="Account management">
      <Form
        form={form}
        initialValues={{
          language: 'en',
          timezone: '8',
          prefix: '86',
        }}
        layout="vertical"
      >
        <Space size="large" direction="vertical">
          <Row >
            <Col xs={24} lg={16}>
              <Card bordered={false}>
                <Form.Item name="avatar" required>
                  <Space align="center" size="middle">
                    <Button>上传数据包</Button>
                  </Space>
                </Form.Item>
                <Divider />
                <Row gutter={24}>
                  <Col xs={24} md={12} lg={24} xl={12}>
                    <Form.Item name="mode" label="模型选择" required>
                      <Select mode='multiple' placeholder="请选择模型">
                        <Select.Option value="86">+86</Select.Option>
                        <Select.Option value="87">+87</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Space>
        <Divider />
        <Row justify="start">
          <Col>
            <Button type="primary" onClick={handleSubmit}>执行操作</Button>
          </Col>
        </Row>
      </Form>
    </PageContainer>
  );
};

export default AccountPage;
