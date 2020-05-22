export const splitId = (url) => {
  const splitUrl = url.split('/')
  return splitUrl[splitUrl.length - 2]
}
