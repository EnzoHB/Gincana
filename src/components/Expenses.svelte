<script>

    import { database } from '../data.js'
    
    // Crowd Funding control

    let data;
    let table;

    database.subscribe(value => data = table = value.expenses);

    let total = table.reduce((acc, item) => acc += item.price * item.amount, 0);

</script>


<div>
<h1> Gastos </h1>
<p>Recibo de todos os gastos ( Não necessariamente realizados )</p>
<p>Total: {total.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</p>
<table>
	<tr>
        <th>Item</th>
		<th>Preço</th>
		<th>Quantidade</th>
        <th>Total</th>
	</tr>
	{#each table as { store, item,  price, amount }}
		<tr>
			<td>{item}</td>
			<td>{price.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</td>
			<td>{amount}</td>
            <td>R${price * amount},00</td>
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