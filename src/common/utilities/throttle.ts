import { throttle } from 'throttle-debounce';

export default (fn: any, ms: number) => throttle(ms, fn);
