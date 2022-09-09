import axios from 'axios';

const url = '/api/persons';

function getAll() {
  return axios.get(url);
}

function create(newPerson) {
  return axios.post(url, newPerson);
}

function update(id, newPerson) {
  return axios.put(`${url}/${id}`, newPerson);
}

function deletePerson(id) {
  return axios.delete(`${url}/${id}`);
}

export default {
  getAll,
  create,
  update,
  deletePerson,
};
