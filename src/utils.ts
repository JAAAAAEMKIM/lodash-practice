export const getKey = (index: number, keys?: Array<string>): string | number => {
  return keys ? keys[index] : index; 
};