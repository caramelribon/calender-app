export const colors = [
  {
    label: 'Red',
    value: 0,
    color: '#ff0000'
  },
  {
    label: 'Orange',
    value: 1,
    color: '#ffa500'
  },
  {
    label: 'Yellow',
    value: 2,
    color: '#ffff00'
  },
  {
    label: 'Green',
    value: 3,
    color: '#008000'
  },
  {
    label: 'Blue',
    value: 4,
    color: '#0000ff'
  },
  {
    label: 'Purple',
    value: 5,
    color: '#800080'
  }
]

export const getColorData = (colorId: number | undefined) => {
  if (colorId == undefined) return 'default'
  return colors.find((color) => color.value == colorId)?.color || 'default'
}

export type Color = {
  label: string
  value: number
  color: string
}
