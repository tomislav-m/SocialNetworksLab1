import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  teamLogoUrl: String,
  country: String,
  league: String,
  website: String,
  facebookLink: String,
  twitterLink: String,
  _id: {
    type: String,
    required: true
  }
}, { _id: false });