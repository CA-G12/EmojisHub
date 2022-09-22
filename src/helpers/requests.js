import axios from 'axios';

export function getAll() {
  const promise = axios.get('https://emojihub.herokuapp.com/api/all');
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

export function getRandomInCategory(category) {
  const promise = axios.get(
    `https://emojihub.herokuapp.com/api/random/category_${category}`
  );
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

export function getRandomInGroup(group) {
  const promise = axios.get(
    `https://emojihub.herokuapp.com/api/random/group_${group}`
  );
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
export function getAllInCategory(category) {
  const promise = axios.get(
    `https://emojihub.herokuapp.com/api/all/category_${category}`
  );
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

export function getAllInGroup(group) {
  const promise = axios.get(
    `https://emojihub.herokuapp.com/api/all/group_${group}`
  );
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
