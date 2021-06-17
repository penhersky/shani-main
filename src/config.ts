const ENV = process.env;

export const isProduction: boolean = ENV.NODE_ENV === 'production';
export const isDevelopment: boolean = !isProduction;
export const PORT: number | undefined = Number(ENV.PORT);

// database
export const { DB_STR_URL } = ENV;
export const { REDIS_HOST } = ENV;
export const { REDIS_PORT } = ENV;
export const { REDIS_DB } = ENV;

// io
export const { MAX_NOTIFICATION_LISTENERS } = ENV;

// log lever
export const { LOG_LEVEL } = ENV;

// app utl
export const { CLIENT_URL } = ENV;
export const { SLS_URL } = ENV;
export const { USER_SERVICE_URL } = ENV;

// Secret keys
export const { ACCESS_SERVICE_SECURITY_TOKEN_KEY } = ENV;
