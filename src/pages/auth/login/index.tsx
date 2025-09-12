import { login } from '@/apis/auth';
import type { LoginData } from '@/apis/auth/types';
import { getModelList } from '@/apis/job';
import type { HttpError } from '@/apis/types';
import { DEFAULT_ROUTE } from '@/router/routes';
import { setModelList, setToken, setUserInfo } from '@/utils/token';
import { useBoolean } from 'ahooks';
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Typography,
} from 'antd';
import { pick } from 'lodash';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { Paragraph, Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm<FieldType>();
  const [submitting, { set: setSubmitting }] = useBoolean(false);
  const navigate = useNavigate();
  const { redirect } = useParams();
  const [error, setError] = useState<string>();

  const onFinish = async (values: FieldType) => {
    setSubmitting(true);
    try {
      const formData = pick(values, ['userName', 'password']) as LoginData;
      console.log('formData', formData)
      const {
        data
      } = await login(formData);
      setToken(data.token);
      setUserInfo(data)
      setError(undefined);
      message.success('登陆成功 🎉');
      const { data: list } = await getModelList()
      setModelList(list || [])
      navigate(redirect ?? DEFAULT_ROUTE, {
        replace: true,
      });
    } catch (e) {
      if (e) {
        setError((e as unknown as HttpError).message);
      } else {
        setError('System Error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Title level={2}>效行管理后台</Title>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form
        form={form}
        layout="vertical"
        size="large"
        variant="filled"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Username is required',
            },
          ]}
        >
          <Input placeholder="Username/Email" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={submitting}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
