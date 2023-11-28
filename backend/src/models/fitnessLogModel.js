import mongoose from 'mongoose';

const fitnessLogSchema = new mongoose.Schema({
  cardioData: String,
  strengthTrainingData: String,
});

export default mongoose.model('FitnessLog', fitnessLogSchema, 'FitnessLogs');
