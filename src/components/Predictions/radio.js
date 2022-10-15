import { writable } from "svelte/store";

let radio = writable(null);
let ids = new Map;

radio.add = (id, callback) => {

    if (ids.has(id))
        throw new Error(`Id: ${id} already contained`);

    let button = ids.set(id, {  }).get(id); // Safe map get;
    let unsubscribe = radio.subscribe(callback);

    if (button?.subscribe) 
        button.unsubscribe();

    button.id = id;
    button.callback = callback;
    button.unsubscribe = unsubscribe;

    return button;
};

radio.rem = id => {
    let button = ids.get(id)

    if (button)
        button.unsubscribe();
};

export { radio };