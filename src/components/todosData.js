import { v4 as uuidv4 } from 'uuid';

export const todosData = [
    {
        id: uuidv4(),
        text: 'cook dinner',
        completed: false
    },
    {
        id: uuidv4(),
        text: 'buy some milk',
        completed: true
    },
    {
        id: uuidv4(),
        text: 'walk with the dog',
        completed: false
    },
    {
        id: uuidv4(),
        text: 'do sports',
        completed: true
    },
    {
        id: uuidv4(),
        text: 'clean house',
        completed: false
    },
];
