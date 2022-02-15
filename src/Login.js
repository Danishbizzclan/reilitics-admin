import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, display: 'block' }} spin />;

const Login = () => {
    const initialstate = {
        email: "",
        password: "",
        login: false,
        loading: false
    }
    const [FormData, setFormData] = useState(initialstate);
    const { email, password, loading } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const validation = () => {
        if (email !== "") {
            if (email.includes('@') && email.includes('.')) {
                if (password !== "") {
                    LoginApi()
                }
                else if (password === "") {
                    setFormData({
                        ...FormData,
                        error: "Password is Required"
                    })
                    message.error("Password is Required", [4])
                }
            }
            else {
                setFormData({
                    ...FormData,
                    error: "Email is not valid"
                })
                message.error("Email is not valid", [4])
            }
        }
        else if (email === "") {
            setFormData({
                ...FormData,
                error: "Email is Required"
            })
            message.error("Email is Required", [4])
        }
    }

    const handleKeypress = e => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            validation()
        }
    };

    const LoginApi = () => {
        setFormData({
            loading: true
        })
        const link = "users/login"

        axios.post(link,
            {
                email: email,
                password: password
            })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    localStorage.setItem('x-auth-token', res.data.token)
                    localStorage.setItem('Login', true)
                    setFormData({
                        login: true,
                        token: res.data.data,
                        loading: false
                    })
                }
                else {
                    message.error(res.data.message)
                    setFormData({
                        loading: false
                    })
                }
            })
    }
    const check = localStorage.getItem('Login')
    return (
        check === "true" ? <Redirect to="/dashboard" /> :
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
                                </div>
                                <div className="pt-2">
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                        name="password" value={password} onChange={onHandleChange}
                                        onKeyPress={handleKeypress}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    {/* <NavLink to="/forget" className="Black">Forget Password?</NavLink> */}
                                </div>

                                <button type="button" className="btn  col-12 Radius8 White"
                                    onClick={validation} onKeyPress={handleKeypress}>{loading === true ?
                                        antIcon : "Login"}</button>
                            </form>
                        </div>
                    </div>

                </div>

            </React.Fragment>
    )
}

export default Login;