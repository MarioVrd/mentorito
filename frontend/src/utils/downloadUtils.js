import axios from 'axios'

export const getFileFromApi = async (upload, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
    }
    const response = await axios.get(`/api/upload/${upload.id}`, config)

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', upload.title)
    document.body.appendChild(link)
    link.click()
}
