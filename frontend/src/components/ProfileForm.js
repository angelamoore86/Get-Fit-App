import { useState } from "react";

const ProfileForm = ({ onCancel, onUpdateProfile }) => {
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };
   
    const handleOnUpdate = (e) => {
        e.preventDefault();
        onUpdateProfile(profile);
        onCancel();
        window.location.reload(false);
    };

    return (
        <div>
        <h3>Edit Profile</h3>
            <h3>Please update your profile information below.</h3>
            <div className="right">

                <label>Name: <input type="text" name="name" value={profile.name} onChange={handleInputChange} /></label><br />
                <label>Age: <input type="number" name="age" value={profile.age} onChange={handleInputChange} /></label><br />
                <label>Weight(kg): <input type="number" name="weight" value={profile.weight} onChange={handleInputChange} /></label><br />
                <label>Height(cm): <input type="number" name="height" value={profile.height} onChange={handleInputChange} /></label><br />
            </div>
            <button onClick={handleOnUpdate}>Update Profile</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ProfileForm;