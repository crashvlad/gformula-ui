export function getInitials(fullName: string) {
  const words = fullName.split(' ');

  const initials = words.map((word) => word[0]);

  const initialsString = initials.join('').toUpperCase();
  return initialsString;
}
