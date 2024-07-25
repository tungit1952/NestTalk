export function emailToUsername(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    throw new Error('Invalid email format');
  }
  return email.substring(0, atIndex);
}