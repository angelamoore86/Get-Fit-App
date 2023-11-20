import { useState, useEffect } from 'react';

import axios from 'axios';
import ProfileForm from '../components/ProfileForm';
import FitnessGoalForm from '../components/FitnessGoalForm';
import BMICalculator from '../components/BMICalculator';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [goals, setGoals] = useState({});
    const [profileUpdate, setProfileUpdate] = useState(false);
    const [goalUpdate, setGoalUpdate] = useState(false);
    

    useEffect( () => {
        axios.get('/api/userprofile')
        .then((response) => {
            setProfile(response.data);
        })
        .catch((error) => {
            console.error('Error. Could not get profile:', error);
        });

        axios.get('/api/usergoals')
        .then((response) => {
            setGoals(response.data);
        })
        .catch((error) => {
            console.error('Error. Could not get goals.', error);
        });
    }, []);

    const handleOnProfileUpdate = (updatedProfile) => {
      
        axios.put('/api/updateprofile', updatedProfile)
        .then((response) => {
            setProfile(response.data);
            setProfileUpdate(false);
        })
        .catch((error) => {
            console.error("Error. Could not update profile.", error);
        });
    };
    const handleOnGoalUpdate = (updatedGoals) => {

        axios.put('/api/updategoals', updatedGoals)
        .then((response) => {
            setGoals(response.data);
            setGoalUpdate(false);
        })
        .catch((error) => {
            console.error('Error updating user goals.', error);
        });
    };

    return (
        <div>
            <h2>Your Profile</h2>
            <h3>Here you can personalize your profile to help you reach your goals!</h3>
            {goalUpdate ? (
                <FitnessGoalForm onCancel={() => setGoalUpdate(false)} onUpdateGoals={handleOnGoalUpdate} />
            ) : (
                <div>
                    <p>Goal 1: {goals.goal1}</p>
                    <p>Goal 2: {goals.goal2}</p>
                    <p>Goal 3: {goals.goal3}</p>
                    <button onClick={()=> setGoalUpdate(true)}>Update Goals</button>
                </div>
            )}
            {profileUpdate ? (
                <ProfileForm onCancel={() => setProfileUpdate(false)} onUpdateProfile={handleOnProfileUpdate}/>
            ) : (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Age: {profile.age}</p>
                    <p>Gender: {profile.gender}</p>
                    <p>Weight: {profile.weight}</p>
                    <p>Height: {profile.height}</p>
                    <button onClick={() => setProfileUpdate(true)}>Update Profile</button>
                </div>
            )}
            <BMICalculator weight={profile.weight} height={profile.height} />
        </div>
    );
};

export default ProfilePage; 