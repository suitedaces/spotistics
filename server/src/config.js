import dotenv from 'dotenv';

dotenv.config();

export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';

export const CLIENT_ID: string | undefined = process.env.CLIENT_ID;
export const CLIENT_SECRET: string | undefined = process.env.CLIENT_SECRET;
export const REDIRECT_URI: string = IS_PRODUCTION ? 'https://sonophile.xyz/api/callback' : (process.env.REDIRECT_URI || 'http://localhost:8888/api/callback');
export const FRONTEND_URI: string = IS_PRODUCTION ? 'https://sonophile.xyz' : (process.env.FRONTEND_URI || 'http://localhost:5173');
export const PORT: string | number = process.env.PORT || 8888;
export const MONGO_URI: string | undefined = process.env.MONGO_URI;