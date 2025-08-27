import type { HistoricType } from "./historic.type";

const keyStorage = "historic";

export class LocalStorageService {
  static Saveitem(value: HistoricType[]): void {
    localStorage.setItem(keyStorage, JSON.stringify(value));
  }

  static GetItems(): HistoricType[] {
    return JSON.parse(localStorage.getItem(keyStorage) || "[]");
  }
}
