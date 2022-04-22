import type { DataSourceOptions } from 'typeorm'
import type { _StrategyOptionsBase } from 'passport-google-oauth20'
import { StrategyOption } from 'passport-kakao'

export const PORT = process.env.PORT || 3000

export const isProd = process.env.NODE_ENV === 'production'

const entities = ['**/*.entity.js']

export const TEST_CONFIG: DataSourceOptions = {
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

export const ORM_CONFIG: DataSourceOptions = isProd
  ? {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities,
      logging: true,
    }
  : {
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER || 'test',
      password: process.env.POSTGRES_PASSWORD || 'test',
      database: process.env.POSTGRES_DB || 'test',
      synchronize: true,
      entities,
      logging: true,
    }

export const REDIS_URL = process.env.REDIS_URL || 'localhost:6379'

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 14 // 30일
export const SESSION_OPTION = {
  secret: process.env.SESSION_SECRET || 'sesecrcretet',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: COOKIE_MAX_AGE,
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

// export const CORS_CONFIG: CorsOptions = isProd
//   ? { origin: CLIENT_DOMAIN, credentials: true }
//   : { origin: '*' }
