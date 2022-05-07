import { User as IUser } from '../user/entities'

export {}

interface ResReturn {
  success: boolean
  error: {
    status: number
    message: string
  } | null
  response: unknown
}
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AuthInfo {}
    export interface Request {
      id: string
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends IUser {
      accessToken?: string
    }

    // TODO Response 어떻게 덮어쓰지?
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    // export interface Response<
    //   ResBody = ResReturn,
    //   Locals extends Record<string, any> = Record<string, any>
    // > extends core.Response<ResBody, Locals> {}
  }
}
