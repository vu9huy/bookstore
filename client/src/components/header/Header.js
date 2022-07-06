import './Header.scss';
import { Link, NavLink, Routes } from 'react-router-dom';
import logo from '../../assets/images/logo1.png'
import { useState } from 'react';
import '../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css';

const Header = () => {

    const [keyWord, setKeyWord] = useState('');
    const onSearch = (e) => {
        if (keyWord.trim().length != 0) {
            history.push(`/search/${keyWord}`);
        } else {
            e.preventDefault();
        }
    }

    function handleSearchClick(e) {
        onSearch(e);
        setKeyWord('');
    }

    function handleSearchEnter(e) {
        if (e.key === 'Enter') {
            onSearch(e);
            setKeyWord('');
        }
    }

    const activeStyle = {
        width: "100%",
    };




    return (
        <div className='header flex-column'>
            <div className='top-header flex-row'>
                <div className='top-header__left flex-row'>
                    <div className='logo flex-row'>
                        <img src={logo} />
                    </div>
                    <Link to='/' className='brand'>
                        Bookstore
                    </Link>
                </div>
                <div className='top-header__right flex-row'>
                    <div className='search flex-row'>
                        <input onKeyDown={(e) => { handleSearchEnter(e) }} value={keyWord} onChange={e => setKeyWord(e.target.value)} placeholder='Search...' type='text'></input>
                        <div className='icon flex-row' onClick={(e) => handleSearchClick(e)}><i className='bx bx-search-alt-2 flex-row'></i></div>
                    </div>
                    <div className='auth'>
                        <Link className='signin' to='/register'>Sign in</Link>
                        <Link className='signup' to='/login'>Sign up</Link>
                    </div>
                </div>
            </div>
            <div className='bottom-header'>
                <ul className='navbar-items flex-row'>
                    <li className='navbar-item flex-row'>
                        <NavLink className='navbar-item-link' to='/books' style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            <i class='bx bx-book-open'></i>
                            <p >Books</p>
                        </NavLink>
                    </li>
                    <li className='navbar-item flex-row'>
                        <NavLink className='navbar-item-link' to='/audiobooks'>
                            <i class='bx bx-headphone' ></i>
                            <p>Audiobooks</p>
                        </NavLink>
                    </li>
                    <li className='navbar-item flex-row'>
                        <NavLink className='navbar-item-link' to='/book-club'>
                            <i class='bx bx-group'></i>
                            <p>Book Club</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;