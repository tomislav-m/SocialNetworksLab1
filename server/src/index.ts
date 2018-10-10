import app from './App';

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`http://localhost:3000/api`);
});