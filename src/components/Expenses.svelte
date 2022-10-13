<script>

	import { pricify } from '../util/pricify.js';
    import { expenses } from '../data/expenses.js';

	let table;

	$: total = table.reduce((acc, purchase) => acc += 
		purchase.price * 
		purchase.amount, 0
	);

	expenses.subscribe(data => {
		table = data;
	});

</script>


<div>
<h1>Gastos</h1>
<p>Recibo de todos os gastos</p>
<p>Total: { pricify(total) }</p>
<table>
	<tr>
        <th>Item</th>
		<th>Preço</th>
		<th>Quantidade</th>
        <th>Total</th>
	</tr>
	{#each table as { item, price, amount }}
		<tr>
			<td>{item}</td>
			<td>{ pricify(price) }</td>
			<td>{amount}</td>
            <td>{ pricify(price * amount) }</td>
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