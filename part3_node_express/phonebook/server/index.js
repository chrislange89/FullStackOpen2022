import express from 'express';
import { nanoid } from 'nanoid';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

let personsData = 
  [
    { 
      "id": '1',
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": '2',
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": '3',
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": '4',
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const infoPage = `<div></div>`;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

morgan.token('body', (req, res) => {return req.body === null || req.body === '' || req.body === undefined ? '' : JSON.stringify(req.body)});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

app.get('/', (req, res) => {
  res.sendFile('./build/static/index.html');
})

app.get('/api/persons', (req, res) => {
  res.json(personsData);
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const foundPerson = personsData.find(person => person.id === id);
  if (foundPerson) {
    res.status(200).json(foundPerson);
  } else {
    res.status(404).json({error: `ID ${id} not found`});
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const personToDelete = personsData.find(person => person.id === id);
  if (personToDelete) {
    let newPersons = personsData.filter(person => person.id !== id);
    personsData = newPersons;
    res.status(204).json(personToDelete);
  } else {
    res.status(404).json({error: `Nothing with id ${id} exists`})
  }
})

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const newNumber = req.body.number;
  const existingPerson = personsData.find(person => person.id === id);
  if (existingPerson) {
    let updatedPerson = { ...existingPerson, number: newNumber };
    personsData = personsData.map((person) => person.id !== id ? person : updatedPerson);
    res.status(200).json(updatedPerson);
  } else {
    res.status(404).json({error: 'person does not exist'})
  }
})

app.post('/api/persons/', (req, res) => {
  let newName = req.body.name;
  let newNumber = req.body.number;
  let existingPerson = personsData.find(person => person.name === newName);

  // person already exists
  if (existingPerson) {
    res.status(403).json({error: 'this person already exists'});
    return;
  }

  // no name field included in the request body
  if (newName === '' || newName === undefined || newName === null) {
    res.status(400).json({error: 'you must include a name'});
    return;
  }

  // no number field included in the request body
  if (newNumber === '' || newNumber === undefined || newNumber === null) {
    res.status(400).json({error: 'you must include a number'});
    return;
  }

  let newPerson = {
    name: newName,
    number: newNumber,
    id: nanoid(),
  }
  personsData = personsData.concat(newPerson);
  res.status(201).json(newPerson);
})

app.get('/info', (req, res) => {
  const todaysDate = new Date();
  res.send(`<div><p>Phonebook has info for ${personsData.length} people.</p><p>${todaysDate}</p></div>`);
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
