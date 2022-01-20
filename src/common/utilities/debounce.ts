import { debounce } from 'throttle-debounce';

export default (fn: ([...args]: any) => any, ms: number) => debounce(ms, fn);
