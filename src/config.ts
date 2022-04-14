import { DataSourceOptions } from 'typeorm'

export const PORT = process.env.PORT || 3000

export const isProd = process.env.NODE_ENV === 'production'

export const ORM_CONFIG: DataSourceOptions = isProd
  ? {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    }
  : {
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER || 'test',
      password: process.env.POSTGRES_PASSWORD || 'test',
      database: process.env.POSTGRES_DB || 'test',
      synchronize: true,
    }
