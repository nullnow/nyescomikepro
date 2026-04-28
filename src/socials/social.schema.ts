import { Schema } from 'mongoose';

export const SocialSchema = new Schema({
  platform: String,
  link: String,
});
