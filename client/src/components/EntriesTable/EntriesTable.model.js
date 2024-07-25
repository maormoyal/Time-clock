import { fetchEntries } from '../Dashboard/Dashboard.model';

export const getEntries = async () => {
  const entries = await fetchEntries();
  return entries;
};
