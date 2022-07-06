import axios from 'axios';
import { useEffect, useState } from 'react';
import './banner.scss'

const Banner = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/banners/get`;
    const [banner, setBanner] = useState({})
    if (banner.name) {
        banner.name = banner.name.charAt(0).toUpperCase() + banner.name.slice(1);
    }

    useEffect(async () => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            const banner = data.banner;
            setBanner(banner)
            console.log(banner);
        } catch (error) {
            console.log(error);
        }
    }, [url])

    return (
        <div className="banner">
            <div className="banner-left flex-column">
                <p className='banner-title'>{banner.name}</p>
                <p className='banner-description'>{banner.description}</p>
                <div className='banner-link'>
                    <a href={banner.url} >Discover</a>
                </div>
            </div>
            <div className="banner-right">
                <div
                    className='banner-image'
                    style={{ backgroundImage: `url(${banner.imageUrl})` }}
                >
                </div>
            </div>
        </div>
    )
}


export default Banner;