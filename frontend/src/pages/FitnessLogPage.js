import React, { useEffect, useState } from 'react';
import styles from './FitnessLogPage.module.css';
import { useToken } from '../useToken';
import axios from 'axios';

function FitnessLogPage() {
  const [token] = useToken();
  const [date, setDate] = useState('');
  const [ selectedDate, setSelectedDate ] = useState('');
  const [fitnessLog, setFitnessLog ] = useState({});
  const [cardio, setCardio] = useState('');
  const [ dateOptions, setDateOptions ] = useState([]);
  const [strengthTraining, setStrengthTraining] = useState('');
  const [ displayLog, setDisplayLog ] = useState(false);

  const handleDateChange = (e) => setDate(e.target.value);
  const handleCardioChange = (e) => setCardio(e.target.value);
  const handleStrengthTrainingChange = (e) => setStrengthTraining(e.target.value);
  const handleSelectedDateChange = (e) => {
    const newSelectedDate = e.target.value;
    setSelectedDate(newSelectedDate);
    setDisplayLog(true);
  };

  useEffect(() => {
    const getFitnessLog = async () => {
      try{
        const response = await axios.get(`/api/fitnesslog/${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFitnessLog(response.data);
      } catch (error){
        console.error('Error. Could not get goals.', error);    
      }
    };
    if (selectedDate){
    getFitnessLog();
  }
}, [selectedDate, token]);

useEffect(() => {
  const getFitnessLogDates = async () => {
    try {
      const response = await axios.get('/api/getlogdates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDateOptions(response.data.dates);
    } catch (error) {
      console.error('Error getting log dates:', error);
    }
  };
  getFitnessLogDates();
}, [token]);

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
        setFitnessLog(response.data);
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
      <div>
        <h4>View Past Logs</h4>
        <label>Date: </label>
        <select value={selectedDate} onChange={handleSelectedDateChange}>
          <option value="">Select Date</option>
          {dateOptions.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        {displayLog && (
          <div>
            <h4>Fitness Log for {fitnessLog.date}</h4>
            <p><b>Cardio:</b> {fitnessLog.cardio}</p>
            <p><b>Strength Training:</b> {fitnessLog.strengthTraining}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessLogPage;
