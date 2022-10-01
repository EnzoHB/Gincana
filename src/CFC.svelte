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

    let data2 = [
        {
            name: 'Enzo',
            donation: 20,
        },
        {
            name: 'Maria Fernanda',
            donation: 50
        },
        {
            name: 'Mariana',
            donation: 20,
        },
    ];

    let options =  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };

    let revenue = data2.reduce((acc, item) => acc += item.donation, 0 )
    let expenses = data.reduce((acc, item) => acc += item.price * item.amount, 0);

    let remaining = revenue - expenses;

    console.log({revenue, expenses, remaining})

    // Total Arrecadado
    // Total usado 
    
    // Nome
    // Doação
    // Parcela
    // Cashback


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
        {#each data2 as { name, donation }}
            <tr>
                <td>{name}</td>
                <td>{donation}</td>
                <td>{(donation * 100 / revenue).toFixed(2) }%</td>
                <td>{(donation / revenue * remaining).toLocaleString('pt-br', options)}</td>
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