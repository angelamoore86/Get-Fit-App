import React, { useState } from 'react';
import axios from 'axios';
import styles from './FitnessLogPage.module.css';

function FitnessLogPage() {
  const [date, setDate] = useState('');
  const [cardio, setCardio] = useState('');
  const [strengthTraining, setStrengthTraining] = useState('');

  const handleDateChange = (e) => setDate(e.target.value);
  const handleCardioChange = (e) => setCardio(e.target.value);
  const handleStrengthTrainingChange = (e) => setStrengthTraining(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cardio || strengthTraining) {
        await axios.post('http://localhost:8000/api/workout/submit', {
          date, 
          cardioData: cardio, 
          strengthTrainingData: strengthTraining
        });
        setCardio('');
        setStrengthTraining('');
      }
      console.log('Submission successful');
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.textCenter}>Fitness Log Page</h1>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.dateSection}>
          <label>
            Date:
            <input type="date" className={styles.formControl} value={date} onChange={handleDateChange} />
          </label>
        </div>

        <div className={styles.activitySection}>
          <div className={styles.cardio}>
            <label>
              Cardio:
              <textarea className={styles.largeInput} value={cardio} onChange={handleCardioChange} placeholder='Enter cardio...' rows="3"></textarea>
            </label>
          </div>

          <div className={styles.strengthTraining}>
            <label>
              Strength Training:
              <textarea className={styles.largeInput} value={strengthTraining} onChange={handleStrengthTrainingChange} placeholder='Enter Strength Training...' rows="3"></textarea>
            </label>
          </div>
        </div>

        <button type="submit" className={styles.btnDark}>Submit</button>
      </form>
    </div>
  );
}

export default FitnessLogPage;
