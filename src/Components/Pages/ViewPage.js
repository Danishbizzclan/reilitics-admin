import Sidebar from "../Sidebar";
import React, { useEffect, useState } from 'react';
import { ReactComponent as EyeIcon } from '../../assests/eye.svg';
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPage = () => {
    const { _id } = useParams();

    const initialstate = {
        metaTitle: "",
        metaDescription: "",
        count:""
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { metaTitle, metaDescription, count } = DetailData;

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
                <h6>Page Detail</h6>
                <div className='displayFlex mt-4'>
                </div>
                <div className='mt-2'>
                    <div className=' ml-2'>
                        <form >
                            <div className='d-inline-flex ml-lg-3 '>
                                <h6 className="font-weight-bold">{metaTitle}  {" "}</h6>
                                <h6 className="mx-2">{" "} <EyeIcon/> {" "}{count} Views</h6>
                            </div>
                            <div className='col-md-6 col-12 mt-2'>
                                    <input placeholder="Meta Title" readOnly required name="metaTitle" value={metaTitle}  className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                    <textarea placeholder="Meta Description ()" readOnly required name="metaDescription" value={metaDescription}  className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewPage;