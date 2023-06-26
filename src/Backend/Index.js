const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())

let persons =[
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

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/info', (request, response) => {
    const date = new Date().toUTCString()
    response.send(`<p>Phonebook has ${persons.length}</p>
                    <p>${date}</p>`)
})
// Get all
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
// Get one
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    if (person) {
        response.json(person)
    } else {
        return response.status(404).json({
            error: "Missing"
        })
    }
})
// Delete
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

// Add
app.post('/api/persons/', (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'Missing number or name'
        })
    }
    // Loop through
    persons.forEach(person => {
        if(person.name.includes(body.name)){
            return response.status(400).json({
                error: `${body.name} already exists`
            })
        }
    })
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    console.log(person)
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})