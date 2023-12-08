import React, { useState, useEffect } from 'react';
import styles from './IntakeLogPage.module.css';
import { useToken } from '../useToken';
import axios from 'axios';

function IntakeLogPage() {
  const [token] = useToken();
  const [date, setDate] = useState('');
  const [ selectedDate, setSelectedDate ] = useState('');
  const [intakeLog, setIntakeLog ] = useState({});
  const [foodIntake, setFoodIntake] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [water, setWater] = useState('');
  const [ dateOptions, setDateOptions ] = useState([]);
  const [ displayLog, setDisplayLog ] = useState(false);

  const handleSelectedDateChange = (e) => {
    const newSelectedDate = e.target.value;
    setSelectedDate(newSelectedDate);
    setDisplayLog(true);
  };
  
  useEffect(() => {
    const getIntakeLog = async () => {
      try{
        const response = await axios.get(`/api/intakelog/${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIntakeLog(response.data);
      } catch (error){
        console.error('Error. Could not get goals.', error);    
      }
    };
    if (selectedDate){
    getIntakeLog();
  }
}, [selectedDate, token]);

useEffect(() => {
  const getIntakeLogDates = async () => {
    try {
      const response = await axios.get('/api/getintakelogdates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDateOptions(response.data.dates);
    } catch (error) {
      console.error('Error getting log dates:', error);
    }
  };
  getIntakeLogDates();
}, [token]);

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
        setIntakeLog(response.data);
        setDate('');
        setFoodIntake('');
        setCarbohydrates('');
        setProtein('');
        setFats('');
        setWater('');
        window.location.reload();
      } else {
        console.error('Error saving intake log');
      }
    } catch (error) {
      console.error('Error saving intake log:', error);
    }
  }
  
  return (
    <div className={styles.container}>
      <h1>Intake Log Page</h1>
      <h4>Please fill out form to submit intake log</h4>

      <div className={styles.intakeSection}>
        <div className={styles.foodIntakeInput}>
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
            <div className={styles.foodIntake}>
              <label>
                Food Intake:
                <textarea
                  className={styles.largeInput}
                  value={foodIntake}
                  onChange={(e) => setFoodIntake(e.target.value)}
                  rows="3"
                />
              </label>
            </div>

            <div className={styles.nutrition}>
                <label>Carbohydrates (Grams):</label>
                <input
                  type="number"
                  className={styles.formControl}
                  value={carbohydrates}
                  onChange={(e) => setCarbohydrates(e.target.value)}
                />
              
                <label>Protein (Grams):</label>
                <input
                  type="number"
                  className={styles.formControl}
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              
                <label>Fats (Grams):</label>
                <input
                  type="number"
                  className={styles.formControl}
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                />
              
                <label>Water (Litres):</label>
                <input
                  type="number"
                  className={styles.formControl}
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.btnDark}>
                Submit
              </button>
          </form>
        </div>
        <div className={styles.logSection}>
          <h4>View Past Logs</h4>
          <select value={selectedDate} onChange={handleSelectedDateChange}>
            <option value="">Select Date</option>
            {dateOptions.map((date) => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
          <div className='mt-4'/>
          {displayLog && (
            <div>
              <h4>Intake Log for {intakeLog.date}</h4>
              <p><b>Food Log:</b> {intakeLog.foodIntake}</p>
              <p><b>Carbohydrates:</b> {intakeLog.carbohydrates}</p>
              <p><b>Protein:</b> {intakeLog.protein}</p>
              <p><b>Fats:</b> {intakeLog.fats}</p>
              <p><b>Water:</b> {intakeLog.water}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IntakeLogPage;
