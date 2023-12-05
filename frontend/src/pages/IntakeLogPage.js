import React, { useState } from 'react';
import styles from './IntakeLogPage.module.css';
import { useToken } from '../useToken';

function IntakeLogPage() {
  const [token] = useToken();
  const [date, setDate] = useState('');
  const [foodIntake, setFoodIntake] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [water, setWater] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!token) {
        console.error('No token available.');
        return;
      }

      const response = await fetch('/api/intakelog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          foodIntake,
          carbohydrates,
          protein,
          fats,
          water,
        }),
      });

      if (response.ok) {
        console.log('Intake log saved successfully');
        setDate('');
        setFoodIntake('');
        setCarbohydrates('');
        setProtein('');
        setFats('');
        setWater('');
      } else {
        console.error('Error saving intake log');
      }
    } catch (error) {
      console.error('Error saving intake log:', error);
    }
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.textCenter}>Intake Log Page</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.dateSection}>
          <label>
            Date:
            <input
              type="date"
              className={styles.formControl}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.intakeSection}>
          <div className={styles.foodIntake}>
            <label>
              Food Intake:
              <textarea
                className={`${styles.largeInput} ${styles.foodIntakeInput}`}
                value={foodIntake}
                onChange={(e) => setFoodIntake(e.target.value)}
                rows="3"
              />
            </label>
          </div>

          <div className={styles.nutrition}>
            <div>
              <label>Carbohydrates (Grams):</label>
              <input
                type="number"
                className={styles.formControl}
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
              />
            </div>
            <div>
              <label>Protein (Grams):</label>
              <input
                type="number"
                className={styles.formControl}
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            <div>
              <label>Fats (Grams):</label>
              <input
                type="number"
                className={styles.formControl}
                value={fats}
                onChange={(e) => setFats(e.target.value)}
              />
            </div>
            <div>
              <label>Water (Litres):</label>
              <input
                type="number"
                className={styles.formControl}
                value={water}
                onChange={(e) => setWater(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.btnDark}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default IntakeLogPage;
