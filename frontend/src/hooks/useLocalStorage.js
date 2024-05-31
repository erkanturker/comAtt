import React, { useState } from "react";
import { useEffect } from "react";

const useLocalStorage = (key, firstVal = null) => {
  const initialValue = window.localStorage.getItem(key) || firstVal;
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    console.log(`hooks useLocalStorage ${storedValue}`);

    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
