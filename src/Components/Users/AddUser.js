import Sidebar from "../Sidebar";
import UploadFile from "./UploadFile";
import { Form, Button, message } from 'antd';
import React, { useState } from 'react';

const AddUser = () => {
    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const initialstate = {
        firstName: "",
        lastName: "",
        username: "",
        email: '',
        date: "",
        state: '',
        city: '',
        password: '',
        role: ''
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { firstName, lastName, username, email, date, state, city, password, role } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setDetailData({
            ...DetailData,
            [name]: value
        })
    }
    return (
        <>
            <Sidebar />
            <div className='content pt-5'>
                <h6>Add User</h6>
                <div className='displayFlex mt-4'>
                    <div className='displayFlex ml-2'>
                        <UploadFile />
                    </div>
                </div>
                <div className=' mt-4'>
                    <div className='displayFlex ml-2'>
                        <Form
                            form={form}
                            layout="horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <div className='displayFlex'>
                                <Form.Item
                                    name="First Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            // type: 'text',
                                            warningOnly: true,
                                        },
                                        // {
                                        //     type: 'string',
                                        //     min: 6,
                                        // },
                                    ]} >
                                    <input placeholder="First Name" name="firstName" value={firstName} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                                <div className="mx-2" />
                                <Form.Item
                                    name="Last Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            warningOnly: true,
                                        },
                                    ]} >
                                    <input placeholder="Last Name" name="lastName" value={lastName} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                            </div>

                            <div className='displayFlex'>
                                <Form.Item
                                    name="Username"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            // type: 'text',
                                            warningOnly: true,
                                        },
                                    ]} >
                                    <input placeholder="Username" name="username" value={username} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                                <div className="mx-2" />
                                <Form.Item
                                    name="Email"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            type: 'email',
                                            warningOnly: true,
                                        },
                                    ]}
                                >
                                    <input placeholder="Email" name="email" value={email} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                            </div>

                            <div className='displayFlex'>
                                <Form.Item
                                    name="Date"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            warningOnly: true,
                                        },
                                    ]} >
                                    <input type="date" onChange={onHandleChange} name="date" value={date} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                                <div className="mx-2" />
                                <Form.Item
                                    name="State"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            warningOnly: true,
                                        },
                                    ]} >
                                    <input placeholder="State" name="state" value={state} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                            </div>
                            <div className='displayFlex'>
                                <Form.Item
                                    name="City"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            warningOnly: true,
                                        },
                                    ]}
                                >
                                    <input placeholder="City" name="city" value={city} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                                <div className="mx-2" />
                                <Form.Item
                                    name="Password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            // type: '',
                                            warningOnly: true,
                                        },
                                    ]}
                                >
                                    <input type='password' name="password" value={password} onChange={onHandleChange} placeholder="Password" className=" fillColor col-12 px-md-5 px-1 py-2" />
                                </Form.Item>
                            </div>
                            <div className="displayFlex">
                                <Form.Item
                                    name="Role"
                                    label="Role"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <select onChange={onHandleChange} name="role" className="fillColor col-12 px-md-5 px-1 py-2">
                                        <option value="" className='blue'>Role</option>
                                        <option value="saab" className='blue'>Saab</option>
                                        <option value="opel" className='blue'>Opel</option>
                                        <option value="audi" className='blue'>Audi</option>
                                    </select>
                                </Form.Item>

                            </div>
                            <Form.Item>
                                <Button size="large" type="primary" htmlType="submit" className="float-right Radius8">
                                    Add User
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddUser;