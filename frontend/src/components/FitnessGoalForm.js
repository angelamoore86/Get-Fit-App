import { useState } from "react";
import { Button, FormControl, FormLabel } from 'react-bootstrap'
const FitnessGoalForm = ({ onCancel, onUpdateGoals }) => {
    const [goals, setGoals] = useState({
        goalType: '',
        weightGoal: '',
        thighStart: '',
        bicepStart: '',
        chestStart: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGoals((prevGoals) => ({
            ...prevGoals,
            [name]: value,
        }));
    };

    const handleUpdateGoals = (e) => {
        e.preventDefault();
        onUpdateGoals(goals);
        onCancel();
        window.location.reload(false);
    }
    return (
        <div>
            <h4>Please select your goal:</h4>
            <FormLabel>
                <FormControl as="select" name="goalType" value={goals.goalType} onChange={handleInputChange}>
                    <option value="">Select Goal:</option>
                    <option value="loseWeight">Lose Weight</option>
                    <option value="gainMuscle">Gain Muscle</option>
                    {/* <option value="increaseActivity">Increase Activity</option> */}
                </FormControl>
            </FormLabel><br />
                {goals.goalType === 'loseWeight' && (
                    <div>
                        <FormLabel>Weight Goal: <FormControl type='text' name='weightGoal' 
                    value={goals.weightGoal} onChange={handleInputChange} /></FormLabel><br />
                    </div>
                )}
                {goals.goalType === 'gainMuscle' && (
                    <div>
                        <FormLabel>Thigh Measurement: <FormControl type='text' name='thighStart' 
                    value={goals.thighStart} onChange={handleInputChange} /></FormLabel>
                        <FormLabel>Bicep Measurement: <FormControl type='text' name='bicepStart' 
                    value={goals.bicepStart} onChange={handleInputChange} /></FormLabel>
                        <FormLabel>Chest Measurement: <FormControl type='text' name='chestStart' 
                    value={goals.chestStart} onChange={handleInputChange} /></FormLabel>
                    </div>
                )}
            <Button variant='primary' size='sm' onClick={handleUpdateGoals}>Update Goals</Button>
            <Button variant='primary' size='sm' onClick={onCancel}>Cancel</Button>    
        </div>
    );
};

export default FitnessGoalForm;