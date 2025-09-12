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
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { submit, uploadPackage } from '@/apis/job';
import { UploadOutlined } from "@ant-design/icons";

const UploadPage: React.FC<any> = ({ onCancel }) => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log('Success:', values);
    const res = await uploadPackage(values);
    if (res.message) {
      message.success('操作成功');
      onCancel()
    }

  }

  const uploadProps: any = {
    name: 'file',
    action: `${import.meta.env.VITE_API_BASE_URL}/api/common/uploadFile`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal
      destroyOnClose={true}
      title="弹窗"
      visible={true}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={800}
    >
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
            <Col xs={24} lg={24}>
              <Card bordered={false}>
                <Form.Item name="fileUrl" required>
                    <Upload
                      {...uploadProps}
                    >
                      <Button>上传数据包</Button>
                    </Upload>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Space>
        <Divider />
      </Form>
    </Modal>
  );
};

export default UploadPage;
