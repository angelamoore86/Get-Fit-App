import { useState } from "react";

const ProfileForm = ({ onCancel, onUpdateProfile }) => {
    const [profile, setProfile] = useState({
        username: '',
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile((profile) => ({
            ...profile,
            [name]: value,
        }));
    };
    
    const handleOnUpdate = () => {
        onUpdateProfile(profile);
        onCancel();
    };

    return (
        <div>
        <h3>Edit Profile</h3>
            <h3>Please update your profile information below.</h3>
            <div className="right">
            <div class="right">

                <label>Name: <input type="text" name="name" value={profile.name} onChange={handleInputChange} /></label><br />
                <label>Age: <input type="text" name="age" value={profile.age} onChange={handleInputChange} /></label><br />
                <label>Gender: <input type="text" name="gender" value={profile.gender} onChange={handleInputChange} /></label><br />
                <label>Weight: <input type="text" name="weight" value={profile.weight} onChange={handleInputChange} /></label><br />
                <label>Height: <input type="text" name="height" value={profile.height} onChange={handleInputChange} /></label><br />
            </div>
            <button onClick={handleOnUpdate}>Update Profile</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ProfileForm;