const url = 'http://localhost:8000/api/users';

export function getUser(userId: string) {
  return fetch(`${url}/${userId}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return null;
    });
}

export function updateUser(user: any) {
  return fetch(`${url}/${user.userId}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}