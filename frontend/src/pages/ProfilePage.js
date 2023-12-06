import { useState, useEffect, useCallback } from 'react';
import { Button, Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import ProfileForm from '../components/ProfileForm';
import BMICalculator from '../components/BMICalculator';
import FitnessGoalForm from '../components/FitnessGoalForm';
import MeasurementProgressForm from '../components/MeasurementProgressForm';
import { useToken } from '../useToken';

const ProfilePage = () => {
    const [token] = useToken();
    const [userProfileData, setUserProfileData] = useState({});
    const [profileUpdate, setProfileUpdate] = useState(null);
    const [goalUpdate, setGoalUpdate] = useState(null);
    const [progress, setProgress] = useState({ 
        weightProgress: 0, thighProgress: 0, bicepProgress: 0, chestProgress: 0});
    const [displayMeasurementForm, setDisplayMeasurementForm] = useState(false);
    const [currentMeasurements, setCurrentMeasurements] = useState({
        currentThigh: '', currentBicep: '', currentChest: '',
    });
    const [loading, setLoading ] = useState(true);
    const [error, setError] = useState('');

    const calculateProgress = useCallback(() => {
        if(
            userProfileData &&
            userProfileData.profile &&
            userProfileData.profile.weight &&
            userProfileData.goals
        ){
            if (userProfileData.goals.goalType === 'loseWeight'){
                const weightProgress = userProfileData.profile.weight - userProfileData.goals.weightGoal;
                return { weightProgress };
            }
            if (userProfileData.goals.goalType === 'gainMuscle') {
                const thighProgress = currentMeasurements.currentThigh - userProfileData.goals.thighStart;
                const bicepProgress = currentMeasurements.currentBicep - userProfileData.goals.bicepStart;
                const chestProgress = currentMeasurements.currentChest - userProfileData.goals.chestStart;

                return { thighProgress, bicepProgress, chestProgress};
            }
        }
        return {};
    }, [userProfileData, currentMeasurements]);

    const handleMeasurementFormOpen = () => {
        setDisplayMeasurementForm(true);
    };
    const handleMeasurementFormClose = () => {
        setDisplayMeasurementForm(false);
    };

    const handleUpdateMeasurements = (updatedMeasurements) => {
        setCurrentMeasurements(updatedMeasurements);
    };

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

    useEffect(() => {
        const updateProfileData = async () => {
            const progressData = calculateProgress();
            setProgress(progressData);
        };
        updateProfileData();
    }, [userProfileData, calculateProgress]);

    const handleOnProfileUpdate = async (updatedProfile) => {
        try {
            const filteredProfile = Object.fromEntries(
                Object.entries(updatedProfile).filter(([key, value]) => value !== '')
            );
            const updatedData = {
                ...userProfileData.profile,
                ...filteredProfile,
            };
            const response = await axios.post('/api/updateprofile', {
                profileData: updatedData,
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUserProfileData(response.data.profile);
        setProfileUpdate(null);
        const progressData = calculateProgress();
        setProgress(progressData);
        } catch (error){
            console.error('Error updating user profile', error.message);
        }
    };

    const handleOnGoalUpdate = async (updatedGoals) => {
        try {
            const filteredGoals = Object.fromEntries(
                Object.entries(updatedGoals).filter(([key, value]) => value !== '')
            );
            const updatedData = {
                ...userProfileData.goals,
                ...filteredGoals,
            };

            const response = await axios.post('/api/updategoals',
                { goalData: updatedData},
                { headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setUserProfileData(response.data.goals);
            setGoalUpdate(null);
            const progressData = calculateProgress();
            setProgress(progressData);
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
        <Container className="my-4" >
            <h1>Welcome {userProfileData.profile.name}</h1>
            <h3>Please enter your profile and goal details below.</h3>
            <div className='mb-4' />
            <Row>
                <Col sm={6} style={{backgroundColor: '#F59962', textAlign: 'left', padding: '10px'}} >
                    {profileUpdate ? (
                        <ProfileForm onCancel={() => setProfileUpdate(null)} onUpdateProfile={handleOnProfileUpdate}/>
                    ) : (
                        <div >
                            <h4>Profile:</h4>
                            <p><b>Name:</b> {userProfileData.profile.name}</p>
                            <p><b>Age:</b> {userProfileData.profile.age}</p>
                            <p><b>Weight(kg):</b> {userProfileData.profile.weight}</p>
                            <p><b>Height(cm):</b> {userProfileData.profile.height}</p>

                            <Button variant='primary' size='sm' onClick={() => setProfileUpdate(userProfileData.profile)}>Update Profile</Button>
                            <BMICalculator  weight={userProfileData.profile.weight} height={userProfileData.profile.height} />
                        </div>
                    )}
                </Col>
                <Col sm={6} style={{backgroundColor: '#F59962', textAlign: 'left', padding: '10px'}} >
                    {goalUpdate ? (
                        <FitnessGoalForm onCancel={() => setGoalUpdate(null)} onUpdateGoals={handleOnGoalUpdate} />
                    ) : displayMeasurementForm ? (
                        <MeasurementProgressForm onClose={handleMeasurementFormClose} onUpdateMeasurements={handleUpdateMeasurements} />
                    ) : (
                        <div>
                            <h4 className='mb-4'>Goals:</h4>
                            {userProfileData.goals.goalType === 'loseWeight' && (
                            <div>
                                <p><b>Goal:</b> Lose Weight</p>
                                <p><b>Weight Goal(kg):</b> {userProfileData.goals.weightGoal}</p>
                            </div>
                            )}
                            {userProfileData.goals.goalType === 'gainMuscle' && (
                            <div>
                                <p><b>Goal:</b> Gain Muscle</p>
                                <p>Starting Measurements</p>
                                <p><b>Thigh(cm):</b> {userProfileData.goals.thighStart}</p>
                                <p><b>Bicep(cm):</b> {userProfileData.goals.bicepStart}</p>
                                <p><b>Chest(cm):</b> {userProfileData.goals.chestStart}</p>
                            </div>
                            )}
                            <Button variant='primary' size='sm' onClick={()=> setGoalUpdate(userProfileData.goals)}>Update Goals</Button>
                        </div>
                    )} 
                    <div/>
                    <h4 className='mt-4 mb-4'>Goal Progress:</h4>
                    {userProfileData.goals.goalType === 'loseWeight' && (  
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                        <p><b>Weight Progress:</b><br/>
                        {progress.weightProgress > 0
                            ? ` You are ${progress.weightProgress} kg away from you goal weight!`
                            : progress.weightProgress <= 0
                            ? ' Congrats! You have reached your weight loss goal!'
                            : ''}</p>
                    </div>
                        
                    )}
                    {userProfileData.goals.goalType === 'gainMuscle' && (
                        <div>
                            <p><b>Thigh:</b> {progress.thighProgress > 0 ? `Increased by ${progress.thighProgress} cm`
                                : 'No progress'}</p>
                            <p><b>Bicep:</b> {progress.bicepProgress > 0 ? `Increased by ${progress.bicepProgress} cm`
                                : 'No progress'}</p>
                            <p><b>Chest:</b> {progress.chestProgress > 0 ? `Increased by ${progress.chestProgress} cm`
                                : 'No progress'}</p>
                            <Button variant='primary' size='sm' onClick={handleMeasurementFormOpen}>Update Measurements</Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;

