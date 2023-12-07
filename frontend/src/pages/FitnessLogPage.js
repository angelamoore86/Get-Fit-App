import React, { useState } from 'react';
import styles from './FitnessLogPage.module.css';
import { useToken } from '../useToken';

function FitnessLogPage() {
  const [token] = useToken();
  const [date, setDate] = useState('');
  const [cardio, setCardio] = useState('');
  const [strengthTraining, setStrengthTraining] = useState('');

  const handleDateChange = (e) => setDate(e.target.value);
  const handleCardioChange = (e) => setCardio(e.target.value);
  const handleStrengthTrainingChange = (e) => setStrengthTraining(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!token) {
        console.error('No token available.');
        return;
      }

      const response = await fetch('/api/fitnesslog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          cardioData: cardio,
          strengthTrainingData: strengthTraining,
        }),
      });

      if (response.ok) {
        console.log('Fitness log saved successfully');
        setDate('');
        setCardio('');
        setStrengthTraining('');
      } else {
        console.error('Error saving fitness log');
      }
    } catch (error) {
      console.error('Error saving fitness log:', error);
    }
  }

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
