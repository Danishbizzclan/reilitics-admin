import Sidebar from "../Sidebar";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { message, Popconfirm } from "antd";

const UserDetail = () => {
    const { _id } = useParams();
    const initialstate = {
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        username: "",
        usernameError: "",
        email: '',
        emailError: '',
        phone: '',
        phoneError: '',
        date: "",
        dateError: "",
        state: '',
        stateError: '',
        image: '',
        packageStatus: '',
        packageId: '',
        renewDate: '',
        price: '',
        country: '',
        countryError: '',
        password: '',
        passwordError: '',
        role: '',
        roleError: '',
        userStatus: ""
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { firstName, userStatus, firstNameError, lastName, lastNameError, username, renewDate, usernameError, email, emailError, image, date, price, dateError, phoneError, state, stateError, country, countryError, password, passwordError, role, roleError, packageId, packageStatus, phone } = DetailData;

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async (value, keyword) => {
        try {
            const res = await Promise.all([
                axios.get(`users/profile/${_id}`),
                // axios.get(`package/${packageId}`),
            ]);
            // console.console(res[1].data.packageFound)
            setDetailData({
                ...DetailData,
                firstName: res[0].data.user.firstName,
                lastName: res[0].data.user.lastName,
                username: res[0].data.user.username,
                email: res[0].data.user.email,
                state: res[0].data.user.state,
                country: res[0].data.user.country,
                role: res[0].data.user.role,
                image: res[0].data.user.image,
                packageId: res[0].data.user.packageID,
                // packageStatus: res[1].data.user.packageFound.packageType,
                // price: res[1].data.user.packageFound.price,
                // renewDate: res[1].data.user.packageFound.updatedAt,
                phone: res[0].data.user.phone,
                userStatus: res[0].data.user.accountStatus,
                load: true
            })
        } catch {
            setDetailData({
                ...DetailData,
                errorMessage: "Something went wrong"
            })
        }
    };
    const DeleteUser = () => {
        const link = "users/" + _id
        axios.delete(link)
            .then((res) => {
                if (res.data.success) {
                    message.success('User Deleted Successfully')
                    window.location = "/users"
                }
            }).catch(function (error) {
                console.log(error)
            });
    }
    const TerminateAccess = (rejected) => {
        console.log(rejected)
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('accountStatus', rejected);

        var config = {
            method: 'put',
            url: `users/${_id}`,
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response) {
                    message.success('User Detail Updated Successfully')
                    window.location = "/user/detail/" + _id
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    console.log('pkg', packageStatus)
    return (
        <>
            <Sidebar />
            <div className='content pt-5'>
                <h6>User Detail</h6>
                <h6 className="ml-3">Username: {username} </h6>
                <div className='displayFlex mt-4'>
                    <div className='displayFlex ml-2'>
                        {/* <UploadFile /> */}
                        <img src={image} alt='imagee' className='avatar mx-3' />

                    </div>
                </div>
                <div className=' mt-4'>
                    <div className='row col-12 ml-2'>
                        <div>

                            <div className='row col-lg-8 col-12'>
                                <input placeholder="First Name" readOnly name="firstName" value={firstName} className="col-md-5 col-12 mx-auto my-1 fillColor px-md-5 px-1 py-2" />

                                <input placeholder="Last Name" readOnly name="lastName" value={lastName} className="col-md-5 col-12 mx-auto my-1 fillColor px-md-5 px-1 py-2" />

                            {/* </div>
                            <div className='row'> */}
                                <input placeholder="Username" readOnly name="username" value={username} className="col-md-5 col-12 mt-2 mx-auto my-1 fillColor px-md-5 px-1 py-2" />
                                <input placeholder="Email" readOnly name="email" value={email} className="col-md-5 col-12 mt-2 mx-auto my-1 fillColor px-md-5 px-1 py-2" />
                            {/* </div> */}

                            {/* <div className='row'> */}
                                <input placeholder="Country" readOnly name="country" value={country} className="col-md-5 col-12 mt-2 mx-auto my-1 fillColor px-md-5 px-1 py-2" />
                                <input placeholder="State" name="state" value={state} className="col-md-5 col-12 mt-2 mx-auto my-1 fillColor px-md-5 px-1 py-2" />
                            {/* </div> */}
                            
                            {/* <div className="row"> */}
                                <input placeholder="Phone" readOnly name="phone" type="number" value={phone} className="col-md-5 col-12 mt-2 mx-auto my-1 fillColor px-md-5 px-1 py-2" />
                                <select disabled name="role" className="col-md-5 col-12 mt-2 fillColor px-md-5 mx-auto my-1 px-1 py-2">
                                    <option value={role ? role : ""} className='blue'>{role ? role : "Role"}</option>
                                    <option value="user" className='blue'>User</option>
                                    <option value="editor" className='blue'>Editor</option>
                                    <option value="admin" className='blue'>Admin</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="ml-md-5">
                        {/* <h6 className=" font-weight-bold">Membership Details</h6>
                        <h6 className="">Membership Package</h6>
                        <div className='row col-md-6 col-12'>
                            <h6 className="font-weight-bold mr-auto">Paid</h6>
                            <h6 className="ml-auto font-weight-bold">USD 50</h6>
                        </div>
                        <div className='row col-md-6 col-12'>
                            <h6 className=" mr-auto">Status</h6>
                            <h6 className="ml-auto font-weight-bold"><Tag color="#71ECCF">Active</Tag></h6>
                        </div>
                        <div className='row col-md-6 col-12'>
                            <h6 className=" mr-auto">Membership renew date</h6>
                            <h6 className="ml-auto">25 Jan, 2022</h6>
                        </div> */}
                        <div className='row col-md-6 col-12 mt-2'>
                            <button className="btn Radius8 White"> <Popconfirm title="Sure to delete?" onConfirm={() => (DeleteUser)}> Delete User</Popconfirm></button>
                            <div className="mx-2" />
                            {(userStatus === "approved") &&
                                <button className="btn Radius8 White"><Popconfirm title="Sure to Terminate?" onConfirm={() => TerminateAccess("rejected")}> Terminate Access</Popconfirm></button>
                            }
                            {userStatus === "rejected" &&
                                <button className="btn Radius8 White"><Popconfirm title="Sure to Activate?" onConfirm={() => TerminateAccess("approved")}> Activate Access</Popconfirm></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserDetail;