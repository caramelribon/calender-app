export const colors = [
  {
    label: 'Red',
    value: 0,
    color: '#fecbcc'
  },
  {
    label: 'Orange',
    value: 1,
    color: '#FFC940'
  },
  {
    label: 'Yellow',
    value: 2,
    color: '#fff57f'
  },
  {
    label: 'Green',
    value: 3,
    color: '#badf73'
  },
  {
    label: 'Blue',
    value: 4,
    color: '#8bd0ff'
  },
  {
    label: 'Purple',
    value: 5,
    color: '#d0bfff'
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
