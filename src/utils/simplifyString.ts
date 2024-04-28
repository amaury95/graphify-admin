export function simplifyString(input: string): string {
  const index = input.indexOf("_");
  if (index !== -1) {
    return input.substring(index + 1).toLowerCase();
  } else {
    return input.toLowerCase();
  }
}

export function camelCaseToNormal(text: string): string {
  return text
    .replace(/^_+/, "") // Remove prefix `_`
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}
