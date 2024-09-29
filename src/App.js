import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

function App() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        axios.get('http://localhost:3001/categories').then((response) => {
            setCategories(response.data);
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Router>
            <div className="container">
                <h1>Hệ thống quản lý sách - SkyGarden Library</h1>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li><Link to="/">Danh sách sách</Link></li>*/}
                {/*        <li><Link to="/add-book">Thêm sách mới</Link></li>*/}
                {/*        <li><Link to="/search">Tìm kiếm sách</Link></li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}

                <Header />
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/add-book" element={<BookForm categories={categories} />} />
                    <Route path="/search" element={<BookSearch categories={categories} />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
