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
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from 'antd';
import type React from 'react';

const AccountPage: React.FC = () => {
  return (
    <PageContainer size="middle" title="Account management">
      <Form
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
                <Form.Item name="avatar">
                  <Space align="center" size="middle">
                    <Button>上传数据包</Button>
                  </Space>
                </Form.Item>
                <Divider />
                <Row gutter={24}>
                  <Col xs={24} md={12} lg={24} xl={12}>
                    <Form.Item name="prefix" label="模型选择">
                      <Select>
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
            <Button type="primary">执行操作</Button>
          </Col>
        </Row>
      </Form>
    </PageContainer>
  );
};

export default AccountPage;
