import { useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL

const Upload = () => {
    const [file, setFile] = useState({})
    const [fileLink, setFileLink] = useState('')


    const handleChange = async (e) => {
        if (e.target.files) {
            const fileSubmit = e.target.files[0];
            setFile(fileSubmit)
            const fileLinkCreate = URL.createObjectURL(fileSubmit);
            setFileLink(fileLinkCreate)
            console.log(fileSubmit);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers({ 'Content-Type': 'image/*' });
            const response = await axios.get(`${baseUrl}/api/upload/geturl`, { params: { name: file.name } })
            console.log('name', file.name);
            const data = response.data;
            const result = data.result;
            const presignedUrl = result.url;
            const imageUrl = result.urlImage;
            console.log(result);
            console.log('file:', file);
            // await axios.put(urlGet, formData, {
            //     headers: {
            //         "Content-Type": "image/*",
            //     }
            // })
            const requestOptions = {
                method: 'PUT',
                body: file
            };
            const upload = await fetch(presignedUrl, requestOptions);


            const bannerData = { imageUrl, name: 'ban1', description: '', url: '', backgroundColor: '' }
            console.log('bannerData', bannerData);
            const requestOptions2 = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjJhYmZlMTI5NmU3OWIwYjJlMDBhZGM4IiwiaWF0IjoxNjU2MzQ5NTczLCJleHAiOjE2NTYzNTA0NzN9.qsE9nbzh-z7PRJLFFp_XaKqL5V_sQ0nn5f3edU-ySQc'
                },
                body: JSON.stringify(bannerData),
                // body: bannerData

            };
            const saveBannerData = await fetch(`${baseUrl}/api/banners/add`, requestOptions2);


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="upload">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="file" multipleaccept="image/*" onChange={(e) => handleChange(e)} />
                <img src={fileLink} />
                <button type='submit' >Submit</button>
            </form >
        </div >
    )


}

export default Upload;