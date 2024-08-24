import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import './profile.scss';

const Profile: React.FC = () => {

    const [avt, setAvt] = useState<File>();
    const [url, setUrl] = useState<string>("");

    const [formData, setFormData] = useState({
        name: 'Hoàng Anh',
        email: 'ndha1115@gmail.com',
        phone: '0981972551',
        gender: 'Nam',
        dob: '2002-11-15'
    });

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUrl(URL.createObjectURL(files[0]));
            setAvt(files[0]);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [url]);

    return (
        <div className="profile-container">
            <span className="text-large">Hồ Sơ Của Tôi</span>
            <div className='d-flex w-100 profile-content flex-wrap'>
                <Form onSubmit={handleSubmit} className='col-12 col-md-6'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập tên"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPhone">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGender">
                            <Form.Label>Giới tính</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Nam"
                                    name="gender"
                                    value="Nam"
                                    checked={formData.gender === 'Nam'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Nữ"
                                    name="gender"
                                    value="Nữ"
                                    checked={formData.gender === 'Nữ'}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formDob">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <button className='button-flex button-hover background-primary text-medium'>
                        Lưu
                    </button>
                </Form>
                <div className='col-12 col-md-6 d-flex align-items-center flex-column gap-2'
                    style={{
                        paddingTop: '100px'
                    }}
                >
                    <div>
                        {url ? <img
                            src={url}
                            alt='User Avatar'
                            className='rounded-circle border'
                            width={100}
                            height={100}
                        /> : <img
                            src='https://via.placeholder.com/100'
                            alt='User Avatar'
                            className='rounded-circle border'
                            width={100}
                            height={100}
                        />}
                    </div>
                    <label htmlFor='avatar' className='button-flex button-hover background-primary text-medium gap-2'
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="bi bi-camera-fill"></i> <span>Chọn ảnh</span>
                        <input accept='image/*' id='avatar' type='file' className='hidden-button-file' onChange={handleChangeImage}></input>
                    </label>
                    <span style={{ textAlign: 'center' }} >Dung lượng tối đa 1MB <br></br> Định dạng jpg, png</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;
