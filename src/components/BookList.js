import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/books').then((response) => {
            setBooks(response.data.sort((a, b) => a.quantity - b.quantity));
        });
    }, []);

    return (
        <div>
            <h3>Danh sách sách</h3>
            <table className="table table-bordered">
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
                {books.map((book) => (
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
        </div>
    );
};

export default BookList;
