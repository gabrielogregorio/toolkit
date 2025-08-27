import { useEffect, useState } from "react";
import { LocalStorageService } from "./Service";
import type { HistoricType } from "./historic.type";

export const useHandleHistoric = () => {
  const [historicItems, setHistoric] = useState<HistoricType[]>([]);

  useEffect(() => {
    setHistoric(LocalStorageService.GetItems());
  }, []);

  const deleteItem = (id: string) => {
    const newState = historicItems.filter((item) => item.id != id);

    setHistoric(newState);
    LocalStorageService.Saveitem(newState);
  };
  
  const addItem = (timer: string, text: string) => {
    const oldState = [...historicItems];
    oldState.push({
      id: new Date().toString() + "-" + Math.random().toString(),
      text,
      timer,
    });

    setHistoric(oldState);
    LocalStorageService.Saveitem(oldState);
  };

  return {
    historic: historicItems,
    deleteItem,
    addItem,
  };
};
