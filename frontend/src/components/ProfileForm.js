import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
        <div className='column-profile-pg'>
            <h3>Please update your profile below.</h3>
                <Form.Label>Name: <Form.Control type="text" name="name" value={profile.name} onChange={handleInputChange} /></Form.Label><br />
                <Form.Label>Age: <Form.Control type="text" name="age" value={profile.age} onChange={handleInputChange} /></Form.Label><br />
                <Form.Label>Weight(kg): <Form.Control type="text" name="weight" value={profile.weight} onChange={handleInputChange} /></Form.Label><br />
                <Form.Label>Height(cm): <Form.Control type="text" name="height" value={profile.height} onChange={handleInputChange} /></Form.Label><br />
                <Button variant='primary' size='sm' onClick={handleOnUpdate}>Update Profile</Button>
                <Button variant='primary' size='sm' onClick={onCancel}>Cancel</Button>
        </div>  
    );
};

export default ProfileForm;