import { Navigate, Routes, Route } from 'react-router-dom';


const Landing = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
        </Routes>
    )
}

export default Landing;