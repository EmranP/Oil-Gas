import type { FC } from 'preact/compat'
import { navbarList } from '../../constants/nav.constants'

export const HeaderNav: FC = () => {
	return (
		<nav>
			<ul className={'flex items-center gap-[105px]'}>
				{navbarList.map(navItem => (
					<li
						key={navItem.id}
						id={navItem.id}
						className={'text-[18px] font-normal leading-normal'}
					>
						{navItem.name}
					</li>
				))}
			</ul>
		</nav>
	)
}
