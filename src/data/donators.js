import { writable } from "svelte/store";
const data = [
    { name: 'MARIA NÍVEA 6° ANO', donation: 0 },
    { name: 'MATHEUS 6° ANO', donation: 15 },
    { name: 'MIGUEL 6° ANO', donation: 0 },
    { name: 'RAFAEL 6º ANO', donation: 0 },
    { name: 'VALENTINA 6° ANO', donation: 0 },
    { name: 'ISABELLE 6° ANO', donation: 20 },
    { name: 'AGATHA 7° ANO', donation: 20 },
    { name: 'BETHINA 7º ANO', donation: 20 },
    { name: 'ENZO 7° ANO', donation: 20 },
    { name: 'FELIPE 7º ANO', donation: 20 },
    { name: 'GABRIELLA 7° ANO', donation: 20 },
    { name: 'JOÃO MATEUS 7° ANO', donation: 30 },
    { name: 'WARLLEY 7° ANO', donation: 20 },
    { name: 'LUCAS 8º ANO', donation: 20 },
    { name: 'LUÍS FELIPE 8º ANO', donation: 20 },
    { name: 'LUIZA 8° ANO', donation: 0 },
    { name: 'MARIA CLARA 8° ANO', donation: 20 },
    { name: 'MARIA FERNANDA 8° ANO', donation: 110 },
    { name: 'MARIANA 8° ANO', donation: 20 },
    { name: 'MATHEUS 8° ANO', donation: 20 },
    { name: 'THÉO 8° ANO', donation: 20 },
    { name: 'ANGELINA 9° ANO', donation: 20 },
    { name: 'DANITCHELE 9° ANO', donation: 20 },
    { name: 'EDUARDO 9° ANO', donation: 20 },
    { name: 'GIOVANNA 9° ANO', donation: 20 },
    { name: 'GUILHERME 9º ANO', donation: 20 },
    { name: 'ENZO 1° MÉDIO', donation: 110 },
    { name: 'MATHEUS 1° MÉDIO', donation: 50 }
]

export const donators = writable(data);