import app from './App';
//import mongoose from 'mongoose';

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`http://localhost:3000/api`);
});