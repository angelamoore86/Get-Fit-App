import { useState } from "react";
import { Button, Form } from 'react-bootstrap'
const FitnessGoalForm = ({ onCancel, onUpdateGoals }) => {
    const [goals, setGoals] = useState({
        goal1: '',
        goal2: '',
        goal3: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGoals((prevGoals) => ({
            ...prevGoals,
            [name]: value,
        }));
    };

    const handleUpdateGoals = (e) => {
        const updatedGoals = Object.fromEntries(
            Object.entries(goals).filter(([_, value]) => value !== '')
        );

        onUpdateGoals(updatedGoals);
        onCancel();
        window.location.reload(false);
    }
    return (
        <div>
            <h3>Your Fitness Goals</h3>
            <div className="right">
                <Form.Label>Goal 1: <Form.Control type="text" name="goal1" value={goals.goal1} onChange={handleInputChange} /></Form.Label><br />
                <Form.Label>Goal 2: <Form.Control type="text" name="goal2" value={goals.goal2} onChange={handleInputChange} /></Form.Label><br />
                <Form.Label>Goal 3: <Form.Control type="text" name="goal3" value={goals.goal3} onChange={handleInputChange} /></Form.Label><br />
            </div>
            <Button variant='primary' size='sm' onClick={handleUpdateGoals}>Update Goals</Button>
            <Button variant='primary' size='sm' onClick={onCancel}>Cancel</Button>
        </div>
    );
};

export default FitnessGoalForm;