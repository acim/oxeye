// import { writable } from "svelte/store";

// function useLocalStorage(store, key) {
//   const json = localStorage.getItem(key);
//   if (json && json !== "undefined") {
//     store.set(JSON.parse(json));
//   }

//   store.subscribe((value) =>
//     localStorage.setItem(key, JSON.stringify(value))
//   );
// }

// export const user = writable();
// if (process.browser) {
//   useLocalStorage(user, process.env.SAPPER_APP_LOCAL_STORAGE_KEY);
// }
