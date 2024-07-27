import { saveEntry } from './EntryForm.model';

export class EntryFormController {
  async handleAddEntry(type, note) {
    const entry = await saveEntry(type, note);
    console.log(entry);
  }
}
