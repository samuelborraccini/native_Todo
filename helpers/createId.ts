export function generateRandomKey() {
  const randomNumber = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  return `task-${randomNumber}`;
}

export function generateRandomId() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
