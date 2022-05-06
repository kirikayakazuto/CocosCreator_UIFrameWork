export const measure = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log(`${propertyKey} Execution time: ${(finish - start).toFixed(2)} milliseconds`);
    return result;
  };

  return descriptor;
};