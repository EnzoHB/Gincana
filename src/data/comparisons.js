import { writable } from 'svelte/store';
const data = [
	  	{
            name: 'Lacre',
            price: 100,
            amount: 20,
            points: 3400,
        },
        {
            name: 'Arroz',
            price: 17,
            amount: 5,
            points: 75,
        },
        {
            name: 'Feijão',
            price: 6,
            amount: 1,
            points: 15,
        },
        {
            name:'Leite',
            price: 7,
            amount: 1,
            points: 10,
        },
        {
            name: 'Óleo',
            price: 8,
            amount: 1,
            points: 10,
        },
        {
            name: 'Macarrão',
            price: 8,
            amount: 2,
            points: 10,
        },
		{
			name: 'Brinquedos',
            price: 10,
            amount: 1,
            points: 10,
		}
];

export const comparisons = writable(data);