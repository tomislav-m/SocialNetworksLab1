const apiKey = 'BUfJt7rnilkTxyeZ90xXDwhgx1JEzcwY';

const mapUrl = (query: string, country: string) => {
  const str = query + ' ' + country;
  return `https://api.tomtom.com/search/2/search/${str}.json?key=${apiKey}`;
};

export function getLocation(location: string, team: string) {
  const url = mapUrl(location, team);
  return fetch(url).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error();
  })
    .then(data => {
      return data;
    })
    .catch(err => {
      return null;
    });
}