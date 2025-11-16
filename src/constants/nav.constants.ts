export interface NavItem {
	id: string
	name: string
	order?: number
}

export const navbarList = [
	{
		id: '#aboutUs',
		name: 'About us',
		order: 1,
	},
	{
		id: '#service',
		name: 'Services',
		order: 2,
	},
	{
		id: '#locations',
		name: 'Locations',
		order: 3,
	},
	{
		id: '#petrochemicals',
		name: 'Petrochemicals',
		order: 4,
	},
	{
		id: '#contactUs',
		name: 'Contact us',
		order: 5,
	},
] as const
