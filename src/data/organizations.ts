import YourVisaAssistance from '../assets/619395084_17896020795383433_1687352418807126550_n-removebg-preview.png'
import Kavkaz from '../assets/491497892_17926750140050283_2377610097470685483_n-removebg-preview.png'
import RSMEDIA from '../assets/rs-media-logo-YAGN3-1G-removebg-preview (1).png'
import INNOVATIONS from '../assets/images.jpg'
import ASOIU from '../assets/asoiu.png'

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
    id: 'it-innovations',
    type: 'sponsor',
    nameKey: 'IT INNOVATIONS Academy',
    descriptionKey: 'Educational partner empowering students with advanced skills in programming, robotics, and technology innovation for the future.',
    logo: INNOVATIONS,
    logoAlt: 'IT INNOVATIONS logo',
    website: 'https://itinnovations.az/az/home',
  },
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
    id: 'asoui',
    type: 'sponsor',
    nameKey: 'Azerbaijan State Oil and Industry University',
    descriptionKey: 'Educational partner empowering students with advanced skills in programming, robotics, and technology innovation for the future.',
    logo: ASOIU,
    logoAlt: 'ASOIU logo',
    website: 'https://asoiu.edu.az/',
  },
    {
    id: 'victory-group',
    type: 'sponsor',
    nameKey: 'Victory Group',
    descriptionKey: 'Official sponsor providing guidance and support for students applying to study abroad and international education programs.',
    logoAlt: 'Victory Group logo',
    website: 'https://victorygroup.az',
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
    website: 'https://rsmediateam.com',
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
