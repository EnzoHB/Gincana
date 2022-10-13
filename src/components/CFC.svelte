<script>

    let donatorsTable;
    let expensesTable;

    import { donators } from '../data/donators.js';
    import { expenses } from '../data/expenses.js';

    donators.subscribe(data => {
        donatorsTable = [...data];
    })

    expenses.subscribe(data => {
        expensesTable = [...data];
    });

    donatorsTable.sort((b, a) => a.donation - b.donation);

    let revenue = donatorsTable.reduce((acc, donator) => acc += donator.donation, 0);
    let debt = expensesTable.reduce((acc, purchase) => acc += purchase.price * purchase.amount, 0);

    let used = debt / donatorsTable.length; 

	function pricify(x) {
        return x.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
    };

</script>

<div>
    <h1>Controle de Fundos </h1>
    <p>Arrecadações: { pricify(revenue) }</p>
    <p>Despesas: { pricify(debt) }</p>
    <table>
        <tr>
            <th>Nome</th>
            <th>Doação</th>
            <th>Cashback</th>
        </tr>
        {#each donatorsTable as { name, donation }}
            <tr>
                <td>{name}</td>
                <td>{pricify(donation)}</td>
                <td>{pricify(donation - used)}</td>
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