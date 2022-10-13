<script>

    import { database } from '../data.js';

    let donators;
    let revenueTable;
    let expensesTable;

    import { donators } from '../data/donators.js';
    import { expenses } from '../data/expenses.js';

    donators.subscribe(data => {
        donators
    })

    database.subscribe(value => {
        donators = value.donators
        revenueTable = value.donators;
        expensesTable = value.expenses;
    });

    let options =  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };

    $: revenueTable.sort((a, b) => b.donation - a.donation);

    let overdebt = donators.filter(member => member.donation > 20).reduce((acc, member) => acc += member.donation - 20, 0);

    let revenue = revenueTable.reduce((acc, item) => acc += item.donation, 0 )
    let expenses = expensesTable.reduce((acc, item) => acc += item.price * item.amount, 0);

    expenses += overdebt;

    let used = expenses / revenueTable.length; 

	function pricify(x) {
        return x.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
    };
</script>

<div>
    <h1>Controle de Fundos </h1>
    <p>Arrecadações: {revenue.toLocaleString('pt-br', options)}</p>
    <p>Despesas: {expenses.toLocaleString('pt-br', options)}</p>
    <table>
        <tr>
            <th>Nome</th>
            <th>Doação</th>
            <th>Parcela</th>
            <th>Cashback</th>
        </tr>
        {#each revenueTable as { name, donation }}
            <tr>
                <td>{name}</td>
                <td>{donation.toLocaleString('pt-br', options)}</td>
                <td>{(donation * 100 / revenue).toFixed(2) }%</td>
                <td>{(donation - used).toLocaleString('pt-br', options)}</td>
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