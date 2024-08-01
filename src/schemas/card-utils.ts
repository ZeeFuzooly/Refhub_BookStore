export const cardNumberRegex = /^(?:\d{4} ?){4,4}\d{4}$/;
export const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

export const validateCardNumber = (number: string) => {
  const sanitizedNumber = number.replace(/\s+/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedNumber.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export const validateExpirationDate = (date: string) => {
  const [month, year] = date.split("/").map(Number);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  return (
    month >= 1 &&
    month <= 12 &&
    (year > currentYear || (year === currentYear && month >= currentMonth))
  );
};
