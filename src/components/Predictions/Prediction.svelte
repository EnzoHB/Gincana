<script>

    import { ongoing } from '../../data/ongoing.js';
    import Button from './Button.svelte';
    import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    
    let canvas;
    let chartData = writable({
        type: 'line',
        data: {
            datasets: [{
                data: [{x: 10, y: 20}, {x: 15, y: null}, {x: 20, y: 10}]
            }]
        }
    });

    onMount(() => {

        let ctx = canvas.getContext('2d');

        chartData.subscribe(data => {
            new Chart(ctx, data)
        })

        console.log(chart)

    })

</script>

<div>
    <h1>Predictions</h1>
    <canvas bind:this={canvas}></canvas>
    <div id='button-container'>
        <Button id='1'></Button>
        <Button id='2'></Button>
        <Button id='3'></Button>
        <Button id='4'></Button>
    </div>

    <br>
    <br>
</div>

<style>
    #button-container {
        display: flex;
        gap: 10px;
    }
</style>