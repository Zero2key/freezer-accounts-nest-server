export function swaggerStringify(json: any): string {
  return JSON.stringify(json, null, 2).replace(/\s/g, match => {
    return match === ' ' ? '&#160;' : match;
  });
}
