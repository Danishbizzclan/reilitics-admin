import { message, notification, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { ReactComponent as Downloads } from '../../assests/download.svg'
import { ReactComponent as Clicks } from '../../assests/clicks.svg'
import pdf from '../../assests/pdf.png'
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, display: 'block' }} spin />;

const Resources = () => {
    const initialstate = {
        data: "",
        title: "",
        url: "",
        podcastTitle: "",
        podcastUrl: "",
        documentTitle: "",
        documentUrl: "",
        load: false,
        errorMessage: null,
        dataLoad: false
    }
    const [DetailData, setDetailData] = useState(initialstate);
    const { data, title, url, load, errorMessage, podcastTitle, podcastUrl, documentTitle, documentUrl, dataLoad } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setDetailData({
            ...DetailData,
            [name]: value
        })
    }

    const fetchData = async (value, keyword) => {
        setDetailData({
            ...DetailData,
            dataLoad: true
        })
        try {
            const res = await Promise.all([axios.get("resource")]);
            setDetailData({
                ...DetailData,
                data: res[0].data.resources,
                dataLoad: false
            })
        } catch {
            setDetailData({
                ...DetailData,
                errorMessage: "Something went wrong",
                dataLoad: false
            })
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const [selectedFile, setSelectedFile] = useState()
    const [podcastFile, setPodcastFile] = useState()
    const [documentFile, setDocumentFile] = useState()
    // eslint-disable-next-line
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!(selectedFile ?? podcastFile ?? documentFile)) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile ?? podcastFile ?? documentFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
        // eslint-disable-next-line
    }, [selectedFile ?? podcastFile ?? documentFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined) ?? setDocumentFile(undefined) ?? setPodcastFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]) ?? setPodcastFile(e.target.files[0]) ?? setDocumentFile(e.target.files[0])
    }

    const SubmitResource = (resourceType) => {
        // let resourceTitle = (title && title) ?? (podcastTitle && podcastTitle) ?? (documentTitle && documentTitle);
        let resourceTitle
        if (title !== "") {
            resourceTitle = title;
        }
        else if (podcastTitle !== "") {
            resourceTitle = podcastTitle;
        }
        else if (documentTitle !== "") {
            resourceTitle = documentTitle
        }
        setDetailData({
            ...DetailData,
            load: true
        })
        let formData = new FormData();
        formData.append("title", resourceTitle);
        formData.append("resourceType", resourceType);
        formData.append("resourceUrl", url);
        formData.append("file", selectedFile);
        const link = `resource`
        axios.post(link, formData).then((res) => {
            if (res.data.success) {
                message.success('Resource Added Successfully')
                window.location = "/resources"
            }
        }).catch(function (error) {
            console.log(error)
            setDetailData({
                ...DetailData,
                load: false
            })
        });
    }
    const DeleteResource = (id) => {
        const link = "resource/" + id
        axios.delete(link)
            .then((res) => {
                if (res.data.success) {
                    message.success('Resource Deleted Successfully')
                }
                fetchData();
            }).catch(function (error) {
                console.log(error)
            });
    }

    return (
        <>
            <Sidebar />
            <div className='content pt-5'>
                <h6 className="pt-2">Resources</h6>
                <div className="offBlue py-3">
                    <h6 className="pt-2 ml-3">Books</h6>
                    <div className="row col-12 mx-0 offBlue">
                        <h6 className="pt-3">Add Book</h6>
                        <input className="fillColor mx-2 py-2" placeholder="Add Book Title" name="title" value={title} onChange={onHandleChange} />
                        <input className="fillColor mx-2 py-2" placeholder="Add Book url" name="url" value={url} onChange={onHandleChange} />
                        <div className="mt-1">
                            <label htmlFor="files" className="btn" style={{ backgroundColor: '#F2F8FF', border: '1px solid #0F74AF', color: 'black' }}>Upload Image</label>
                            <input type='file' id="files" onChange={onSelectFile} style={{ color: 'white', visibility: 'hidden', display: 'none' }} />
                            <button className="btn btn-primary ml-2 px-2" style={{ marginTop: '-0.5rem' }} onClick={() => SubmitResource("book")}>{load === true ?
                                antIcon : "Publish"}</button>
                        </div>

                    </div>

                    {dataLoad === true ?
                        antIcon :
                        <div className="row col-11 mx-auto my-3">
                            {data && data.length > 0 ?
                                data.map(item => {
                                    return (
                                        <>
                                            {
                                                item.resourceType === "book" &&
                                                <div className="mx-2">
                                                    <div className="img-wrap">
                                                        <Popconfirm title="Sure to delete?" onConfirm={() => (DeleteResource(item._id))}>
                                                            <span className="close">&times;</span>
                                                        </Popconfirm>

                                                        <img src={item.fileUrl} alt="imgg" className="px-2" height="170px" width="148px" ></img>
                                                    </div>
                                                    <p className="text-center">{item.title}</p>
                                                    <div className="ml-3">
                                                        <span className="">
                                                            <Downloads className="mr-1" />{item.noOfDownloads}
                                                        </span>
                                                        <span className="ml-4">
                                                            <Clicks className="mr-1" />{item.noOfClicks}
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )
                                })
                                :
                                <p className="text-center">No Books Available</p>
                            }
                        </div>
                    }

                </div>

                <div className="offBlue py-3 my-3">
                    <h6 className="pt-2 ml-3">Podcasts</h6>
                    <div className="row col-12 mx-0 offBlue">
                        <h6 className="pt-3">Add Podcast</h6>
                        <input className="fillColor mx-2 py-2" placeholder="Add Podcast Title" name="podcastTitle" value={podcastTitle} onChange={onHandleChange} />
                        <input className="fillColor mx-2 py-2" placeholder="Add Podcast url" name="podcastUrl" value={podcastUrl} onChange={onHandleChange} />
                        <div className="mt-1">
                            <label htmlFor="files" className="btn" style={{ backgroundColor: '#F2F8FF', border: '1px solid #0F74AF', color: 'black' }}>Upload Image</label>
                            <input type='file' id="files" onChange={onSelectFile} style={{ color: 'white', visibility: 'hidden', display: 'none' }} />
                            <button className="btn btn-primary ml-2 px-2" style={{ marginTop: '-0.5rem' }} onClick={() => SubmitResource("podcast")}>{load === true ?
                                antIcon : "Publish"}</button>
                        </div>

                    </div>
                    {dataLoad === true ?
                        antIcon :
                        <div className="row col-11 mx-auto my-3">
                            {data && data.length > 0 ?
                                data.map(item => {
                                    return (
                                        <>
                                            {
                                                item.resourceType === "podcast" &&
                                                <div className="mx-2">
                                                    <div className="img-wrap">
                                                        <Popconfirm title="Sure to delete?" onConfirm={() => (DeleteResource(item._id))}>
                                                            <span className="close">&times;</span>
                                                        </Popconfirm>
                                                        <img src={item.fileUrl} alt="imgg" className="px-2" height="170px" width="148px" ></img>
                                                    </div>
                                                    <p className="text-center">{item.title}</p>
                                                    <div className="ml-3">
                                                        <span className="">
                                                            <Downloads className="mr-1" />{item.noOfDownloads}
                                                        </span>
                                                        <span className="ml-4">
                                                            <Clicks className="mr-1" />{item.noOfClicks}
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )
                                })
                                :
                                <p className="text-center">No Podcasts Available</p>}
                        </div>
                    }
                </div>

                <div className="offBlue py-3 my-3">
                    <h6 className="pt-2 ml-3">Documents</h6>
                    <div className="row col-12 mx-0 offBlue">
                        <h6 className="pt-3">Add Document</h6>
                        <input className="fillColor mx-2 py-2" placeholder="Add Document Title" name="documentTitle" value={documentTitle} onChange={onHandleChange} />
                        <input className="fillColor mx-2 py-2" placeholder="Add Document url" name="documentUrl" value={documentUrl} onChange={onHandleChange} />
                        <div className="mt-1">
                            <label htmlFor="files" className="btn" style={{ backgroundColor: '#F2F8FF', border: '1px solid #0F74AF', color: 'black' }}>Upload Image</label>
                            <input type='file' id="files" onChange={onSelectFile} style={{ color: 'white', visibility: 'hidden', display: 'none' }} />
                            <button className="btn btn-primary ml-2 px-2" style={{ marginTop: '-0.5rem' }} onClick={() => SubmitResource("pdf")}>{load === true ?
                                antIcon : "Publish"}</button>
                        </div>

                    </div>
                    {dataLoad === true ?
                        antIcon :
                        <div className="row col-11 mx-auto my-3">
                            {data && data?.length > 0 &&
                                data.map(item => {
                                    return (
                                        <>
                                            {
                                                item.resourceType === "pdf" &&
                                                <div className="mx-2">
                                                    <div className="img-wrap">
                                                        <Popconfirm title="Sure to delete?" onConfirm={() => (DeleteResource(item._id))}>
                                                            <span className="close">&times;</span>
                                                        </Popconfirm>
                                                        <img src={pdf} alt="imgg" className="px-2" height="50%" width="148px" ></img>
                                                    </div>
                                                    <p className="text-center">{item.title}</p>
                                                    <div className="ml-3">
                                                        <span className="">
                                                            <Downloads className="mr-1" />{item.noOfDownloads}
                                                        </span>
                                                        <span className="ml-4">
                                                            <Clicks className="mr-1" />{item.noOfClicks}
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )
                                })}
                        </div>
                    }
                </div>
            </div>

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

export default Resources;