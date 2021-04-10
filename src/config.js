require('dotenv').config();

const oportunities = parseInt(process.env.REACT_APP_OPORTUNITIES) || 3;
const totalCards = parseInt(process.env.REACT_APP_TOTAL_CARDS) || 15;
const gifts = process.env.REACT_APP_GIFT ? process.env.REACT_APP_GIFT.split(',') : [];
const name = process.env.REACT_APP_NAME;
const penalty = [
    'poo',
    'sad-tear',
    'sad-cry',
    'bomb',
    'poo',
    'sad-tear',
    'sad-cry',
    'poo',
    'poo',
    'poo',
]

export default {
    oportunities,
    name,
    gifts,
    totalCards,
    penalty
}