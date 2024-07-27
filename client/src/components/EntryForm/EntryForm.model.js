import { addEntry } from '../Dashboard/Dashboard.model';

export const saveEntry = async (type, note) => {
  const entry = await addEntry(type, note);
  return entry;
};
