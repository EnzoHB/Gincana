<script>

    import { database } from '../data.js'

    let expenses;
    let donators;

    database.subscribe(data => {
        expenses = data.expenses;
        donators = data.donators;
    });

    let over = donators.filter(member => member.donation > 20).sort((a, b) => b.donation - a.donation)
    let total = over.reduce((acc, member) => acc += member.donation - 20, 0);
    
    function pricify(x) {
        return x.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
    };

</script>


<div>
<h1>Overdebt</h1>
<p> Doações extras que precisam ser retornadas</p>
<p> Total: { pricify(total) }</p>
<table>
    <tr>
        <th>Nome</th>
		<th>Doação</th>
		<th>Cashback</th>
	</tr>
    {#each over as { name, donation }}
        <tr>
            <td>{name}</td>
            <td>{pricify(donation)}</td>
            <td>{pricify(donation - 20)}</td>
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