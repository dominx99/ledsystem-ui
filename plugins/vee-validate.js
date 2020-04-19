import { extend, setInteractionMode } from 'vee-validate'
import { required, length, email, min, max } from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} nie może być puste.',
})

extend('min', {
  ...min,
  message: '{_field_} nie powinno być krótsze niż {length} znaków.',
})

extend('max', {
  ...max,
  message: '{_field_} nie powinnoj być dłuższe niż {length} znaków.',
})

extend('max_price', {
  params: ['max', 'price'],
  validate: (_, { max, price }) => {
    return parseInt(price) <= max
  },
  message: '{_field_} nie może być większa niż {max}.',
})

extend('email', {
  ...email,
  message: 'Email musi być poprawny',
})

extend('slug', value => {
  let valid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)

  if (valid) {
    return true
  }

  return 'Slug nie może posiadać spacji, polskich znaków, ani dużych liter.'
})

extend('length', {
  validate: (value, { min, max }) => {
    if (typeof max === "undefined" || max === "null") {
      return value.length >= min
    }

    if (min === "null") {
      return value.length <= max
    }

    return value.length >= min && value.length <= max;
  },
  message: (fieldName, { min, max }) => {
    if (typeof max === "undefined" || max === "null") {
      return `${fieldName} musi posiadać przynajmniej ${min} elementów.`
    }

    if (min === "null") {
      return `${fieldName} musi posiadać najwyżej ${max} elementów.`
    }

    return `${fieldName} musi posiadać przynajmniej ${min} elementów i najwyżej ${max} elementów.`
  },
  params: ['min', 'max'],
})
