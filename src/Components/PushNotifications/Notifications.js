import Sidebar from "../Sidebar";
import { Form, Button, message } from 'antd';
import React, { useState } from 'react';

const Notifications = () => {
    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const initialstate = {
        subject: "",
        description: "",
        username: "",
        email: '',
        date: "",
        state: '',
        city: '',
        apiKey: '',
        users: ''
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { subject, description, username, email, date, state, city, apiKey, users } = DetailData;

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
                <h6>Send Push Notifications </h6>
                <div className=' mt-4'>
                <h6 className="mx-2">Notifications</h6>
                    <div className='col-md-6 col-12 '>
                        <Form
                            form={form}
                            layout="horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off" >
                            <div className=''>
                                <Form.Item
                                    name="Subject"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            warningOnly: true,
                                        }
                                    ]} >
                                    <input placeholder="Subject" name="subject" value={subject} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>
                                <div className="mx-2" />
                                <Form.Item
                                    name="Description"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        {
                                            warningOnly: true,
                                        },
                                    ]} >
                                    <textarea rows={3} style={{ resize: 'none' }} placeholder="Description" name="description" value={description} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                </Form.Item>

                                <div className="row mx-2 ">
                                    <Form.Item
                                        name="Users"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]} >
                                        <select onChange={onHandleChange} name="users" className="fillColor col-12 px-md-5 px-1 py-2">
                                            <option value="" className='blue'>Users</option>
                                            <option value="saab" className='blue'>Saab</option>
                                            <option value="opel" className='blue'>Opel</option>
                                            <option value="audi" className='blue'>Audi</option>
                                        </select>
                                    </Form.Item>
                                    <Form.Item >
                                        <Button size="large" type="primary" htmlType="submit" className="Radius8 mx-2">
                                            Send
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>

                            <div className=''>
                                    <h6 className="font-weight-bold">Stripe Api</h6>
                                <div className="mx-2" />
                                <Form.Item
                                    name="Live Key"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        {
                                            warningOnly: true,
                                        },
                                    ]} >
                                    <input type='text' name="apiKey" value={apiKey} onChange={onHandleChange} placeholder="Live Key" className=" fillColor col-12 px-md-5 px-1 py-2" />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Notifications;