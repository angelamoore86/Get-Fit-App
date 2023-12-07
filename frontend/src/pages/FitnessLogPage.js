import React, { useState } from 'react';
import './FitnessLogPage.css';
import { Button, Form } from 'react-bootstrap'

function FitnessLogPage() {
    const [date, setDate] = useState('');
    const [cardio, setCardio] = useState('');
    const [strengthTraining, setStrengthTraining] = useState('');

    const handleDateChange = (e) => setDate(e.target.value);
    const handleCardioChange = (e) => setCardio(e.target.value);
    const handleStrengthTrainingChange = (e) => setStrengthTraining(e.target.value);

    return (
        <div className="container">
            <h1 className="text-center my-4">Fitness Log Page</h1>

            <div className="row mb-4">
                <div className="col-12">
                    <Form.Group className="mb-2">
                        <Form.Label>
                            <h4>Date:</h4>
                            <Form.Control type="date" value={date} onChange={handleDateChange} />
                        </Form.Label>
                    </Form.Group>
                    <div>
                        <Button variant='primary' size='sm'>Submit Date</Button>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Form.Group className="mb-2">
                        <Form.Label>
                            <h4>Cardio:</h4>
                            <Form.Control as='textarea' rows={8} value={cardio} onChange={handleCardioChange} placeholder='Enter cardio...' />
                        </Form.Label>
                    </Form.Group>
                    <div>
                        <Button variant='primary' size='sm'>Submit Cardio</Button>
                    </div>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-2">
                        <Form.Label>
                            <h4>Strength Training:</h4>
                            <Form.Control as='textarea' rows={8} value={strengthTraining} onChange={handleStrengthTrainingChange} placeholder='Enter Strength Training...' />
                        </Form.Label>
                    </Form.Group>
                    <div>
                        <Button variant='primary' size='sm'>Submit Strength</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FitnessLogPage;
