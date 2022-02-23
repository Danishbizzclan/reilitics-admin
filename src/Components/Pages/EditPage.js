import Sidebar from "../Sidebar";
import { Form, Button, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReactComponent as EyeIcon } from '../../assests/eye.svg';
import { useParams } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
    const [form] = Form.useForm();
    const { _id } = useParams();

    const onFinish = () => {
        message.success('Submit success!');
    };

    const initialstate = {
        metaTitle: "",
        metaDescription: "",
        count:""
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { metaTitle, metaDescription, count } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setDetailData({
            ...DetailData,
            [name]: value
        })
    }

   const SubmitPage = () => {
        const link = "page/"+_id
        axios.put(link,
            {
                title: metaTitle,
                description: metaDescription
            })
            .then((res) => {
                if (res.data.success) {
                    message.success('Page Updated Successfully')
                    window.location = "/page/edit/"+_id
                }
            }).catch(function (error) {
                console.log(error)
            });
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async (value, keyword) => {
        try {
            const res = await Promise.all([axios.get("page/"+_id)]);
            setDetailData({
                ...DetailData,
                metaTitle: res[0].data.pageById.title,
                metaDescription: res[0].data.pageById.description,
                count: res[0].data.pageById.viewCount,
                load: true
            })
        } catch {
            setDetailData({
                ...DetailData,
                errorMessage: "Something went wrong"
            })
        }
    };

    return (
        <>
            <Sidebar />
            <div className='content pt-5'>
                <h6>Edit Page</h6>
                <div className='displayFlex mt-4'>
                </div>
                <div className='mt-2'>
                    <div className=' ml-2'>
                        <form onSubmit={onFinish}>

                            <div className='d-inline-flex ml-lg-3 '>
                                <h6 className="font-weight-bold">{metaTitle}  {" "}</h6>
                                <h6 className="mx-2">{" "} <EyeIcon/> {" "}{count} Views</h6>
                            </div>
                            <div className='col-md-6 col-12 mt-2'>
                                    <input placeholder="Meta Title" required name="metaTitle" value={metaTitle} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                    <input placeholder="Meta Description ()" required name="metaDescription" value={metaDescription} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                                <div className='col-md-6 col-12'>
                                    <Space size="middle" className="float-right">
                                        <Button size="large" type="primary" htmlType="button" onClick={SubmitPage} className="float-right Radius8">
                                            Save
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
export default EditPage;