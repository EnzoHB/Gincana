<script>

    // Crowd Funding control
    let data = [
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
            amount: 40
        },
    ];

    let table = data;
    let total = table.reduce((acc, item) => acc += item.price * item.amount, 0);

</script>


<div>
<h1> Gastos </h1>
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