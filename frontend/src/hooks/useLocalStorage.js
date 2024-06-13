import { useEffect, useState } from "react";
/*
/**
 * useLocalStorage Hook
 * This custom hook provides an interface for interacting with the local storage in the browser.
 * It allows you to store, retrieve, and update a value in local storage.
 *
*/
const useLocalStorage = (key, firstVal = null) => {
  const initialValue = window.localStorage.getItem(key) || firstVal;
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
