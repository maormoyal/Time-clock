import { getEntries } from './EntriesTable.model';

export class EntriesTableController {
  async loadEntries() {
    const entries = await getEntries();
    return entries;
  }
}
