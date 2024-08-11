import React from "react";
import { Button, Form, Input, message } from "antd";
import { login } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/auth.context";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = React.useContext(AuthContext);
  const onFinish = async (values) => {
    try {
      const res = await login(values);

      if (res && res.EC === 0) {
        localStorage.setItem("AccessToken", res.ACCESSTOKEN);
        localStorage.setItem("isAuthenticated", true);
        message.success(res.EM);
        navigate("/home");
        setAuth({
          isAuthenticated: true,
          user: res?.DATA,
        });
      }
      if (res && res.EC === 1) {
        message.warning(res.EM);
      }
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className="container my-4">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div>
        Không có tài khoản <a href="/register">Đăng ký</a>
      </div>
    </div>
  );
};

export default Login;
