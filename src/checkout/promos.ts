export interface Promo {
  code: string;
  percentOff: number;
}

/** Active promotions, as exported by the catalog (keyed by code). */
const CATALOG = '{"LAUNCH10":{"percentOff":10},"FRIEND20":{"percentOff":20}}';

const PROMOS: Promo[] = Object.entries(
  JSON.parse(CATALOG) as Record<string, { percentOff: number }>,
).map(([code, { percentOff }]) => ({ code, percentOff }));

/** Looks a promo code up, case-insensitively. */
export function findPromo(input: string): Promo | null {
  const code = input.trim().toUpperCase();
  return PROMOS.find((p) => p.code === code) ?? null;
}
