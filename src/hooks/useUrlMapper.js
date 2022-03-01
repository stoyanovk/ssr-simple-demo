import { useLocation, useParams } from 'react-router-dom'

export const getUrlQueryParams = url => {
  const searchParams = new URLSearchParams(url)
  const query = {}
  for (const item of searchParams) {
    query[item[0]] = item[1]
  }
  return query
}

export const useUrlMapper = () => {
  const params = useParams()
  const { search, pathname } = useLocation()
  const query = getUrlQueryParams(search)
  return {
    params,
    query,
    pathname
  }
}

export const useGenerateUrl = () => {
  const { search, pathname } = useLocation()
  return params => {
    const searchParams = new URLSearchParams(search)
    for (const key in params) {
      searchParams.set(key, params[key])
    }

    return `${pathname}?${searchParams.toString()}`
  }
}
