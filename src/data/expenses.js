import { writable } from 'svelte/store';
const data = [
    { 
        store: 'Requetelo',
        item: 'Bandeira',
        price: 100,
        amount: 1,
    },
    { 
        store: 'Santa Helena',
        item: 'Cano PVC',
        price: 12,
        amount: 1,
    },
    {
        store: 'Usadão Bady',
        item: 'Garrafas Pets',
        price: 0.3,
        amount: 80,
    },
    {
        store: 'Centro de Reciclagem',
        item: 'Lacres',
        price: 5,
        amount: 30
    },
    {
        store: 'Tema Print',
        item: 'Posters',
        price: 23,
        amount: 2
    },
    {
        store: 'Papelaria Central',
        item: 'Bilhetes',
        price: 18,
        amount: 1
    },
    {
        store: 'São Luís',
        item: 'Decorações',
        price: 10,
        amount: 1
    },
    {
        store: 'Tema Print',
        item: 'Emblema',
        price: 30,
        amount: 1
    },
    {
        store: 'Conveniência',
        item: 'Saco de lixo',
        price: 3.75,
        amount: 1
    },
    {
        store: 'Ebisu',
        item: 'Fita isolante',
        price: 10,
        amount: 2
    },
    {
        store: 'Cacau Show',
        item: 'Cesta da Rifa',
        price: 60,
        amount: 1
    },
];

export const expenses = writable(data);