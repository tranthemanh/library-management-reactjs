import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookSearch = ({ categories }) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        axios.get('http://localhost:3001/books').then((response) => {
            const filteredBooks = response.data.filter(
                (book) =>
                    (!searchTitle || book.title.includes(searchTitle)) &&
                    (!searchCategory || book.category === searchCategory)
            );
            setResults(filteredBooks);
        });
    };

    useEffect(() => {
        handleSearch();
    }, [searchTitle, searchCategory]);

    return (
        <div>
            <h3>Tìm kiếm sách</h3>
            <div className="mb-3">
                <label htmlFor="title">Tên sách</label>
                <input
                    type="text"
                    className="form-control"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="category">Thể loại</label>
                <select
                    className="form-control"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                >
                    <option value="">Chọn thể loại</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Tìm kiếm
            </button>

            {results.length === 0 ? (
                <p>Không có thông tin sách này</p>
            ) : (
                <table className="table table-bordered mt-3">
                    <thead>
                    <tr>
                        <th>Mã sách</th>
                        <th>Tên sách</th>
                        <th>Thể loại</th>
                        <th>Ngày nhập sách</th>
                        <th>Số lượng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((book) => (
                        <tr key={book.id}>
                            <td>{book.code}</td>
                            <td>{book.title}</td>
                            <td>{book.category}</td>
                            <td>{book.date}</td>
                            <td>{book.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookSearch;

