import Sidebar from "../Sidebar";
import { Button, message, Space } from 'antd';
import React, { useState } from 'react';
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AddPage = () => {

    const onFinish = () => {
        message.success('Submit success!');
    };

    const initialstate = {
        metaTitle: "",
        metaDescription: "",
        metaTitleError : "",
        descriptionError : "",
    }

    const [load, setLoad] = useState(false);
    const [DetailData, setDetailData] = useState(initialstate);
    const { metaTitle, metaDescription, metaTitleError, descriptionError } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setDetailData({
            ...DetailData,
            [name]: value
        })
    }
    function validate() {
        let metaTitleError = "";
        let descriptionError = "";
        if (!metaTitle) {
            metaTitleError = "Meta Title is required";
        }
        if (!metaDescription) {
            descriptionError = "Meta Description is required";
        }
        if (metaTitleError || descriptionError ) {
            setDetailData({
                ...DetailData,
                metaTitleError,
                descriptionError
            })
            return false;
        }
        else{
            setDetailData({
                ...DetailData,
                metaDescription: "",
                metaTitle:"",
            })
        }
        return true;
    }
    const SubmitPage = () => {
        if(validate()){
            
        setLoad(true);
        const link = "page"
        axios.post(link,
            {
                title: metaTitle,
                description: metaDescription
            })
            .then((res) => {
                if (res.data.success) {
                    message.success('Page Added Successfully')
                    window.location = "/pages/add"
                }
                
            else{
                message.error(res.data.message)
                setLoad(true);
            };
            })
    }
}

    return (
        <>
            <Sidebar />
            <div className='content pt-5'>
                <h6>Add Page</h6>
                <div className='displayFlex mt-4'>
                </div>
                <div className='mt-2'>
                    <div className=' ml-2'>
                        <form onSubmit={onFinish}>

                            <div className='col-md-6 col-12 mt-2'>
                                <input placeholder="Meta Title"
                                 required name="metaTitle"
                                  value={metaTitle} 
                                  onChange={onHandleChange}
                                   className="col-12 fillColor px-md-5 px-1 py-2" />
                                    <span className="text-danger">{metaTitleError}</span>
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input placeholder="Meta Description ()"
                                 required name="metaDescription"
                                  value={metaDescription}
                                   onChange={onHandleChange} 
                                   className="col-12 fillColor px-md-5 px-1 py-2" />
                                    <span className="text-danger">{descriptionError}</span>
                            </div>

                            <div className='col-md-6 col-12'>
                                <Space size="middle" className="float-right">
                                    <Button size="large" type="primary" htmlType="button" onClick={SubmitPage} className="float-right Radius8">
                                        {load === false ?
                                            "Save" :
                                            antIcon
                                        }

                                    </Button>
                                </Space>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddPage;