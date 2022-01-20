declare global {
  interface Window {
    ENV: any;
  }
}
const { ENV } = window;

const loadConfig = (name: string) => {
  try {
    // eslint-disable-next-line
    return require(`src/config/${name}.config`);
  } catch (e) {
    return {};
  }
};

const replaceValue = (name: string, config: any, data: any) => {
  let value = config[name];
  if (data) {
    // eslint-disable-next-line
    for (const key in data) {
      value = value.replace(`{${key}}`, data[key]);
    }
  }
  return value;
};

const getConfig = () => {
  const envConfig = loadConfig(ENV?.REACT_APP_ENVIRONMENT || 'local');
  const defaultConfig = loadConfig('default');
  return { ...defaultConfig, ...envConfig };
};

const withConfig = (name: string, data?: any) => {
  const config = getConfig();
  return replaceValue(name, config, data);
};

export default withConfig;
