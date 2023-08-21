import {
  BookKey,
  FlaskConical,
  Frown,
  Lightbulb,
  Meh,
  Smile,
} from 'lucide-react';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const LOCAL_URL = 'http://localhost:8080';
export const PROD_URL = 'https://growth-formula-api.onrender.com';

export const BASE_URL = IS_PRODUCTION ? PROD_URL : LOCAL_URL;

export const SALES_PROCESS_IMPACT_OPTIONS = [
  { id: 1, value: 'ACTIVATION', label: 'ACTIVACIÓN' },
  { id: 2, value: 'RETENTION', label: 'RETENCIÓN' },
  { id: 3, value: 'ACQUISITION', label: 'ADQUISICIÓN' },
  { id: 4, value: 'VIRAL', label: 'VIRAL' },
  { id: 5, value: 'MONETIZATION', label: 'MONETIZACIÓN' },
];

export const USER_ACCESS_LEVEL_OPTIONS = [
  { id: 1, value: 'ACCOUNT_ADMIN', label: 'ADMINISTRADOR' },
  { id: 2, value: 'ACCOUNT_EDITOR', label: 'USUARIO' },
];

export const USER_ACCESS_LEVEL_DICTIONARY: { [key: string]: string } = {
  ACCOUNT_ADMIN: 'ADMINISTRADOR',
  ACCOUNT_EDITOR: 'USUARIO',
};

export const ACCESS_LEVEL = {
  SUPER_USER: 'SUPER_USER',
  SUPER_EDITOR: 'SUPER_EDITOR',
  SUPER_VIEWER: 'SUPER_VIEWER',
  ACCOUNT_ADMIN: 'ACCOUNT_ADMIN',
  ACCOUNT_EDITOR: 'ACCOUNT_EDITOR',
  ACCOUNT_VIEWER: 'ACCOUNT_VIEWER',
  PAUSED: 'PAUSED',
  NO_ACCES: 'NO_ACCESS',
};

export const CARD_HIPO_STATUS_STYLES: { [key: string]: any } = {
  IDEA: {
    icon: Lightbulb,
    color: '#f1b54c',
    bg: '#fcebd2',
  },
  TEST: {
    icon: FlaskConical,
    color: '#556EE5',
    bg: '#D5DAFA',
  },
  COMPLETED: {
    icon: BookKey,
    color: '#50a5f1',
    bg: '#d3e8fc',
  },
  WORK: {
    icon: Smile,
    color: '#6ae6d7',
    bg: '#c1f5ef',
  },
  NOT_WORK: {
    icon: Frown,
    color: '#ee6170',
    bg: '#f8bfc5',
  },
  NOT_CONCLUSIVE: {
    icon: Meh,
    color: '#9d9d9d',
    bg: '#dfdfdf',
  },
};
