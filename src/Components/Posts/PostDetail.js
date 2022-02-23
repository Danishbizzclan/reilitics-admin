import Sidebar from "../Sidebar";
import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import uploadAdapterPlugin from './UploadAdaptar';
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {

    const { _id } = useParams();
    const initialstate = {
        title: "",
        metaTitle: "",
        metaDescription: "",
        email: '',
        date: "",
        state: '',
        city: '',
        password: '',
        role: '',
        author:"",
        category:"",
        image:'',
        categories: []
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { title, metaTitle, metaDescription, categories, image, category, author } = DetailData;

    const [editorLoaded, setEditorLoaded] = useState(false);
    // eslint-disable-next-line
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async (value, keyword) => {
        try {
            const res = await Promise.all([
                axios.get(`article/${_id}`),
                axios.get(`category`),
            ]);
            setDetailData({
                ...DetailData,
                categories: res[1].data.categories,
                title: res[0].data.article.title,
                author:res[0].data.article.author,
                detail: res[0].data.article.detail,
                // metaDescription: res[0].data.article.detail,
                category:res[0].data.article.category,
                image: res[0].data.article.image,
                load: true
            })
            setData(res[0].data.article.detail)
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
                <h6>Post Detail</h6>
                <div className='displayFlex mt-4'>
                    <div className='displayFlex ml-2'>
                    <img src={image} alt='images' width="200px" className=' mx-3' />
                    </div>
                </div>
                <div className='mt-2'>
                    <div className=' ml-2'>
                        <form >
                            <div className='col-md-6 col-12 my-2'>
                                <input readOnly placeholder="Title of the Post" name="title" value={title}  className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>
                            <div className="col-md-6 col-12 my-2">
                                <Editor
                                readOnly
                                    name="description"
                                    onChange={(data) => {
                                        setData(data);
                                    }}
                                    value={data}
                                    editorLoaded={editorLoaded}
                                    onInit={(editor) => {
                                        editor.ui.view.editable.element.style.height = "200px"
                                        uploadAdapterPlugin(editor)
                                    }} />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input readOnly placeholder="Author" name="author" value={author}  className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input readOnly placeholder="Meta Title" name="metaTitle" value={metaTitle}  className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input readOnly placeholder="Meta Description ()" name="metaDescription" value={metaDescription}  className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>
                            <div className='col-md-6 col-12 my-2'>
                                <select name="category" readOnly className="col-12 fillColor px-md-5 px-1 py-2" >
                                <option value={category?? ""} readOnly>{ category===""? "Select Category": category}</option> 
                                    {categories.map(value=>{
                                        return(
                                          <option value={value._id}>{value.name}</option>  
                                        )
                                    })}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostDetail;