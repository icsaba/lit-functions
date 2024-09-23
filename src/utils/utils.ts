export function toDashedString(str: string) {
  // Replace spaces, underscores, and camel case with dashes
  return str
    .replace(/\s+/g, '-')           // Replace spaces with dashes
    .replace(/_/g, '-')             // Replace underscores with dashes
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert dashes for camel case
    .toLowerCase();                 // Convert to lowercase
}