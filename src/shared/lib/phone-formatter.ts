export function formatTjPhone(input: string) {
  let digits = input.replace(/\D/g, "");

  if (!digits.startsWith("992")) {
    digits = "992" + digits;
  }

  digits = digits.slice(0, 12);

  let formatted = "+";

  for (let i = 0; i < digits.length; i++) {
    if (i === 3) formatted += " "; 
    if (i === 5) formatted += " "; 
    if (i === 8) formatted += " "; 
    formatted += digits[i];
  }

  return formatted;
}

export function cleanPhone(phone: string) {
  return phone.replace(/\D/g, "");
}
