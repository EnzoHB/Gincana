<script>

    import { bottles } from '../data/bottles.js';
    import Population from '../util/Population.js'

    let table;
    let dynamic;

    bottles.subscribe(data => {
        table = dynamic = data
    });

    let heights = new Population(...table.map(bottle => Number(bottle.height)));

    // ------------------------------------------------------------- //

    const bottleHeight = 34.34;
    const bottleRadius = 10.4 / 2;
    const cylinderHeight = 22.5;

    let totalVolume = cokeBottleVolume() * heights.length;
    let usedVolume = heights.map(cokeSampleVolume).reduce((a, b) => a + b);

    function cokeSampleVolume(height) {
        return calculateCylinderVolume(bottleRadius, height)
    };

    function cokeBottleVolume() {
        let cylinder = calculateCylinderVolume(bottleRadius, cylinderHeight)
        let cone = calculateConeVolume(bottleRadius, bottleHeight - cylinderHeight);

        return cylinder + cone;
    };

    function calculateCylinderVolume(radius, height) {
        return Math.PI * radius ** 2 * height;
    };

    function calculateConeVolume(radius, height) {
        return calculateCylinderVolume(radius, height) / 3;
    };

    function litrify(n) {
        return (Number(n) / 1000).toFixed(1);
    };  

</script>


<div>
<h1>Garrafas</h1>
<p> Todas as garrafas contabilizadas e lotificadas</p>
<h2>Dimensões</h2>
<ul>
    <li>Raio: { bottleRadius } cm </li>
    <li>Altura: { bottleHeight } cm</li>
    <li>Cilindro: { cylinderHeight } cm</li>
    <li>Volume: { litrify(cokeBottleVolume()) } L</li>
</ul>
<h2>Informações do Conjunto</h2>
<ul>
    <li>Média: { heights.mean.toFixed(2) } cm</li>
    <li>Mediana: { heights.median.toFixed(2) } cm </li>
    <li>Desvio Médio: { heights.avarageAbsoluteDeviation.toFixed(2) }</li>
    <li>Desvio Padrão: { heights.standardDeviation.toFixed(2) }</li>
</ul>
<h2>Informações dos Lacres</h2>
<ul>
    <li>Total de Garrafas: { heights.length } units ( {litrify(totalVolume)} L ) </li>
    <li>Volume Ocupado: { litrify(usedVolume) } L</li>
    <li>Garrafas Equivalentes: { (usedVolume / 2000 /** cokeBottleVolume() */).toFixed(1) } units
    </li>
</ul>
<table>
    <tr>
        <th>ID</th>
        <th>Code</th>
		<th>Altura</th>
		<th>Caixa</th>
	</tr>
    {#each dynamic as { id, height, box }}
        <tr>
            <td>{id}</td>
            <td>{(height * 10).toString(16)}</td>
            <td>{height} cm</td>
            <td>{box}</td>
        </tr>
    {/each}
</table>
</div>

<style>
	table {
		border: 1px solid black;	
		border-collapse: collapse;
	}
	
	th {
		border: 1px solid black;
		padding: 10px;
	}
	
	td {
		border: 1px solid black;
		padding: 10px;
	}
</style>