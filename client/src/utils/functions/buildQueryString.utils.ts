interface Params {
  [key: string]: string | number
}

export function buildQueryString(params: Params) {
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

  return `?${queryString}`
}
