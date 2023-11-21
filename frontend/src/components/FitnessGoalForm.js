import { useState } from "react";

const FitnessGoalForm = ({ onCancel, onUpdateGoals }) => {
    const [goals, setGoals] = useState({
        goal1: '',
        goal2: '',
        goal3: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGoals((goals) => ({
            ...goals,
            [name]: value,
        }));
    };

    const handleUpdateGoals = () => {
        onUpdateGoals(goals);
        onCancel();
    }
    return (
        <div>
            <h3>Your Fitness Goals</h3>
            <div className="right">
                <label>Goal 1: <input type="text" name="goal1" value={goals.goal1} onChange={handleInputChange} /></label><br />
                <label>Goal 2: <input type="text" name="goal2" value={goals.goal2} onChange={handleInputChange} /></label><br />
                <label>Goal 3: <input type="text" name="goal3" value={goals.goal3} onChange={handleInputChange} /></label><br />
            </div>
            <button onClick={handleUpdateGoals}>Update Goals</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default FitnessGoalForm;