<script>
	let data = [
    {
        name: 'Arroz',
        price: 17,
        amount: 5,
        points: 75,
    },
    {
        name: 'Feijão',
        price: 6,
        amount: 1,
        points: 15,
    },
    {
        name:'Leite',
        price: 7,
        amount: 1,
        points: 10,
    },
    {
        name: 'Óleo',
        price: 8,
        amount: 1,
        points: 10,
    },
    {
        name: 'Macarrão',
        price: 8,
        amount: 2,
        points: 10,
    },
    {
        name: 'Lacre',
        price: 100,
        amount: 20,
        points: 3400,
    }
];
	
let table = data;
	
let type = 'default';
let value = 0;
	
function handleInput() {
	if (type == 'default')
			return table = data;
	
	if (value == 0 || value == null)
			return table = data;
	
	table = queryData(type, value);
};
	
// --------------------------------------------- //
	
function queryData(type, value) {
    const queryTable = {
        'price': adjustPrice,
        'amount': adjustAmount,
        'points': adjustPoints
    };

    return data.map(item => queryTable[type](item, value));
};
	
function adjustPrice(item, price) {
    let { name }  = item;

    let amount = proportion(item.price, item.amount)(price).toFixed(0);
    let points = proportion(item.price, item.points)(price).toFixed(0);

    return { name, price, amount, points };
};

function adjustAmount(item, amount) {
    let { name }  = item;

    let price = proportion(item.amount, item.price)(amount).toFixed(0);
    let points = proportion(item.amount, item.points)(amount).toFixed(0);

    return { name, price, amount, points };
};

function adjustPoints(item, points) {
    let { name }  = item;

    let price = proportion(item.points, item.price)(points).toFixed(0);
    let amount = proportion(item.points, item.amount)(points).toFixed(0);

    return { name, price, amount, points };
};

function proportion(it, equals) {
    return that => that * equals / it;
};
	
</script>

<h1>Visualizar Informaçõeses</h1>
<select bind:value={type} on:change={handleInput}>
	<option value=default>Padrão</option>
	<option value=price>Preço</option>
	<option value=amount>Quantidade</option>
	<option value=points>Pontos</option>
</select>
<input type=number bind:value={value} on:input={handleInput}>

<table>
	<tr>
		<th>Nome</th>
		<th>Preço</th>
		<th>Quantidade </th>
		<th>Pontos</th>
	</tr>
	{#each table as { name, price, amount, points }}
		<tr>
			<td>{name}</td>
			<td>R${price},00</td>
			<td>{amount}</td>
			<td>{points}</td>
		</tr>
	{/each}
</table>

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