export function getLocalDate(date?: string): string {
  let targetDate: Date;

  if (date) {
    const [year, month, day] = date.split("-");
    targetDate = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    targetDate = new Date();
  }

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDate(date: string): string {
    if (!date) return "Fecha no disponible";

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}