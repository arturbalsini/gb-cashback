export function StringToNumber(value: string): number {
  const num = parseInt(value.replace(/\D/g, ""), 10);
  return num / 100;
}

export function NumbertoLocaleString(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
