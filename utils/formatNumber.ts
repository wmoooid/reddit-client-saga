export function formatNumber(number: number) {
  const formatNumber = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number);
  return formatNumber;
}
