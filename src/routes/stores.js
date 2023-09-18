import { writable } from 'svelte/store';

export const checkFinished = writable(false);
export const checkRunning = writable(false);