export function pricify(x) {
    return x.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
};