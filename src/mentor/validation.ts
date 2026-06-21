export const isValidDateOfBirth = (value: string): boolean => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim())
  if (!match) {
    return false
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export const getAgeFromDateOfBirth = (value: string, today = new Date()): number | null => {
  if (!isValidDateOfBirth(value)) {
    return null
  }

  const [day, month, year] = value.trim().split("/").map(Number)
  let age = today.getFullYear() - year
  const birthdayThisYear = new Date(today.getFullYear(), month - 1, day)

  if (today < birthdayThisYear) {
    age -= 1
  }

  return age
}

export const isMentorOldEnough = (value: string): boolean => {
  const age = getAgeFromDateOfBirth(value)
  return age !== null && age >= 18
}

export const formatDateOfBirthInput = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 8)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}
