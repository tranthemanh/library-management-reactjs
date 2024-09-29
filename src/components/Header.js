// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Danh sách sách</Link></li>
                    <li><Link to="/add-book">Thêm sách mới</Link></li>
                    <li><Link to="/search">Tìm kiếm sách</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
