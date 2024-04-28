export function validArray(arr: any): boolean {
    return Array.isArray(arr);
}

export function validObject(obj: any): boolean {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}