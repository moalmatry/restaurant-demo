/**
 * Removes specified properties from an object.
 *
 * @param obj - The object from which properties should be removed.
 * @param keys - An array of property keys to remove from the object.
 * @returns A new object with the specified properties removed.
 */
export const removeProperties = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  keys: string[],
  renames?: Array<{ oldName: string; newName: string }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  const newObj = obj.toObject();
  for (const key of keys) {
    delete newObj[key];
  }

  if (renames) {
    for (const rename of renames) {
      newObj[rename.newName] = newObj[rename.oldName];
      delete newObj[rename.oldName];
    }
  }

  return newObj;
};
