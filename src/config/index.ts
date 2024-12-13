import { config } from "dotenv";
config();

// API URL
let apiUrl = <string>process.env.API_LOCAL_URL;
let env = <string>process.env.NODE_ENV;
if (env === "development") {
  apiUrl = <string>process.env.API_DEV_URL;
} else if (env === "qa") {
  apiUrl = <string>process.env.API_QA_URL;
} else if (env === "production") {
  apiUrl = <string>process.env.API_PROD_URL;
}

const configs = {
  env,
  db: {
    dev: <string>process.env.DB_DEV_REMOTE,
    qa: <string>process.env.DB_QA_REMOTE,
    prod: <string>process.env.DB_PROD_REMOTE,
  },
  redis: {
    dev: <string>process.env.REDIS_DEV_LOCAL,
    dev_port: <string>process.env.REDIS_DEV_PORT,
  },
  jwt: {
    secret: <string>process.env.JWT_SECRET,
    expires_in: <string>process.env.JWT_EXPIRES_IN,
  },
  api_key: <string>process.env.API_KEY,
  delete_key: <string>process.env.DELETE_KEY,
  is_mongo: true,
  email: {
    user: <string>process.env.EMAIL_USER,
    host: <string>process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT as unknown as number,
    password: <string>process.env.EMAIL_PASSWORD,
  },
  cloudinary: {
    name: <string>process.env.CLOUDINARY_CLOUD_NAME,
    key: <string>process.env.CLOUDINARY_API_KEY,
    secret: <string>process.env.CLOUDINARY_API_SECRET,
  },
};

export { configs };
