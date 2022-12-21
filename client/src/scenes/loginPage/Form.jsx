import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Card } from 'primereact/card';

import  logo  from '../../assets/codebridge.png';

import "./form.css";


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  company: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3002/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3002/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <div className="form">
          <div className="flex justify-content-center">
          <Card>
            <div className="card">
              <form onSubmit={handleSubmit} className="p-fluid">
                {isRegister && (
                  <>
                  <img src={logo} alt="codebridge logo"/>
                  <h3 className="text-center">Register</h3>
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="firstName"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          autoFocus
                        />
                        <label
                          htmlFor="firstName"
                        >
                          First Name*
                        </label>
                      </span>
                    </div>
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="lastName"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          autoFocus
                        />
                        <label
                          htmlFor="lastName"
                        >
                          Last Name*
                        </label>
                      </span>
                    </div>
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="company"
                          name="company"
                          value={values.company}
                          onChange={handleChange}
                          autoFocus
                        />
                        <label
                          htmlFor="company"
                        >
                          Company*
                        </label>
                      </span>
                    </div>
                    <div className="field">
                    <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                    </div>
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="email"
                        >
                          Email*
                        </label>
                      </span>
                    </div>
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          toggleMask
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        <label
                          htmlFor="password"
                        >
                          Password*
                        </label>
                      </span>
                    </div>
                  </>
                )}
                {isLogin && (
                  <>
                  <img src={logo} alt="codebridge logo"/>
                  <h3>Log In to Customer Relationship Management</h3>
                  <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          name="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="email"
                        >
                          Email*
                        </label>
                      </span>
                    </div>
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          toggleMask
                          feedback={false}
                        />
                        <label
                          htmlFor="password"
                        >
                          Password*
                        </label>
                      </span>
                    </div>
                </>
                )}
                {/* BUTTONS */}
                <div className = "buttonSubmit">
                <Button type="submit" className="mt-2">
                    {isLogin ? "LOGIN" : "REGISTER"}
                  </Button>
                  </div>
                  <Typography
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                    sx={{
                      textDecoration: "underline",
                      color: palette.primary.main,
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.light,
                      },
                    }}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up here."
                      : "Already have an account? Login here."}
                  </Typography>
              </form>
            </div>
        </Card>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Form;
