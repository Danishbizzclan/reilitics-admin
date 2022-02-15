import Sidebar from "../Sidebar";
import { Button, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import uploadAdapterPlugin from './UploadAdaptar';
import axios from "axios";
import avatar from '../../assests/dummy.png'
import { useParams } from "react-router-dom";

const EditPost = () => {

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
        categories: []
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { title, metaTitle, metaDescription, categories, category, author } = DetailData;
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [editorLoaded, setEditorLoaded] = useState(false);
    // eslint-disable-next-line
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setDetailData({
            ...DetailData,
            [name]: value
        })
    }
    const SubmitPost = () => {
        const link = "article/"+_id
        axios.put(link,
            {
                title: title,
                detail: data,
                metaTitle: metaTitle,
                metaDescription: metaDescription,
                imageFile: selectedFile,
                category: category,
                author: author
            })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('Article Updated Successfully')
                    window.location = "/post/edit/"+_id
                }
            }).catch(function (error) {
                console.log(error)
            });
    }
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    console.log(selectedFile)
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async (value, keyword) => {
        try {
            const res = await Promise.all([axios.get("category")]);
            console.log(res)
            setDetailData({
                ...DetailData,
                categories: res[0].data.categories,
                load: true
            })
        } catch {
            setDetailData({
                ...DetailData,
                errorMessage: "Something went wrong"
            })
        }
    };
    console.log(category)
    return (
        <>
            <Sidebar />
            <div className='content pt-5'>
                <h6>Add Post</h6>
                <div className='displayFlex mt-4'>
                    <div className='displayFlex ml-2'>
                        <div>
                            {selectedFile === undefined ?
                                <img src={avatar} alt='nothing' width="200px" className=' mx-3' /> :
                                <img src={preview} alt='' width="200px" className=' mx-3' />}
                            <br />
                            <label for="files" className="btn mt-3 ml-2 col-6" style={{ backgroundColor: '#F2F8FF', border: '1px solid #0F74AF', color: 'black' }}>Upload Photo</label>
                            <input type='file' id="files" onChange={onSelectFile} style={{ color: 'white', visibility: 'hidden' }} />
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className=' ml-2'>
                        <form >
                            <div className='col-md-6 col-12 my-2'>
                                <input required placeholder="Title of the Post" name="title" value={title} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>
                            <div className="col-md-6 col-12 my-2">
                                <Editor
                                    name="description"
                                    onChange={(data) => {
                                        setData(data);
                                    }}
                                    editorLoaded={editorLoaded}
                                    onInit={(editor) => {
                                        editor.ui.view.editable.element.style.height = "200px"
                                        uploadAdapterPlugin(editor)
                                    }} />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input required placeholder="Author" name="author" value={author} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input required placeholder="Meta Title" name="metaTitle" value={metaTitle} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input required placeholder="Meta Description ()" name="metaDescription" value={metaDescription} onChange={onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>
                            <div className='col-md-6 col-12 my-2'>
                                <select name="category" className="col-12 fillColor px-md-5 px-1 py-2" onChange={onHandleChange}>
                                <option value="">Select Category</option> 
                                    {categories.map(value=>{
                                        return(
                                          <option value={value._id}>{value.name}</option>  
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-md-6 col-12'>
                                <Space size="middle" className="float-right">
                                    <Button size="middle" type="primary" htmlType="submit" className="float-right Radius8">
                                        Save draft
                                    </Button>
                                    <Button size="middle" type="primary" onClick={SubmitPost} htmlType="button" className="float-right Radius8">
                                        Pubish
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
export default EditPost;