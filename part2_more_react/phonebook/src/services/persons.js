import axios from 'axios';

const url = 'https://localhost:3001/persons';

function getAll() {
  return axios.get(url);
}

function create(newPerson) {
  return axios.post(url, newPerson);
}

function update(id, newPerson) {
  return axios.put(`${url}/${id}`, newPerson);
}

export default { getAll, create, update };
