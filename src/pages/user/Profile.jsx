import React, { useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUploadCustom";
import DefaultCertImg from "../../images/cert-frame.png";
import UserDefaultImage from "../../images/user_profile.png";
import { getProfile } from "../../api/profileService";
import { useParams } from "react-router-dom";
import { adminCustomerRole } from "../../utils/checkRole";
import loadingGIF from "../../images/loading.gif"

const FormField = ({ id, label, placeholder, value, onChange }) => (
    <li className="py-3 flex justify-between items-center gap-10">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input type="text" id={id} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />
    </li>
);

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        displayName: '',
        gender: '',
        age: '',
        experience: '',
        phoneNumber: '',
        address: '',
        price: ''
    });
    const { id } = useParams() // {id} get from Router path <App/> in App.js
    function handleChange(e) {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(formState);
        
    }

    const fetchProfile = async () => {
        try {
            const { statusCode, user } = await getProfile(id);
            if (user && statusCode === 200) {
                setProfile(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = `Profile`;
        fetchProfile();
    }, []);
    if (!profile) {
        return <div className="w-40 mt-44 mx-auto" >
            <img src={loadingGIF} alt="Loading" />
        </div>
    }
    return (
        <section className="p-10 rounded-2xl bg-white container text-black">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className="text-2xl py-10 text-black m-auto">MY PROFILE</h1>
                <div className="flex justify-around">
                    <div>
                        <FormField id="displayName" label="Display Name:" placeholder={profile.displayName} value={formState.displayName} onChange={handleChange} />
                        <FormField id="gender" label="Gender:" placeholder="Gender" value={formState.gender} onChange={handleChange} />
                        <FormField id="age" label="Age" placeholder="Age" value={formState.age} onChange={handleChange} />
                        <FormField id="experience" label="Year of Experiences" placeholder="Year of Experiences" value={formState.experience} onChange={handleChange} />
                        <FormField id="phoneNumber" label="Phone Number" placeholder="Phone Number" value={formState.phoneNumber} onChange={handleChange} />
                        <FormField id="address" label="Address" placeholder="Address" value={formState.address} onChange={handleChange} />
                        <FormField id="price" label="Price" placeholder="Price" value={formState.price} onChange={handleChange} />
                    </div>
                    <ImageUploader defaultImage={`${profile.photoURL ? profile.photoURL : UserDefaultImage}`} typeImage={"photo"} />
                </div>
                <div className="w-1/2 flex justify-evenly m-auto">
                    <button type="submit" className="rounded-lg px-12 py-4 bg-blue-400 hover:bg-blue-500 text-white">
                        {loading ?
                            <img className="w-20 px-6 " src={loadingGIF} alt="Loading" />
                            : 'Save'
                        }
                    </button>
                    <button type="reset" className="rounded-lg px-12 py-4 bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
                </div>
            </form>
            <div className={`${adminCustomerRole ? 'hidden' : ""}`}>
                <h2 className="text-black flex justify-center py-5">Certificate</h2>
                <div className="overflow-auto flex gap-5">
                    {
                        profile.certURL && profile.certURL?.length > 0
                            ? (
                                <>
                                    <ImageUploader key={profile.certURL.length} defaultImage={DefaultCertImg} typeImage={'certificate'} />
                                    {profile.certURL.map((cert, index) => (
                                        <ImageUploader key={index} defaultImage={`${cert ? cert : DefaultCertImg}`} typeImage={'certificate'} />
                                    ))}
                                </>
                            )
                            : Array(4).fill().map((_, index) => (
                                <ImageUploader key={index} defaultImage={DefaultCertImg} typeImage={'certificate'} />
                            ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Profile;