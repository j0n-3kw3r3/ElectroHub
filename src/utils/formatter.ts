export function formatCurrency(value) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);
}

export function formatToCustomDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

