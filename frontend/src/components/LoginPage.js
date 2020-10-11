import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "./actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form,Input, Button, Typography } from 'antd';
import { useDispatch} from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('')
  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.status.success) {
                window.localStorage.setItem('userId', response.payload.userId);
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("..")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const { values,touched, errors,isSubmitting,handleChange,handleBlur, handleSubmit } = props;
        return (
          <div className="container">
            <div className=" container mt-5 col-mg-6 col-lg-6 bg-light">
             <Title level={2}>Log In</Title>
              <Form.Item required>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
             
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                <div>
                  <Button type="button" htmlType="submit" className="login-form-button btn-info" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </Button>
                </div>
                <a href="/register"> Or register now!</a>
              </Form.Item>
            
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
            <div>
            </div>
            </form>
            </div>
            </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);