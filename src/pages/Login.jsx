import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const submit = (data) => {
        axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
            .then(res => {localStorage.setItem("token", res.data.token)
                        navigate("/")})
            .catch(error => {
                if(error.response.status === 401){
                    alert("Credenciales incorrectas")
                } else{
                    console.log(error);
                }
            })
    }

    return (
        <div className='login'>
            <p className='login-text'>Welcome! Enter your email and password to continue</p>
            <div className='test-data'>
                <b className='test-title'>test data</b>
                <div className='test-item'><i className='bx bx-envelope'></i><p>john@gmail.com</p></div>
                <div className='test-item'><i className='bx bx-lock-alt' ></i><p>john1234</p></div>
            </div>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password")} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;