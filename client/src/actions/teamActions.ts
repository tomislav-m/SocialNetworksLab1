const searchTeamsUrl = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
const teamDetailsUrl = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=';
const nextMatchDetailsUrl = 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=';
const lastMatchDetailsUrl = 'https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=';

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

export function getTeamDetails(teamId: string) {
  return fetch(teamDetailsUrl + teamId)
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

export function getNextMatch(teamId: string) {
  return fetch(nextMatchDetailsUrl + teamId)
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

export function getLastMatch(teamId: string) {
  return fetch(lastMatchDetailsUrl + teamId)
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