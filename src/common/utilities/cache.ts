const cache: Record<string, any> = {};

const get = (key: string) => cache[key];

const set = (key: string, value: any) => {
  cache[key] = value;
};

const remove = (key: string) => delete cache[key];

export default { get, set, remove };
