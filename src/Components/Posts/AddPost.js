import Sidebar from "../Sidebar";
import { message, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import uploadAdapterPlugin from './UploadAdaptar';
import axios from "axios";
import avatar from '../../assests/dummy.png'
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, display: 'block' }} spin />;

const AddPost = () => {

    const initialstate = {
        title: "",
        metaTitle: "",
        metaDescription: "",
        author: "",
        category: "",
        categories: [],
        titleError: "",
        dataError: "",
        metaTitleError: "",
        descriptionError: "",
        authorError: "",
        categoryError: "",
        imageError: undefined,
        loading: false,
        successMessage: null,
        errorMessage: null
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { title, metaTitle, metaDescription, categories, category, author, titleError, dataError, metaTitleError, descriptionError, authorError, categoryError, loading, successMessage, imageError, errorMessage } = DetailData;
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [editorLoaded, setEditorLoaded] = useState(false);
    // eslint-disable-next-line
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    function validate() {
        let titleError = "";
        let dataError = ""
        let metaTitleError = "";
        let descriptionError = "";
        let authorError = "";
        let categoryError = "";
        let imageError = undefined;
        if (!title) {
            titleError = "Title is required";
        }
        if (!data) {
            dataError = "Detail is required";
        }
        if (!metaTitle) {
            metaTitleError = "Meta Title is required";
        }
        if (!metaDescription) {
            descriptionError = "Meta Description is required";
        }
        if (!author) {
            authorError = "Author is required";
        }
        if (!selectedFile) {
            imageError = "Please Upload atleast one image";
        }
        if (!category) {
            categoryError = "Category is required";
        }
        if (titleError || dataError || metaTitleError || descriptionError || authorError || categoryError || imageError) {
            setDetailData({
                ...DetailData,
                titleError,
                dataError,
                metaTitleError,
                descriptionError,
                authorError,
                categoryError,
                imageError
            })
            return false;
        }
        else {
            setDetailData({
                ...DetailData,
                title: "",
                data: "",
                metaDescription: "",
                metaTitle: "",
                author: "",
                category: "",
                selectedFile: undefined
            })
        }
        return true;
    }
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setDetailData({
            ...DetailData,
            [name]: value
        })
    }
    const SubmitPost = () => {
        if (validate()) {
            setDetailData({
                ...DetailData,
                loading: true
            })
            const link = "article"
            let formData = new FormData();
            formData.append("detail", data);
            formData.append("author", author);
            formData.append("category", category);
            formData.append("metaTitle", metaTitle);
            formData.append("metaDescription", metaDescription);
            formData.append("image", selectedFile);
            // const link = `resource`
            axios.post(link, formData)
                .then((res) => {
                    if (res.data.success === true) {
                        // message.success('Post Added Successfully')
                        setDetailData({
                            ...DetailData,
                            successMessage: "Post Added Successfully",
                            title: "",
                            data: "",
                            metaTitle: "",
                            metaDescription: "",
                            category: "",
                            author: "",
                            loading: false
                        })
                        setData("")
                        setSelectedFile(undefined)
                        window.location = "/post/add"
                    }
                })
                // .then((res) => {
                //     if (res.data.success) {
                //         message.success('Resource Added Successfully')
                //         window.location = "/resources"
                //     }
                // })
                // .catch(function (error) {
                //     console.log(error)
                //     setDetailData({
                //         ...DetailData,
                //         load: false
                //     })
                // });
                // axios.post(link,
                //     {
                //         title: title,
                //         detail: data,
                //         metaTitle: metaTitle,
                //         metaDescription: metaDescription,
                //         imageFile: selectedFile.name,
                //         category: category,
                //         author: author
                //     })
                // .then((res) => {
                //     if (res.data.success === true) {
                //         // message.success('Post Added Successfully')
                //         setDetailData({
                //             ...DetailData,
                //             successMessage: "Post Added Successfully",
                //             title: "",
                //             data: "",
                //             metaTitle: "",
                //             metaDescription: "",
                //             category: "",
                //             author: "",
                //             loading: false
                //         })
                //         setData("")
                //         setSelectedFile(undefined)
                //         window.location = "/post/add"
                //     }
                // })
                .catch(function (error) {
                    console.log(error.response);
                    setDetailData({
                        ...DetailData,
                        errorMessage: "Something is missing",
                        loading: false
                    })
                });
            setDetailData({
                ...DetailData,
                successMessage: null,
                errorMessage: null,
            })
        }
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
    const fetchCategory = async (value, keyword) => {
        try {
            const res = await Promise.all([axios.get("category"),
            ]);
            setDetailData({
                ...DetailData,
                categories: res[0].data.categories
            })
        } catch {
            // throw Error("Promise");
            message.error("Something went wrong")
        }
    };
    useEffect(() => {
        fetchCategory();
        // eslint-disable-next-line
    }, [])

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
                            <label htmlFor="files" className="btn mt-3 ml-2 col-6" style={{ backgroundColor: '#F2F8FF', border: '1px solid #0F74AF', color: 'black' }}>Upload Photo</label>
                            <input type='file' id="files" onChange={onSelectFile} style={{ color: 'white', visibility: 'hidden' }} />
                            <span className="text-danger">{imageError}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className=' ml-2'>
                        <form >
                            <div className='col-md-6 col-12 my-2'>
                                <input placeholder="Title of the Post"
                                    name="title"
                                    value={title}
                                    onChange={onHandleChange}
                                    className="col-12 fillColor px-md-5 px-1 py-2" />
                                <span className="text-danger">{titleError}</span>
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
                                <span className="text-danger">{dataError}</span>
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input placeholder="Author"
                                    name="author"
                                    value={author}
                                    onChange={onHandleChange}
                                    className="col-12 fillColor px-md-5 px-1 py-2" />
                                <span className="text-danger">{authorError}</span>
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input placeholder="Meta Title"
                                    name="metaTitle"
                                    value={metaTitle}
                                    onChange={onHandleChange}
                                    className="col-12 fillColor px-md-5 px-1 py-2" />
                                <span className="text-danger">{metaTitleError}</span>
                            </div>

                            <div className='col-md-6 col-12 my-2'>
                                <input placeholder="Meta Description ()"
                                    name="metaDescription"
                                    value={metaDescription}
                                    onChange={onHandleChange}
                                    className="col-12 fillColor px-md-5 px-1 py-2" />
                                <span className="text-danger">{descriptionError}</span>
                            </div>
                            <div className='col-md-6 col-12 my-2'>
                                <select name="category" className="col-12 fillColor px-md-5 px-1 py-2" onChange={onHandleChange}>
                                    <option value="">Select Category</option>
                                    {categories.map(value => {
                                        return (
                                            <option value={value._id}>{value.name}</option>
                                        )
                                    })}
                                </select>
                                <span className="text-danger">{categoryError}</span>
                            </div>
                            <div className='col-md-6 col-12'>
                                <button className="float-right Radius8 White px-3 py-2 border-0" type="button" onClick={SubmitPost}>
                                    {loading === true ?
                                        antIcon : "Pubish"}
                                </button >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {successMessage !== null &&
                notification['success']({
                    message: 'Success',
                    description: successMessage,
                    placement: 'bottomLeft'
                })
            }
            {errorMessage !== null &&
                notification['error']({
                    message: 'Error',
                    description: errorMessage,
                    placement: 'bottomLeft'
                })
            }
        </>
    )
}
export default AddPost;