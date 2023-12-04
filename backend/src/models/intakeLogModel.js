import mongoose from 'mongoose';

const intakeLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  foodIntake: { type: String, required: true },
  carbohydrates: { type: Number, required: true },
  protein: { type: Number, required: true },
  fats: { type: Number, required: true },
  water: { type: Number, required: true },
});

const IntakeLog = mongoose.model('IntakeLog', intakeLogSchema);

export default IntakeLog;
