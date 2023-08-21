import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setAccessToken = (key: string, token: string) => {
  typeof window !== undefined && window.localStorage.setItem(key, token);
};

export const getAccessToken = (key: string) => {
  return window !== undefined && window.localStorage.getItem(key);
};

export const deleteAccessToken = (key: string) => {
  typeof window !== undefined && window.localStorage.removeItem(key);
};
