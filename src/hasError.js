import plainGetIn from './structure/plain/getIn'

const getErrorKey = (name, type) => {
  switch (type) {
    case 'Field':
      return name
    case 'FieldArray':
      return `${name}._error`
  }
}

const createHasError = ({ getIn }) => {
  const hasError = (field, syncErrors, asyncErrors, submitErrors) => {
    const name = getIn(field, 'name')
    const type = getIn(field, 'type')
    if (!syncErrors && !asyncErrors && !submitErrors) {
      return false
    }
    const errorKey = getErrorKey(name, type)
    const syncError = plainGetIn(syncErrors, errorKey)
    if (!!syncError) {
      return true
    }
    const asyncError = getIn(asyncErrors, errorKey)
    if (!!asyncError) {
      return true
    }
    const submitError = getIn(submitErrors, errorKey)
    if (!!submitError) {
      return true
    }

    return false
  }
  return hasError
}

export default createHasError
