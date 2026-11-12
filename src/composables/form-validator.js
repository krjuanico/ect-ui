import { ref } from 'vue'

const LABELS = {
  email: 'Email',
  password: 'Password',
}

function labelOf(field) {
  return LABELS[field] ?? field.charAt(0).toUpperCase() + field.slice(1)
}

/** Error messages used in the Vuelidate rules. */
export function useFormRules() {
  const getErrorMessages = (field) => ({
    required: () => `${labelOf(field)} is required.`,
    email: () => 'Enter a valid email address.',
  })

  return { getErrorMessages }
}

/** Combines Vuelidate errors with the errors returned by the API (HTTP 422). */
export function useFormValidator(validator) {
  const apiErrors = ref({})

  function getErrors(field) {
    const local = (validator.value[field]?.$errors ?? []).map((item) => String(item.$message))
    const remote = apiErrors.value[field] ?? []
    return [...local, ...remote]
  }

  function isInvalid(field) {
    return getErrors(field).length > 0
  }

  function setApiErrors(errors) {
    apiErrors.value = errors ?? {}
  }

  function clearApiErrors() {
    apiErrors.value = {}
  }

  return { getErrors, isInvalid, setApiErrors, clearApiErrors }
}