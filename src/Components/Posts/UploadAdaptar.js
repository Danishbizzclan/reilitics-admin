// Custom Upload Adapter
import axios from 'axios'
export default class UploadAdapter {
    constructor(loader) {
      this.loader = loader
    }
  
    async upload() {
      return this.loader.file.then((file) => {
        const data = new FormData()
        data.append("file", file)
        const genericError = `Couldn't upload file: ${file.name}.`
  
        return axios({
          data,
          method: "POST",
          url: "API_UPLOAD_URL",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            this.loader.uploadTotal = progressEvent.total
            this.loader.uploaded = progressEvent.loaded
            // const uploadPercentage = parseInt(
            //   Math.round((progressEvent.loaded / progressEvent.total) * 100)
            // )
          },
        })
          .then(({ data }) => ({ default: data.url }))
          .catch(({ error }) => Promise.reject(error?.message ?? genericError))
      })
    }
  
    abort() {
      return Promise.reject()
    }
  }
  
  // CKEditor FileRepository
  export function uploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      new UploadAdapter(loader)
  }