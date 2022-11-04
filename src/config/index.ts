export const secondsToRedirect = +(
  (process.env.REACT_APP_SECONDS_TO_REDIRECT as string) || '10'
);

const config = {
  apiUrl: process.env.REACT_APP_API_ENDPOINT,
  env: process.env.NODE_ENV,
  reactAppLanguage: process.env.REACT_APP_LANGUAGE || 'no',
  fallbackLanguage: process.env.REACT_APP_LANGUAGE_FALLBACK || 'no',
};

const configuration = () => {
  if (!Object.keys(config.env).length) throw new Error('ENV is missing!');
  if (!config.apiUrl) throw new Error('REACT_APP_API_ENDPOINT is missing!');

  return config;
};

export default configuration;
