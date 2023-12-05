
function BMICalculator({ weight, height }) {
    const calculateBMI = () => {
        if (weight > 0 && height > 0){
            const heightInMeters = height/100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            return bmiValue;
        }
    }
    const bmi = calculateBMI();

    return (
        <div className="column-profile-pg">
            <h4 className="mt-4">Your BMI: {bmi}</h4>
            <img src="/images/bmi.jpg" name="BMI" alt="BMI Index Diagram"></img>
        </div>
    );
}

export default BMICalculator;