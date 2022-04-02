import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { updateAuthorizationToken } from "../src/index";
const antIcon = <LoadingOutlined style={{ fontSize: 24, display: 'block' }} spin />;

const Login = () => {
    const initialstate = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        login: false,
        loading: false
    }
    const [FormData, setFormData] = useState(initialstate);
    const { email, password, emailError, passwordError, loading } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    function validate() {
        let passwordError = "";
        let emailError = "";
        // eslint-disable-next-line
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email || reg.test(email) === false) {
            emailError = "Invalid Email";
        }
        if (!password) {
            passwordError = "Password is required";
        }
        if (passwordError || emailError) {
            setFormData({
                ...FormData,
                passwordError,
                emailError
            })
            return false;
        }
        else {
            setFormData({
                ...FormData,
                title: "",
                data: "",
                metaDescription: "",
                metaTitle: "",
                author: "",
                category: ""
            })
        }
        return true;
    }

    const handleKeypress = e => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            // validation()
            LoginApi();
        }
    };

    const LoginApi = () => {
        if (validate()) {

            setFormData({
                ...FormData,
                loading: true
            })
            const link = "users/login"

            axios.post(link,
                {
                    email: email,
                    password: password
                })
                .then((res) => {
                    if (res.data.success === true) {
                        // localStorage.clear();
                        localStorage.setItem('Login', true)
                        localStorage.setItem('x-auth-token', res.data.token);
                        updateAuthorizationToken(res.data.token);
                        setFormData({
                            ...FormData,
                            login: true,
                            token: res.data.token,
                            loading: false
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                    message.error('Email or Password is invalid');
                    // message.error(res.message)
                    setFormData({
                        ...FormData,
                        loading: false
                    })
                });
        }
    }

    const check = localStorage.getItem('Login')
    return (
        check === "true" ?
            <Redirect to="/dashboard" />
            :
            <React.Fragment>
                <div className="col-11 mx-auto pt-3 " >
                    <div className=" mx-auto row   marginTop">
                        <div className="col-md-6 col-11 mx-auto mt-2 bg-white p-5 shadow Radius_4">
                            {/* <div className="col-md-6 col-10 mx-auto"> */}
                            {/* <img src={logo} alt="" className=" mx-auto"></img> */}
                            <h3 className="text-center"> Admin Panel</h3>
                            {/* </div> */}

                            <form className="pt-4">
                                <div className="">
                                    <input type="email" className="form-control overflow-hidden" id="exampleInputEmail1" placeholder="Enter email"
                                        name="email" value={email} onChange={onHandleChange}
                                        onKeyPress={handleKeypress}
                                    ></input>
                                    <span className="text-danger">{emailError}</span>
                                </div>
                                <div className="pt-2">
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                        name="password" value={password} onChange={onHandleChange}
                                        onKeyPress={handleKeypress}
                                    ></input>
                                    <span className="text-danger">{passwordError}</span>
                                </div>
                                <div className="form-group">
                                    {/* <NavLink to="/forget" className="Black">Forget Password?</NavLink> */}
                                </div>

                                <button type="button" className="btn  col-12 Radius8 White"
                                    onClick={LoginApi} onKeyPress={handleKeypress}>{loading === true ?
                                        antIcon : "Login"}</button>
                            </form>
                        </div>
                    </div>

                </div>

            </React.Fragment>
    )
}

export default Login;