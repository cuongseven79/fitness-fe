import React, { useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUploadCustom";
import DefaultCertImg from "../../images/cert-frame.png";
import UserDefaultImage from "../../images/user_profile.png";
import { getProfile, updateProfile, updateSwitch } from "../../api/profileService";
import { useParams } from "react-router-dom";
import { adminCustomerRole, ptRole } from "../../utils/checkRole";
import loadingGIF from "../../images/loading.gif"
import { message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';

const FormField = ({ id, label, placeholder, value, onChange }) => (
    <li className="py-3 flex justify-between items-center gap-10">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input type="text" id={id} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />
    </li>
);

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({});
    const { id } = useParams() // {id} get from Router path <App/> in App.js


    const successMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Update profile successfully!',
            duration: 2,
            style: { position: "relative", top: 70 }
        });
    };
    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'Nothing updated!',
            duration: 2,
            style: { position: "relative", top: 70 }
        });
    };

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateProfile(formData, id);
            if (res.statusCode === 200) {
                setProfile(res.user);
                setFormData(null)
            }
            successMessage();
        } catch (error) {
            errorMessage();
            console.error('An error occurred during profile update:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSwitching = async (newStatus) => {
        try {
            setChecked(newStatus);
            const { statusCode, trainerStatus } = await updateSwitch(id, newStatus);
            if (statusCode === 200) {
                setChecked(trainerStatus)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProfile = async () => {
        try {
            const { statusCode, user } = await getProfile(id);
            if (user && statusCode === 200) {
                setProfile(user);
                setChecked(user?.trainerStatus)
            }
        } catch (error) {
            console.log(error);
            alert("Sorry, System is maintaining, please come back later!");
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
    console.log(checked)
    return (
        <section className="p-10 rounded-2xl bg-white container text-black">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-between py-10">
                    <h1 className="text-2xl  uppercase font-semibold text-[#F1B143]">My profile</h1>
                    {ptRole && <Switch checkedChildren="Available" unCheckedChildren="Busy" value={checked} className="bg-gray-500" onClick={() => handleSwitching(!checked)} />}
                </div>
                <div className="flex justify-around">
                    <div>
                        <FormField id="displayName" label="Display Name:" placeholder={profile.displayName} value={formData.displayName} onChange={handleChange} />
                        <FormField id="gender" label="Gender:" placeholder={profile.gender} value={formData.gender} onChange={handleChange} />
                        <FormField id="age" label="Age" placeholder={profile.age} value={formData.age} onChange={handleChange} />
                        {ptRole && <FormField id="experience" label="Year of Experiences" placeholder={profile.experience} value={formData.experience} onChange={handleChange} />}
                        <FormField id="phoneNumber" label="Phone Number" placeholder={profile.phoneNumber} value={formData.phoneNumber} onChange={handleChange} />
                        <FormField id="address" label="Address" placeholder={profile.address} value={formData.address} onChange={handleChange} />
                        {ptRole && <FormField id="price" label="Price" placeholder={profile.price} value={formData.price} onChange={handleChange} />}
                    </div>
                    <ImageUploader defaultImage={`${profile.photoURL ? profile.photoURL : UserDefaultImage}`} typeImage={"photo"} />
                </div>
                {contextHolder}
                <div className=" mt-10  flex justify-center">
                    <button type="submit" className="rounded-lg px-12 py-4 bg-blue-400 hover:bg-blue-500 text-white">
                        {loading ?
                            <div className="w-20 px-6">
                                <img className=" " src={loadingGIF} alt="Loading" />
                            </div>
                            : <span className="w-20 px-6">Save</span>
                        }
                    </button>
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


