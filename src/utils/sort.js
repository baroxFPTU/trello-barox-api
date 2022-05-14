export const mapOrder = (array, order) => {
  return array.sort((a, b) => order(a, b))
}