import React, { useEffect, useRef } from "react";

function Editor({ onChange, editorLoaded, name, value }) {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor, EasyImage } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            // EasyImage: require('@ckeditor/ckeditor5-easy-image/src/easyimage'), // v3+
            // Image: require("@ckeditor/ckeditor5-image/src/image"), // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    plugins={EasyImage}
                    toolbar='uploadImage'
                    // cloudServices={
                    //     tokenUrl : 'https://example.com/cs-token-endpoint',
                    //     uploadUrl : 'https://your-organization-id.cke-cs.com/easyimage/upload/'
                    // }
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                        // plugins= [ EasyImage, Image, ... ]
                        // toolbar= [ 'uploadImage', ... ]
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}

export default Editor;
