export interface ClientCompany {
  id: string
  name: string
  logo: string
  secondaryLogo?: string
}

export const CLIENTS_LIST: ClientCompany[] = [
  {
    id: 'dr-reddys',
    name: 'Dr Reddy’s Laboratories Limited',
    logo: '/assets/images/clients/dr-reddys.png',
  },
  {
    id: 'msn-labs',
    name: 'MSN Laboratories Ltd',
    logo: '/assets/images/clients/msn-labs.png',
  },
  {
    id: 'hetero-pharma',
    name: 'Hetero Pharma Limited',
    logo: '/assets/images/clients/hetero-pharma.png',
  },
  {
    id: 'marksans-pharma',
    name: 'Marksans Pharma Limited',
    logo: '/assets/images/clients/marksans-pharma.png',
  },
  {
    id: 'east-india-pharma',
    name: 'East India Pharmaceutical Works Ltd',
    logo: '/assets/images/clients/east-india-pharma.png',
  },
  {
    id: 'itc-mangaldeep',
    name: 'ITC Limited - Mangaldeep Agarbatti',
    logo: '/assets/images/clients/itc-mangaldeep.png',
  },
  {
    id: 'hilton-tobacco',
    name: 'Hilton Tobacco Private Limited',
    logo: '/assets/images/clients/hilton-tobacco.png',
  },
  {
    id: 'srinivasa-dairy',
    name: 'Srinivasa Dairy Products - Scoops & Cream Stone',
    logo: '/assets/images/clients/cream-stone-scoops.png',
    secondaryLogo: '/assets/images/clients/cream-stone.png',
  },
  {
    id: 'meghana-foods',
    name: 'Meghana Foods Pvt Ltd - Dairy Treat',
    logo: '/assets/images/clients/meghana-foods.png',
  },
  {
    id: 'sri-vengamamba-dairy',
    name: 'Sri Vengamamba Dairy Products - Magic Scoop & Honey Bell',
    logo: '/assets/images/clients/vengamamba-magic-scoop.png',
    secondaryLogo: '/assets/images/clients/vengamamba-honey-bell.png',
  },
]
