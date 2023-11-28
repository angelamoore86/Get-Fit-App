import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import ProfileForm from '../components/ProfileForm';
import BMICalculator from '../components/BMICalculator';
import FitnessGoalForm from '../components/FitnessGoalForm';
import { useToken } from '../useToken';

const ProfilePage = () => {
    const [token,  ] = useToken();
    const [userProfileData, setUserProfileData] = useState({});
    // const [profile, setProfile] = useState({});
    // const [goals, setGoals] = useState({});
    const [profileUpdate, setProfileUpdate] = useState(null);
    const [goalUpdate, setGoalUpdate] = useState(null);
    const [loading, setLoading ] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUserProfileData = async () => {
            try {
                const response = await axios.get(`/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserProfileData((prevData) => ({
                    profile: response.data.profile,
                    goals: response.data.goals,
                }));
                setLoading(false);
            } catch(error) {
                setLoading(false);
                setError('Error getting profile data.');
            }
        };
        getUserProfileData();
    }, [token]);

    const handleOnProfileUpdate = async (updatedProfile) => {
        try {
            const response = await axios.post('/api/updateprofile',

                {profileData: updatedProfile },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setUserProfileData(response.data.profile);
            setProfileUpdate(null);
        } catch (error){
            console.error('Error updating user profile', error.message);
        }
    };

    const handleOnGoalUpdate = async (updatedGoals) => {
        try {
            const response = await axios.post('/api/updategoals',
                {goalData: updatedGoals},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setUserProfileData( response.data.goals);
            setGoalUpdate(null);
        } catch (error){
            console.error('Error updating user profile', error);
        }
    };

    if (loading){
        return <p>loading...</p>
    }
    if (error){
        return <p>{error}</p>
    }
  
    return (
        <div>
            <h1>Your Profile</h1>
            <h3>Here you can personalize your profile to help you reach your goals!</h3>
            {goalUpdate ? (
                <FitnessGoalForm onCancel={() => setGoalUpdate(null)} onUpdateGoals={handleOnGoalUpdate} />
            ) : (
                <div>
                    <p>Goal 1: {userProfileData.goals.goal1}</p>
                    <p>Goal 2: {userProfileData.goals.goal2}</p>
                    <p>Goal 3: {userProfileData.goals.goal3}</p>
                    <Button variant='primary' size='sm' onClick={()=> setGoalUpdate(userProfileData.goals)}>Update Goals</Button>
                </div>
            )}
            {profileUpdate ? (
                <ProfileForm onCancel={() => setProfileUpdate(null)} onUpdateProfile={handleOnProfileUpdate}/>
            ) : (
                <div>
                    <p>Name: {userProfileData.profile.name}</p>
                    <p>Age: {userProfileData.profile.age}</p>
                    <p>Weight(kg): {userProfileData.profile.weight}</p>
                    <p>Height(cm): {userProfileData.profile.height}</p>
                    <Button variant='primary' size='sm' onClick={() => setProfileUpdate(userProfileData.profile)}>Update Profile</Button>
                </div>
            )}
            <BMICalculator weight={userProfileData.profile.weight} height={userProfileData.profile.height} />
        </div>
    );
};

export default ProfilePage;
