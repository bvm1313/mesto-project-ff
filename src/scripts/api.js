const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '5f701eab-3b50-4232-bdc5-556b4053c9c7',
    'Content-Type': 'application/json'
  }
};

const BASEURL = 'https://nomoreparties.co/v1/wff-cohort-29';
const handleResponse = (res) => { 
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInfoUser = () => {
  return fetch(BASEURL + '/users/me', {
    headers: config.headers
  })
  .then(handleResponse)
};

export const getAllCards = () => {
  return fetch(BASEURL + '/cards', {
    headers: config.headers
  })
  .then(handleResponse);
};

export const patchEditProfile = (name, about) => {
  return fetch(BASEURL + '/users/me', {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(handleResponse);
};

export const patchAvatarUpdate = (avatar) => {
  return fetch(BASEURL + '/users/me/avatar', {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(handleResponse)
};

export const postNewCard = (name, link) => {
  return fetch(BASEURL + '/cards',  {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
      }),
    })
    .then(handleResponse);
};

export const pushLike = (cardId) => {
  return fetch(BASEURL + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

export const deletLike = (cardId) => {
  return fetch(BASEURL + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};  

export const deleteCardId = (cardId) => {
  return fetch(BASEURL +`/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    })
  .then(handleResponse);
};
  