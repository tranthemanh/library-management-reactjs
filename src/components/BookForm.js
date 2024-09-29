import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

const BookForm = ({ categories, onAddBook }) => {
    const validationSchema = Yup.object({
        code: Yup.string()
            .matches(/^BO-\d{4}$/, 'Mã sách phải có định dạng BO-XXXX (với X là số)')
            .required('Mã sách là bắt buộc'),
        title: Yup.string()
            .max(100, 'Tên sách không được dài quá 100 ký tự')
            .required('Tên sách là bắt buộc'),
        category: Yup.string().required('Thể loại là bắt buộc'),
        date: Yup.date()
            .max(new Date(), 'Ngày nhập sách không được lớn hơn ngày hiện tại')
            .required('Ngày nhập sách là bắt buộc'),
        quantity: Yup.number()
            .integer('Số lượng sách phải là số nguyên')
            .positive('Số lượng sách phải lớn hơn 0')
            .required('Số lượng sách là bắt buộc'),
    });

    const handleSubmit = (values, { resetForm }) => {
        try {
            // Kiểm tra nếu values.date là chuỗi, chuyển thành đối tượng Date
            const inputDate = new Date(values.date);

            // Kiểm tra xem inputDate có phải là đối tượng Date hợp lệ
            if (!isNaN(inputDate)) {
                const formattedDate = inputDate.toLocaleDateString('vi-VN'); // Format thành dd/MM/yyyy

                // Kiểm tra mã sách trước khi thêm
                axios.get('http://localhost:3001/books?code=' + values.code).then((response) => {
                    if (response.data.length > 0) {
                        // Nếu đã tồn tại mã sách trong cơ sở dữ liệu
                        toast.error("Mã sách đã tồn tại!");

                    } else {
                        // Thêm sách mới nếu mã sách không trùng lặp
                        const newBook = {
                            code: values.code,
                            title: values.title,
                            category: values.category,
                            date: formattedDate,  // Dùng định dạng ngày đã xử lý
                            quantity: values.quantity,
                        };

                        axios.post('http://localhost:3001/books', newBook).then(() => {
                            toast.success("Thêm sách thành công!");
                            resetForm();
                        }).catch((error) => {
                            toast.error("Lỗi khi thêm sách!");
                            console.error(error);
                        });
                    }
                }).catch((error) => {
                    toast.error("Lỗi khi kiểm tra mã sách!");
                    console.error(error);
                });

            } else {
                throw new Error("Ngày nhập không hợp lệ");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!");
            console.error("Error in handleSubmit:", error);
        }
    };



    return (
        <Formik
            initialValues={{
                code: '',
                title: '',
                category: '',
                date: '',
                quantity: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="form-container">
                    <div className="mb-3">
                        <label htmlFor="code">Mã sách</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title">Tên sách</label>
                        <Field name="title" type="text" className="form-control" />
                        <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category">Thể loại</label>
                        <Field name="category" as="select" className="form-control">
                            <option value="">Chọn thể loại</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date">Ngày nhập sách</label>
                        <Field name="date" type="date" className="form-control" />
                        <ErrorMessage name="date" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantity">Số lượng</label>
                        <Field name="quantity" type="number" className="form-control" />
                        <ErrorMessage name="quantity" component="div" className="text-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Thêm mới
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default BookForm;
