const splitId = (url) => {
  const splitUrl = url.split('/')
  return splitUrl[splitUrl.length - 2]
}

export const pokemonMapper = (results) => {
  const pokemondata = results.map(({ name, url }) => ({
    name,
    url,
    id: splitId(url)
  }))
  return pokemondata
}
