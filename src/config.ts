import type { DataSourceOptions } from 'typeorm'
import type { _StrategyOptionsBase } from 'passport-google-oauth20'
import { StrategyOption } from 'passport-kakao'
import { RedisClientOptions } from 'redis'

export const PORT = process.env.PORT || 3000

const entities = ['**/*.entity.js']

const TEST_CONFIG: DataSourceOptions = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  dropSchema: true,
  entities: ['**/*.entity.ts'],
  database: 'postgres',
  synchronize: true,
  logging: false,
}

const LOCAL_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  entities,
  logging: true,
}

const DEV_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities,
  logging: true,
}

const PROD_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities,
  logging: true,
}

export const ORM_CONFIG: DataSourceOptions =
  process.env.NODE_ENV === 'test'
    ? TEST_CONFIG
    : process.env.NODE_ENV === 'production'
    ? PROD_CONFIG
    : process.env.NODE_ENV === 'development'
    ? DEV_CONFIG
    : LOCAL_CONFIG

export const REDIS_CONFIG: RedisClientOptions =
  process.env.NODE_ENV === 'production'
    ? {
        legacyMode: true,
        url: process.env.REDIS_URL,
      }
    : { legacyMode: true, url: 'redis://redis:6379' }
export const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || 'localhost:3001'

export const JWT_SECRET = process.env.JWT_SECRET || ''

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 14 // 14일
export const SESSION_OPTION = {
  secret: process.env.SESSION_SECRET || 'sesecrcretet',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: COOKIE_MAX_AGE,
    saveUninitialized: false,
    secure: false,
    httpOnly: true,
  },
}

export const GOOGLE_CONFIG: _StrategyOptionsBase = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL:
    process.env.GOOGLE_CALLBACK_URL ||
    'http://www.example.com/auth/google/callback',
}

export const KAKAO_CONFIG: StrategyOption = {
  clientID: process.env.KAKAO_CLIENT_ID || '',
  clientSecret: '',
  callbackURL:
    process.env.KAKAO_CALLBACK_URL ||
    'http://www.example.com/auth/google/callback',
}

// export const CORS_CONFIG: CorsOptions =
//   process.env.NODE_ENV === 'production'
//     ? { origin: [CLIENT_DOMAIN], credentials: true }
//     : { origin: '*' }
