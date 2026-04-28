import { Schema } from 'mongoose';

export const AboutSchema = new Schema({
  description: {
    type: String,
    default: '',
  },
});
