import app from './App';

const port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`http://localhost:${port}/api`);
});