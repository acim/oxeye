import { writable } from "svelte/store";

function useLocalStorage(store) {
  const json = localStorage.getItem("user");
  if (json && json !== "undefined") {
    store.set(JSON.parse(json));
  }

  store.subscribe((value) =>
    localStorage.setItem("user", JSON.stringify(value))
  );
}

export const user = writable();
if (process.browser) {
  useLocalStorage(user, process.env.SAPPER_APP_LOCAL_STORAGE_KEY);
}
