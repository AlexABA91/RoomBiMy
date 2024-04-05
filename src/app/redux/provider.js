"use client";

import { Provider } from "react-redux";
import store from "./store"; // Змінено ім'я і імпорт

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
