import { readable } from "svelte/store";

const data = {
    comparisons: [
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
            name: 'Lacre',
            price: 150,
            amount: 20,
            points: 3400,
        }
    ],
    expenses: [
        { 
            store: 'Requetelo',
            item: 'Bandeira',
            price: 100,
            amount: 1,
        },
        { 
            store: 'Santa Helena',
            item: 'Cano PVC',
            price: 10,
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
    ],
    donators: [
        { name: 'MARIA NÍVEA 6° ANO', donation: 0 },
        { name: 'MATHEUS 6° ANO', donation: 0 },
        { name: 'MIGUEL 6° ANO', donation: 0 },
        { name: 'RAFAEL 6º ANO', donation: 0 },
        { name: 'VALENTINA 6° ANO', donation: 0 },
        { name: 'ISABELLE 6° ANO', donation: 0 },
        { name: 'AGATHA 7° ANO', donation: 0 },
        { name: 'BETHINA 7º ANO', donation: 0 },
        { name: 'ENZO 7° ANO', donation: 20 },
        { name: 'FELIPE 7º ANO', donation: 0 },
        { name: 'GABRIELLA 7° ANO', donation: 0 },
        { name: 'JOÃO MATEUS 7° ANO', donation: 30 },
        { name: 'WARLLEY 7° ANO', donation: 0 },
        { name: 'LUCAS 8º ANO', donation: 0 },
        { name: 'LUÍS FELIPE 8º ANO', donation: 0 },
        { name: 'LUIZA 8° ANO', donation: 0 },
        { name: 'MARIA CLARA 8° ANO', donation: 20 },
        { name: 'MARIA FERNANDA 8° ANO', donation: 50 },
        { name: 'MARIANA 8° ANO', donation: 20 },
        { name: 'MATHEUS 8° ANO', donation: 0 },
        { name: 'THÉO 8° ANO', donation: 0 },
        { name: 'ANGELINA 9° ANO', donation: 0 },
        { name: 'DANITCHELE 9° ANO', donation: 20 },
        { name: 'EDUARDO 9° ANO', donation: 0 },
        { name: 'GIOVANNA 9° ANO', donation: 0 },
        { name: 'GUILHERME 9º ANO', donation: 0 },
        { name: 'ENZO 1° MÉDIO', donation: 80 },
        { name: 'MATHEUS 1° MÉDIO', donation: 0 }
    ]
};

export const database = readable(data);