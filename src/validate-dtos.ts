import { validate } from 'class-validator'

export const validateDtos = async (...dtos: object[]): Promise<boolean> => {
  for (const dto of dtos) {
    const errors = await validate(dto)
    if (errors.length > 0) {
      return false
    }
  }
  return true
}
