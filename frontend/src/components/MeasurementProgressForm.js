import { useState } from 'react';
import { Button, Form, FormLabel, FormControl } from 'react-bootstrap';

const MeasurementProgressForm = ({ onClose, onUpdateMeasurements }) => {

    const [measurements, setMeasurements ] = useState({
        currentThigh: '',
        currentBicep: '',
        currentChest: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMeasurements((prevMeasurements) => ({
            ...prevMeasurements,
            [name]: value,
        }));
    };

    const handleUpdateMeasurements = (e) => {
        e.preventDefault();
        onUpdateMeasurements(measurements);
        onClose();
    };
return (
    <div>
        <h4>Update Measurements: </h4>
        <Form>
        <FormLabel>Current Thigh: <FormControl type="text" name="currentThigh" value={measurements.currentThigh}
                onChange={handleInputChange} /></FormLabel><br />
        <FormLabel>Current Bicep: <FormControl type="text" name="currentBicep" value={measurements.currentBicep}
            onChange={handleInputChange} /></FormLabel><br />
        <FormLabel>Current Chest: <FormControl type="text" name="currentChest" value={measurements.currentChest}
            onChange={handleInputChange} /></FormLabel><br />

        <Button variant='primary' size='sm' onClick={handleUpdateMeasurements}> Update Measurements</Button>
        <Button variant='primary' size='sm' onClick={onClose}>Cancel</Button>
        </Form>
    </div>
    );
};
export default MeasurementProgressForm;
