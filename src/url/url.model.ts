import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
  original: { type: String, required: true },
  shortened: { type: String, required: true },
});

export interface Response {
  original: string;
  shortened: string;
}
