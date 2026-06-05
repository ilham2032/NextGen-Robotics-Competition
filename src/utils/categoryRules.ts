import type { Category, Member } from '../admin/types'

/** Official participant age ranges per competition category. */
export const CATEGORY_AGE_REQUIREMENTS: Record<string, { ageMin: number; ageMax: number }> = {
  'mega sumo': { ageMin: 18, ageMax: 30 },
  'mini sumo': { ageMin: 18, ageMax: 30 },
  'mini sumo kids': { ageMin: 13, ageMax: 17 },
  '1kg lego sumo': { ageMin: 8, ageMax: 12 },
  '3kg lego sumo': { ageMin: 8, ageMax: 12 },
  'lego line': { ageMin: 8, ageMax: 12 },
  'line follower': { ageMin: 13, ageMax: 18 },
  'start up senior': { ageMin: 18, ageMax: 25 },
}

export const CATEGORY_AGE_REQUIREMENTS_LIST = [
  { name: 'Mega Sumo', ageMin: 18, ageMax: 30 },
  { name: 'Mini Sumo', ageMin: 18, ageMax: 30 },
  { name: 'Mini Sumo Kids', ageMin: 13, ageMax: 17 },
  { name: '1kg Lego Sumo', ageMin: 8, ageMax: 12 },
  { name: '3kg Lego Sumo', ageMin: 8, ageMax: 12 },
  { name: 'Lego Line', ageMin: 8, ageMax: 12 },
  { name: 'Line Follower', ageMin: 13, ageMax: 18 },
  { name: 'Start Up Senior', ageMin: 18, ageMax: 25 },
] as const

export const normalizeCategoryName = (name: string): string => name.trim().toLowerCase()

export const findCategoryByName = (categories: Category[], categoryName: string): Category | undefined => {
  const normalized = normalizeCategoryName(categoryName)
  return categories.find((category) => normalizeCategoryName(category.name) === normalized)
}

export const getCategoryAgeRange = (
  category: Category | undefined,
): { ageMin: number; ageMax: number } | null => {
  if (!category) return null
  if (category.ageMin !== undefined && category.ageMax !== undefined) {
    return { ageMin: category.ageMin, ageMax: category.ageMax }
  }
  return CATEGORY_AGE_REQUIREMENTS[normalizeCategoryName(category.name)] ?? null
}

export const applyDefaultAgeRangeToCategory = (category: Category): Category => {
  const range = CATEGORY_AGE_REQUIREMENTS[normalizeCategoryName(category.name)]
  if (!range) return category
  return {
    ...category,
    ageMin: category.ageMin ?? range.ageMin,
    ageMax: category.ageMax ?? range.ageMax,
  }
}

export const isMemberEligibleForCategory = (member: Member, category: Category | undefined): boolean => {
  const range = getCategoryAgeRange(category)
  if (!range) return true
  return member.age >= range.ageMin && member.age <= range.ageMax
}

export const formatCategoryAgeRequirement = (category: Category | undefined): string | null => {
  const range = getCategoryAgeRange(category)
  if (!range) return null
  return `Ages ${range.ageMin}–${range.ageMax}`
}

export const validateMembersForCategoryAge = (
  members: Member[],
  category: Category | undefined,
): string | null => {
  const range = getCategoryAgeRange(category)
  if (!range || !category) return null

  const ineligible = members.filter((member) => !isMemberEligibleForCategory(member, category))
  if (ineligible.length === 0) return null

  const names = ineligible.map((m) => `${m.name} ${m.surname} (age ${m.age})`).join(', ')
  return `These participants are outside the required age range (${range.ageMin}–${range.ageMax}) for ${category.name}: ${names}.`
}
