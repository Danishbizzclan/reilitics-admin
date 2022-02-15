import Sidebar from "../Sidebar";

import { Form, Button, message, Tag, Space } from 'antd';
import React, { useState } from 'react';
import UploadFile from "./UploadFile";
import { useParams } from "react-router-dom";

const UserDetail = () => {
    const { _id } = useParams();
    console.log(_id)
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
    const { firstName, lastName, username, email, date, state, city, password } = DetailData;

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
                <h6>User Details</h6>
                <div className='displayFlex'>
                    <div className='displayFlex ml-2'>
                        <h6>UserName: UserName</h6>
                    </div>

                </div>
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
                                            warningOnly: true,
                                        },
                                    ]} >
                                    <input readOnly placeholder="First Name" name="firstName" value={firstName} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
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
                                    <input readOnly placeholder="Last Name" name="lastName" value={lastName} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
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
                                    <input readOnly placeholder="Username" name="username" value={username} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
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
                                    <input readOnly placeholder="Email" name="email" value={email} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
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
                                    <input readOnly type="date" onChange={onHandleChange} name="date" value={date} className="col-12 fillColor px-md-5 px-1 py-2" />
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
                                    <input readOnly placeholder="State" name="state" value={state} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
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
                                    <input readOnly placeholder="City" name="city" value={city} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
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
                                    <input readOnly type='password' name="password" value={password} onChange={onHandleChange} placeholder="Password" className=" fillColor col-12 px-md-5 px-1 py-2" />
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
                                    ]} >
                                    <select onChange={onHandleChange} name="role" className="fillColor col-12 px-md-5 px-1 py-2">
                                        <option value="" className='blue'>Role</option>
                                        <option value="saab" className='blue'>Saab</option>
                                        <option value="opel" className='blue'>Opel</option>
                                        <option value="audi" className='blue'>Audi</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="displayFlex">
                                <h6 className="font-weight-bold">Membership Details</h6>
                            </div>
                            <div className="displayFlex">
                                <p>Membership Package</p>
                            </div>
                            <div className="displayFlex">
                                <p className="font-weight-bold">Paid</p>
                                <p className="font-weight-bold">USD 50</p>
                            </div>
                            <div className="displayFlex">
                                <p className="font-weight-bold">Status</p>
                                <p className="font-weight-bold "><Tag color="#71ECCF" style={{ borderRadius: '5px' }}>Active</Tag></p>
                            </div>
                            <div className="displayFlex">
                                <p className="font-weight-bold">Membership renew date</p>
                                <p >28 oct, 2021</p>
                            </div>
                            <br/>
                            <Form.Item>
                                <Space size="middle">
                                    <Button className=' bgBlue' size="large" style={{borderRadius:'8px'}}> Delete User </Button>
                                    <Button className=' bgBlue' size="large" style={{borderRadius:'8px'}}> Terminate Access </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserDetail;