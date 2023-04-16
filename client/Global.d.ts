declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.css';

declare global {
    interface Window {
        [key: string]: any;
    }
}

export {};
