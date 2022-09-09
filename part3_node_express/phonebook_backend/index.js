import express from 'express';
import { nanoid } from 'nanoid';

const app = express();
const port = 3001;

let personsData = 
  [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const infoPage = `<div></div>`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<div>Please go to /api/persons/</div>')
})

app.get('/api/persons', (req, res) => {
  res.json(personsData);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const foundPerson = personsData.find(person => person.id === id);
  if (foundPerson) {
    res.status(200).json(foundPerson);
  } else {
    res.status(404).json({error: `ID ${id} not found`});
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const personToDelete = personsData.find(person => person.id === id);
  if (personToDelete) {
    let newPersons = personsData.filter(person => person.id !== id);
    personsData = newPersons;
    res.status(204).json(personToDelete);
  } else {
    res.status(404).json({error: `Nothing with id ${id} exists`})
  }
})

app.post('/api/persons/', (req, res) => {
  let newPerson = {
    name: req.body.name,
    number: req.body.number,
    id: nanoid(),
  }
  personsData = personsData.concat(newPerson);
  res.status(201).json(newPerson);
})

app.get('/info', (req, res) => {
  const todaysDate = new Date();
  res.send(`<div><p>Phonebook has info for ${personsData.length} people.</p><p>${todaysDate}</p></div>`);
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
