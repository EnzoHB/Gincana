<script>

    export let id;

    import { radio } from './radio.js';
    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher()
    let selected;
    
    radio.add(id, selection => {

        if (selection == id)
            return selected = true;
            return selected = false;
    })

    // ----------------- Events -------------------- //

    function click(event) {
        radio.set(id);
        dispatch('selected', { id })
    };

</script>

<div class='button' class:selected on:click={click}>
    Dia {id}
</div>

<style>
    .button {
        width: fit-content;
        height: fit-content;
        padding: 5px 10px;
        background-color: rgb(0, 0, 139);
        color: white;
        border-radius: 5px;
        user-select: none;
    }

    .selected {
        background-color: green;
    }
</style>

