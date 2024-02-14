import React, { useCallback, useEffect, useState, memo } from "react";
import ImageUploader from "../../components/ImageUploadCustom";
import DefaultCertImg from "../../assets/images/cert-frame.png";
import UserDefaultImage from "../../assets/images/user_profile.png";
import { getProfile, updateSwitch } from "../../api/profileService";
import { useParams } from "react-router-dom";
import { adminCustomerRole, ptRole } from "../../utils/checkRole";
import loadingGIF from "../../assets/images/loading.gif"
import { Switch, message } from 'antd';
import { ProfileForm } from "../../components/profile/ProfileForm";

//Wrapper memo 
const ImageUploaderMemo = memo(ImageUploader);

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [checked, setChecked] = useState(false);
    const [disabledSwitch, setDisabledSwitch] = useState(true); //Set status switch button for coach.
    const { id } = useParams() // {id} get from Router path <App/> in App.js

    const handleSwitching = useCallback(async (newStatus) => {
        try {
            setChecked(newStatus);
            const { statusCode, trainerStatus } = await updateSwitch(id, newStatus);
            if (statusCode === 200) {
                setChecked(trainerStatus)
            }
        } catch (error) {
            console.log(error)
        }
    }, [id]);

    const fetchProfile = useCallback(async () => {
        try {
            const { statusCode, user } = await getProfile(id);
            if (user && statusCode === 200) {
                setProfile(user);
                setChecked(user?.trainerStatus)
            }
        } catch (error) {
            message.error('Error Fetch Profile !')
        }
    }, [id]);

    useEffect(() => {
        document.title = `Profile`;
        fetchProfile();
    }, [fetchProfile]);

    if (!profile) {
        return <div className="w-40 mt-44 mx-auto" >
            <img src={loadingGIF} alt="Loading" />
        </div>
    }
    return (
        <section className="p-10 rounded-2xl bg-white container text-black">
            <div className="flex justify-between py-10">
                <h1 className="text-2xl  uppercase font-semibold text-[#F1B143]">My profile</h1>
                {ptRole && <div>
                    <span className="text-sm font-serif">Coach status: </span>
                    <Switch disabled={disabledSwitch} checkedChildren="Available" unCheckedChildren="Busy" value={checked} className="bg-gray-500" onClick={() => handleSwitching(!checked)} />
                </div>}
            </div>
            <div className="flex justify-evenly">
                <ProfileForm profile={profile} id={id} setDisabledSwitch={setDisabledSwitch} />
                <ImageUploaderMemo defaultImage={`${profile.photoURL ? profile.photoURL : UserDefaultImage}`} typeImage={"photo"} />
            </div>
            <div className={`${adminCustomerRole ? 'hidden' : ""}`}>
                <h2 className="text-black py-5">Certificate</h2>
                <div className="overflow-auto flex gap-5">
                    {
                        profile.certURL && profile.certURL?.length > 0
                            ? (
                                <>
                                    <ImageUploaderMemo key={profile.certURL.length} defaultImage={DefaultCertImg} typeImage={'certificate'} />
                                    {profile.certURL.map((cert, index) => (
                                        <ImageUploaderMemo key={index} defaultImage={`${cert ? cert : DefaultCertImg}`} typeImage={'certificate'} />
                                    ))}
                                </>
                            )
                            : Array(4).fill().map((_, index) => (
                                <ImageUploaderMemo key={index} defaultImage={DefaultCertImg} typeImage={'certificate'} />
                            ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Profile;


