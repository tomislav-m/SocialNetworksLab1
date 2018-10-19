import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pictureUrl: {
    type: String,
    required: true
  },
  favoriteTeams: {
    type: [String],
    required: true
  },
  _id: {
    type: String,
    required: true
  }
}, { _id: false });