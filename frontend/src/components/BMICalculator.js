
function BMICalculator({ weight, height }) {
    const calculateBMI = () => {
        if (weight > 0 && height > 0){
            const heightInMeters = height/100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            return bmiValue;
        }
    }
    const bmi = calculateBMI();

    return (
        <div>
            <p>BMI: {bmi}</p>
        </div>
    );
}

export default BMICalculator;