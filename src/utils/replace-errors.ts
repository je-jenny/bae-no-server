export function replaceErrors(_: any, value: any[]) {
  if (value instanceof Error) {
    const error: Record<any, any> = {}

    Object.getOwnPropertyNames(value).forEach(function (propName: any) {
      error[propName] = value[propName]
    })

    return error
  }

  return value
}
