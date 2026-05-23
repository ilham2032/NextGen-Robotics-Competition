import YourVisaAssistance from '../assets/619395084_17896020795383433_1687352418807126550_n-removebg-preview.png'
import KapitalBank from '../assets/Kapital_Bank_logo_2025.png'
import Kavkaz from '../assets/491497892_17926750140050283_2377610097470685483_n-removebg-preview.png'
import RSMEDIA from '../assets/rs-media-logo-YAGN3-1G-removebg-preview (1).png'

export type OrganizationType = 'partner' | 'sponsor'

export type OrganizationDefinition = {
  id: string
  type: OrganizationType
  nameKey: string
  descriptionKey: string
  logo?: string
  logoAlt: string
  website: string
}

export const ORGANIZATIONS: OrganizationDefinition[] = [
  {
    id: 'your-visa-assistance',
    type: 'sponsor',
    nameKey: 'Your Visa Assistance',
    descriptionKey: 'Sponsor description: Your Visa Assistance',
    logo: YourVisaAssistance,
    logoAlt: 'Your Visa Assistance logo',
    website: 'https://yourvisaassistance.com',
  },
  {
    id: 'kapital-bank',
    type: 'sponsor',
    nameKey: 'Kapital Bank',
    descriptionKey: 'Sponsor description: Kapital Bank',
    logo: KapitalBank,
    logoAlt: 'Kapital Bank logo',
    website: 'https://www.kapitalbank.az',
  },
  {
    id: 'kavkaz-robotics',
    type: 'partner',
    nameKey: 'Kavkaz Robotics School',
    descriptionKey: 'Partner description: Kavkaz Robotics School',
    logo: Kavkaz,
    logoAlt: 'Kavkaz Robotics School logo',
    website: 'https://www.facebook.com/kavkazrobotics',
  },
  {
    id: 'rs-media',
    type: 'partner',
    nameKey: 'RS Media Team',
    descriptionKey: 'Partner description: RS Media Team',
    logo: RSMEDIA,
    logoAlt: 'RS Media Team logo',
    website: 'https://rsm.az',
  },
  {
    id: 'victory-group',
    type: 'partner',
    nameKey: 'Victory Group',
    descriptionKey: 'Partner description: Victory Group',
    logoAlt: 'Victory Group logo',
    website: 'https://victorygroup.az',
  },
]

export const normalizeWebsiteUrl = (url: string): string => {
  const trimmed = url.trim()
  if (!trimmed) {
    return ''
  }
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export const getOrganizationsByType = (type: OrganizationType) =>
  ORGANIZATIONS.filter((organization) => organization.type === type)
