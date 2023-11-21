import { useUser } from '../useUser';
import { useToken } from '../useToken';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileForm from '../components/ProfileForm';
import FitnessGoalForm from '../components/FitnessGoalForm';
import BMICalculator from '../components/BMICalculator';


const ProfilePage = () => {
    const { user } = useUser();
    const [token, setToken] = useToken();
    const { _id: userId } = user || {};

    const [userProfile, setUserProfile] = useState({});
    const [userGoals, setUserGoals] = useState({});
    const [profileUpdate, setProfileUpdate] = useState(false);
    const [goalUpdate, setGoalUpdate] = useState(false);

    useEffect( () => {

        if (userId) {
            const headers = { Authorization: `Bearer ${token}`};

            axios.get(`/api/userprofile/${userId}`, { headers })
                .then((response) => { 
                    setUserProfile(response.data);
                })
                .catch((error) => {
                    console.error('Error getting profile:', error);
                });
                   
            axios.get(`/api/usergoals/${userId}`, { headers })
                .then((response) => {
                    setUserGoals(response.data);
                })
                .catch((error) => {
                    console.error('Error getting goals:', error);
                });
        }
    }, [userId, token]);

    const handleOnProfileUpdate = async (updatedProfile) => {
        try {
            const { _id: userId } = user || {};

            if (userId){
                const headers = { Authorization: `Bearer ${token}`};

                const response = await axios.put(`/api/updateprofile/${userId}`, updatedProfile, { headers });
                const { token: newToken } = response.data;
                setToken(newToken);
                setUserProfile(response.data);
                setProfileUpdate(false);
            } else {
                console.error('User is not defined.')
            }
        } catch (error) {
            console.error("Error. Could not update profile data.", error);
        }
    };
    const handleOnGoalUpdate = async (updatedGoals) => {
        try {
            const { _id: userId } = user || {};

            if (userId){
                const headers = { Authorization: `Bearer ${token}`};
                const response = await axios.put(`/api/updategoals/${userId}`, updatedGoals, { headers });
                const { token: newToken } = response.data;
                setToken(newToken);
                setUserGoals(response.data);
                setGoalUpdate(false);
            } else {
                console.error('User is not defined.')
            }
        } catch (error) {
            console.error("Error. Could not update goal data.", error);
        }
    };

    return (
        <div>
            <h1>Your Profile</h1>
            <h3>Here you can personalize your profile to help you reach your goals!</h3>
            {goalUpdate ? (
                <FitnessGoalForm onCancel={() => setGoalUpdate(false)} onUpdateGoals={handleOnGoalUpdate} />
            ) : (
                <div>
                    <p>Goal 1: {userGoals.goal1}</p>
                    <p>Goal 2: {userGoals.goal2}</p>
                    <p>Goal 3: {userGoals.goal3}</p>
                    <button onClick={()=> setGoalUpdate(true)}>Update Goals</button>
                </div>
            )}
            {profileUpdate ? (
                <ProfileForm onCancel={() => setProfileUpdate(false)} onUpdateProfile={handleOnProfileUpdate}/>
            ) : (
                <div>
                    <p>Name: {userProfile.name}</p>
                    <p>Age: {userProfile.age}</p>
                    <p>Gender: {userProfile.gender}</p>
                    <p>Weight: {userProfile.weight}</p>
                    <p>Height: {userProfile.height}</p>
                    <button onClick={() => setProfileUpdate(true)}>Update Profile</button>
                </div>
            )}
            <BMICalculator weight={userProfile.weight} height={userProfile.height} />
        </div>
    );
};

export default ProfilePage;