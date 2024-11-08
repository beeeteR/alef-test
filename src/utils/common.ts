export function checkWarning(value: number | string) {
  switch (typeof value) {
    case 'string':
      if (value.length < 2) return 'Имя должно состоять, как минимум из 2 символов'
      else if (value.length > 20) return 'Имя должно быть короче 20 символов'
      else return false
    case 'number':
      if (value < 1) return 'Возраст не может быть меньше 1'
      else if (value > 100) return 'Возраст не должен быть больше 100'
      else return false
  }
}
