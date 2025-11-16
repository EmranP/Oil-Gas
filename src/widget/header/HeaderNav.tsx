import { useEffect, useState, type FC } from 'preact/compat'
import { navbarList, type NavItem } from '../../constants/nav.constants'

type HeaderNavToggleDetail = { isOpen: boolean }

export const HeaderNav: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		const onToggle = (e: Event) => {
			const ce = e as CustomEvent<HeaderNavToggleDetail> | undefined

			if (ce?.detail && typeof ce.detail.isOpen === 'boolean') {
				setIsOpen(ce.detail.isOpen)
			}
		}

		const onEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false)
		}

		window.addEventListener('header-nav-toggle', onToggle as EventListener)
		window.addEventListener('keydown', onEsc)

		return () => {
			window.removeEventListener('header-nav-toggle', onToggle as EventListener)
			window.removeEventListener('keydown', onEsc)
		}
	}, [])

	const renderNavItem = (item: NavItem) => (
		<li key={item.id}>
			<a
				href={item.id}
				class='text-lg font-medium block'
				onClick={() => setIsOpen(false)}
			>
				{item.name}
			</a>
		</li>
	)

	return (
		<>
			<nav class={'sm:block hidden'}>
				<ul className={'flex items-center gap-[105px]'}>
					{navbarList.map(navItem => (
						<li
							key={navItem.id}
							id={navItem.id}
							className={
								'text-[18px] font-normal leading-normal cursor-pointer hover:underline text-white'
							}
						>
							<a href={navItem.id}>{navItem.name}</a>
						</li>
					))}
				</ul>
			</nav>

			{/* Mobile */}
			<div
				class={`sm:hidden ${
					isOpen ? 'pointer-events-auto' : 'pointer-events-none'
				} fixed inset-0 z-40`}
			>
				<button
					aria-hidden={!isOpen}
					onClick={() => setIsOpen(false)}
					class={`absolute inset-0 transition-opacity duration-300 ${
						isOpen ? 'opacity-100' : 'opacity-0'
					}`}
					style={{ background: 'rgba(0,0,0,0.4)' }}
				/>

				<aside
					id='header-mobile-nav'
					class={`fixed top-0 right-0 h-full w-[85%] max-w-xs bg-[#0b1d26] shadow-lg transform transition-transform duration-300 ease-in-out ${
						isOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
					aria-hidden={!isOpen}
				>
					<nav class='px-6 py-8' aria-label='Мобильная навигация'>
						<ul class='flex flex-col gap-6'>{navbarList.map(renderNavItem)}</ul>
					</nav>
				</aside>
			</div>
		</>
	)
}
