import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function InputField({ id, type, placeholder, value, onChange }) {
    return (
        <div className="mb-10 w-full">
            <label className="block uppercase text-gray-500" htmlFor={id}>
                {placeholder}
            </label>
            <input
                required
                type={type}
                id={id}
                className=" w-full bg-transparent border-b border-gray-500 text-black outline-none py-2 px-2 mt-2"
                placeholder={`Enter your ${placeholder.toLowerCase()}`}
                name={id}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

function Login() {
    const [messageRes, setMessageRes] = useState('')
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        document.title = `Log In`;
    }, []);

    const { signInWithGoogle, login, resetPassword } = useAuth();
    const navigate = useNavigate();
    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const { message, statusCode } = await login(formData);
        if (statusCode === 200) {
            navigate('/')
        } else {
            setMessageRes(message)
        }
        // const res = await resetPassword("trangiacuong216@gmail.com")
        // console.log("res ==> ", res)
    }

    async function handleLoginGoogle(e) {
        e.preventDefault();
        const res = await signInWithGoogle();
        if (res) {
            navigate("/");
        }
    }


    return (
        <div className="mx-auto py-10 rounded-3xl bg-white mt-40 w-1/3">
            <form onSubmit={handleSubmit} className="mx-10 flex flex-col justify-center items-center">
                <InputField id="email" type="email" placeholder="E-Mail Address" value={formData.email} onChange={handleFormChange} />
                <InputField id="password" type="password" placeholder="Password" value={formData.password} onChange={handleFormChange} />
                <span className="text-red-500">{messageRes}</span>
                <div className="mb-10">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full h-12 w-full text-lg font-medium">Sign In</button>
                    <div className="mt-4">
                        <GoogleButton className="googleBtn" type="light" label="Login with Google" onClick={handleLoginGoogle} />
                    </div>
                    <label className="text-gray-500 text-sm mt-4 flex justify-center">
                        <Link to="/forgot-password" className=" border-b border-blue-600 pb-1">
                            Forgot password?
                        </Link>
                    </label>
                </div>
                <div className="font-medium my-5 text-lg ">Don't have an account?</div>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                    <button className="block bg-white text-blue-600 border border-gray-400 rounded-full h-12 w-60 text-lg font-medium">Join Now</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;