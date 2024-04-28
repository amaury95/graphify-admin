export function formatResource(id: string) {
  const [resource, key] = id.split("/");
  return `${resource} ${key}`;
}
