export const buildQueryString = (filters: Record<string, string>) => {
  const filteredFilters: Record<string, string> = {}

  for (const key in filters) {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      filteredFilters[key] = filters[key].toString()
    }
  }

  const queryString = new URLSearchParams(filteredFilters).toString()
  return queryString ? `?${queryString}` : ''
}
