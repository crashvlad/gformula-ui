import { useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item =
        typeof window !== 'undefined' && window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (): void => {
    try {
      window.localStorage.removeItem(key); // Remove from local storage
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, removeValue];
}

export { useLocalStorage };
