import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import loadingGIF from "../../assets/images/loading.gif";

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
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        document.title = `Log In`;
    }, []);

    const { signInWithGoogle, login } = useAuth();
    const navigate = useNavigate();
    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const { message, statusCode } = await login(formData);
        if (statusCode === 200) {
            navigate('/')
        } else {
            setMessageRes(message)
        }
        setLoading(false);
    }

    async function handleLoginGoogle(e) {
        e.preventDefault();
        setLoading(true);
        const res = await signInWithGoogle();
        if (res) {
            navigate("/");
        }
        setLoading(false);
    }

    return (
        <div className=" py-10 rounded-3xl mt-40 sm:w-1/2 md:w-1/2 lg:w-1/3 bg-white mx-auto">
            <form onSubmit={handleSubmit} className="mx-10 flex flex-col justify-center items-center">
                <InputField id="email" type="email" placeholder="E-Mail Address" value={formData.email} onChange={handleFormChange} />
                <InputField id="password" type="password" placeholder="Password" value={formData.password} onChange={handleFormChange} />

                {loading
                    ? <img className="w-20" src={loadingGIF} alt="Loading" />
                    : <span className="text-red-500">{messageRes}</span>
                }
                <div className="mb-10">
                    <button className={`${loading ?? "bg-gray-400"} flex justify-center w-full bg-blue-600 hover:bg-blue-500 hover:text-white cursor-pointer rounded-lg text-sm font-semibold text-white focus px-6 py-3 uppercase btn lg sm:text-sm sm:px-2 md:text-base md:px-4 `}>Sign In</button>
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