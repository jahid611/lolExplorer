export function formatGold(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}