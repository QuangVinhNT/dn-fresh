const isImage = (url: string) => {
  const imageTypes = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'bmp', 'tiff']
  return imageTypes.some((imageType) => url.endsWith(imageType))
}
export default isImage
