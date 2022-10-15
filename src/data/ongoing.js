import { writable } from "svelte/store";
const data = {
    yellow: {
        score: [ 3040, 50, 330, 50],
        donations: [
            ['Lacre', 10 ],
            ['Brinquedos', 3 ],
            ['Macarrão', 18 ],
            ['Leite', 2 ],
            ['Óleo', 2 ],
            ['Feijão', 3 ],
        ]
    },
    blue: {
        score: [ 2560, 200, 190, 50],
        donations: [
            ['Lacre', 7 ],
            ['Arroz', 20 ],
            ['Brinquedos', 4 ],
            ['Macarrão', 5 ],
            ['Feijão', 2 ],  
        ],
    },
    red: {
        score: [ 3345, 50, 350, 200],
        donations: [
            ['Lacre', 54 ],
            ['Arroz', 5 ],
            ['Brinquedos', 2 ],
            ['Macarrão', 14 ],
            ['Feijão', 3 ],
        ],
    },
    green: {
        score: [ 2165, 100, 200, 100 ],
        donations: [
            ['Lacre', 64 ],
            ['Arroz', 95 ],
            ['Brinquedos', 10 ],
            ['Macarrão', 10 ],
            ['Leite', 6 ],
            ['Óleo', 3 ],
            ['Feijão', 4 ],
        ]
    }
};

export const ongoing = writable(data);