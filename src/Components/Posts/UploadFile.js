import React, { useEffect, useState } from 'react';
import avatar from '../../assests/dummy.png'
function UploadFile() {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

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

    return (
        <div>
            {selectedFile === undefined ?
                <img src={avatar} alt='nothing' width="200px" className=' mx-3' /> :
                <img src={preview} alt='' width="200px" className=' mx-3' />}
            <br />
            <label htmlFor="files" className="btn mt-3 ml-2 col-6" style={{ backgroundColor: '#F2F8FF', border: '1px solid #0F74AF', color: 'black' }}>Upload Photo</label>
            <input type='file' id="files" onChange={onSelectFile} style={{ color: 'white', visibility: 'hidden' }} />
        </div>
    )
}

export default UploadFile;