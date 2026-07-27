export function formatPrice(value) {
    return 'Rs ' + Number(value).toLocaleString('en-PK');
}

export function formatRating(value) {
    return Number(value).toFixed(1);
}