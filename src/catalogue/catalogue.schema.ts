import { Schema } from 'mongoose';

export const CatalogueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['Instrumental', 'Song'],
    },

    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
