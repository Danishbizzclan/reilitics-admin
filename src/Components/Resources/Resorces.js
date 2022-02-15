import { message, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

const Resources = () => {
    return(
        <Sidebar/>
    )
    // const initialstate = {
    //     data: "",
    //     title: "",
    //     url: "",
    //     load: false,
    //     errorMessage: null
    // }
    // const [FormData, setFormData] = useState(initialstate);
    // const { data, title, url, load, errorMessage } = FormData;

    // const onHandleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({
    //         ...FormData,
    //         [name]: value
    //     })
    // }

    // const fetchData = async (value, keyword) => {
    //     try {
    //         const res = await Promise.all([axios.get("resource")]);
    //         setFormData({
    //             ...FormData,
    //             data: res[0].data.resources,
    //             load: true
    //         })
    //     } catch {
    //         setFormData({
    //             ...FormData,
    //             errorMessage: "Something went wrong"
    //         })
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    //     // eslint-disable-next-line
    // }, []);

    // console.log(data)
    // const [selectedFile, setSelectedFile] = useState()
    // const [preview, setPreview] = useState()

    // // create a preview as a side effect, whenever selected file is changed
    // useEffect(() => {
    //     if (!selectedFile) {
    //         setPreview(undefined)
    //         return
    //     }

    //     const objectUrl = URL.createObjectURL(selectedFile)
    //     setPreview(objectUrl)

    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [selectedFile])

    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setSelectedFile(e.target.files[0])
    // }
    // console.log(selectedFile)

    // const SubmitResource = (resourceType) => {
    //     const link = "resource"
    //     axios.post(link,
    //         {
    //             title: title,
    //             resourceType: resourceType,
    //             resourceUrl: url,
    //             imageUrl: selectedFile
    //         })
    //         .then((res) => {
    //             console.log(res)
    //             if (res.data.success) {
    //                 message.success('Resource Added Successfully')
    //                 window.location = "/resources"
    //             }
    //         }).catch(function (error) {
    //             console.log(error)
    //         });
    // }
    // return (
    //     <>
    //         <Sidebar />
    //         <div className='content pt-5'>
    //             <h6 className="pt-2">Resources</h6>
    //             <div className="row col-12 mx-0 offBlue">
    //                 <h6 className="pt-3">Add Book</h6>
    //                 <input className="fillColor mx-2 py-2" placeholder="Add Book Title" name="title" value={title} onChange={onHandleChange} />
    //                 <input className="fillColor mx-2 py-2" placeholder="Add Book url" name="url" value={url} onChange={onHandleChange} />
    //                 <div className="mt-1">
    //                     <label for="files" class="btn" style={{ backgroundColor: '#F2F8FF', border: '1px solid #0F74AF', color: 'black' }}>Upload Image</label>
    //                     <input type='file' id="files" onChange={onSelectFile} style={{ color: 'white', visibility: 'hidden' }} />
    //                     <button className="btn btn-primary" onClick={() => SubmitResource("book")}>Publish</button>
    //                 </div>

    //             </div>
    //             <div className="row">
    //                 {data &&
    //                     data.length > 0 && data.map(item => {
    //                         return (

    //                             <>
    //                                 {
    //                                     item.resourceType === "book" &&
    //                                     <div>
    //                                         <img src={item.imageUrl} alt="imgg" className="px-2"></img>
    //                                         <p>{item.noOfClicks}</p>
    //                                     </div>
    //                                 }
    //                             </>
    //                         )
    //                     })}
    //             </div>
    //         </div>

    //         {errorMessage !== null &&
    //             notification['error']({
    //                 message: 'Error',
    //                 description: errorMessage,
    //                 placement: 'bottomLeft'
    //             })
    //         }
    //     </>
    // )
}

export default Resources;