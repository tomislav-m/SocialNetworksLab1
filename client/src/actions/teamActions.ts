const searchTeamsUrl = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';

export function searchTeams(teamName: string) {
  return fetch(searchTeamsUrl + teamName)
    .then(res => {
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