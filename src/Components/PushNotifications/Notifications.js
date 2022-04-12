import Sidebar from "../Sidebar";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { message } from "antd";

const Notifications = () => {

    const initialstate = {
        subject: "",
        subjectError: "",
        description: "",
        descriptionError: "",
        apiKey: '',
        users: '',
        user: []
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { subject, description, apiKey, users, user, subjectError, descriptionError } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setDetailData({
            ...DetailData,
            [name]: value
        })
    }
    function validate() {
        let subjectError = "";
        let descriptionError = "";
        if (!description) {
            descriptionError = "Please provide Description";
        }
        if (!subject) {
            subjectError = "Subject is required";
        }
        if (subjectError || descriptionError) {
            setDetailData({
                ...DetailData,
                subjectError,
                descriptionError
            })
            return false;
        }
        return true;
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async (value, keyword) => {
        try {
            const res = await Promise.all([
                axios.get(`users`)
            ]);
            setDetailData({
                ...DetailData,
                user: res[0].data.users
            })
        } catch {
            setDetailData({
                ...DetailData,
                errorMessage: "Something went wrong"
            })
        }
    };

    const SubmitForm = () => {
        if (validate()) {
            const link = "notification"

            axios.post(link,
                {
                    subject: subject,
                    description: description,
                    userType: users
                })
                .then((res) => {
                    if (res.data.success === true) {
                        console.log(res)
                        message.success(res.data.message);
                        window.location = "/notifications"
                    }
                }).catch(function (error) {
                    console.log(error);
                    // message.error(res.message)
                    setDetailData({
                        ...DetailData,
                        loading: false
                    })
                });
        }
    }
    return (
        <>
            <Sidebar />
            <div className='content pt-5'>
                <h6>Send Push Notifications </h6>
                <div className=' mt-4'>
                    <h6 className="mx-2">Notifications</h6>
                    <div className='col-md-6 col-12 '>
                        <div className=''>
                            <input placeholder="Subject" name="subject" value={subject} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />

                            <div className="mx-2 mt-2" />
                            <textarea rows={3} style={{ resize: 'none' }} placeholder="Description" name="description" value={description} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />

                            <div className="row mx-2 ">
                                <select onChange={onHandleChange} name="users" className="fillColor col-8 py-2">
                                    <option value="" className='blue'>Select User</option>
                                    {user && user.map((value) => {
                                        return (
                                            <option value={value._id} className='blue'>{value.firstName + " " + value.lastName}</option>
                                        )
                                    })}

                                </select>
                                <button className="btn Radius8 White mx-2 py-2" onClick={SubmitForm}>
                                    Send
                                </button>
                            </div>
                        </div>

                        {/* <div className='mt-2'>
                            <h6 className="font-weight-bold">Stripe Api</h6>
                            <div className="mx-2" />
                            <input type='text' name="apiKey" value={apiKey} onChange={onHandleChange} placeholder="Live Key" className=" fillColor col-12 px-md-5 px-1 py-2" />

                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Notifications;