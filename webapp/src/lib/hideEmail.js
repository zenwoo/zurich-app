export default function hideEmail(email) {
  const [user, domain] = email.split('@');
  const randomLength = Math.floor(user.length - 2);

  return `${user.slice(0, 2)}${'*'.repeat(randomLength)}@${domain}`;
}
