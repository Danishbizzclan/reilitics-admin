import Sidebar from "../Sidebar";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { message, Popconfirm, Tag } from "antd";

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
        roleError: ''
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { firstName, firstNameError, lastName, lastNameError, username, renewDate, usernameError, email, emailError, image, date, price, dateError, phoneError, state, stateError, country, countryError, password, passwordError, role, roleError, packageId, packageStatus, phone } = DetailData;


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async (value, keyword) => {
        try {
            const res = await Promise.all([
                axios.get(`users/${_id}`),
                // axios.get(`package/${packageId}`),
            ]);
            // console.console(res[1].data.packageFound)
            setDetailData({
                ...DetailData,
                firstName: res[0].data.firstName,
                lastName: res[0].data.lastName,
                username: res[0].data.username,
                email: res[0].data.email,
                state: res[0].data.state,
                country: res[0].data.country,
                role: res[0].data.role,
                image: res[0].data.image,
                packageId: res[0].data.packageID,
                // packageStatus: res[1].data.packageFound.packageType,
                // price: res[1].data.packageFound.price,
                // renewDate: res[1].data.packageFound.updatedAt,
                phone: res[0].data.phone,
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

                            <div className='row '>
                                <input placeholder="First Name" readOnly name="firstName" value={firstName} className="col-md-5 col-12 mx-auto fillColor px-md-5 px-1 py-2" />

                                <input placeholder="Last Name" readOnly name="lastName" value={lastName} className="col-md-5 col-12 mx-auto fillColor px-md-5 px-1 py-2" />

                            </div>
                            <div className='row '>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{firstNameError}</span>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{lastNameError}</span>
                            </div>
                            <div className='row'>
                                <input placeholder="Username" readOnly name="username" value={username} className="col-md-5 col-12 mt-2 mx-auto fillColor px-md-5 px-1 py-2" />
                                <input placeholder="Email" readOnly name="email" value={email} className="col-md-5 col-12 mt-2 mx-auto fillColor px-md-5 px-1 py-2" />
                            </div>

                            <div className='row '>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{usernameError}</span>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{emailError}</span>
                            </div>
                            <div className='row'>
                                <input placeholder="Country" readOnly name="country" value={country} className="col-md-5 col-12 mt-2 mx-auto fillColor px-md-5 px-1 py-2" />
                                <input placeholder="State" name="state" value={state} className="col-md-5 col-12 mt-2 mx-auto fillColor px-md-5 px-1 py-2" />
                            </div>
                            <div className='row '>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{dateError}</span>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{stateError}</span>
                            </div>
                            <div className="row">
                                <input placeholder="Phone" readOnly name="phone" type="number" value={phone} className="col-md-5 col-12 mt-2 mx-auto fillColor px-md-5 px-1 py-2" />
                                <select disabled name="role" className="col-md-5 col-12 mt-2 fillColor px-md-5 mx-auto px-1 py-2">
                                    <option value={role ? role : ""} className='blue'>{role ? role : "Role"}</option>
                                    <option value="user" className='blue'>User</option>
                                    <option value="editor" className='blue'>Editor</option>
                                    <option value="admin" className='blue'>Admin</option>
                                </select>
                            </div>

                            <div className='row '>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{phoneError}</span>
                                <span className="text-danger col-md-5 col-12 mt-2 mx-auto px-md-5 px-1 py-2">{roleError}</span>
                            </div>
                        </div>
                    </div>
                    <div className="ml-md-5">
                        <h6 className=" font-weight-bold">Membership Details</h6>
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
                        </div>
                        <div className='row col-md-6 col-12 mt-2'>
                            <button className="btn Radius8 White"> <Popconfirm title="Sure to delete?" onConfirm={() => (DeleteUser)}> Delete User</Popconfirm></button>
                            <div className="mx-2" />
                            <button className="btn Radius8 White">Terminate Access</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserDetail;