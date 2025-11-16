import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type FC,
} from 'preact/compat'

export const HeaderBurger: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const btnRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent('header-nav-toggle', { detail: { isOpen } })
		)
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth >= 640) setIsOpen(false)
		}
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (!isOpen) return

			const btn = btnRef.current
			const panel = document.getElementById('header-mobile-nav')

			const target = e.target as Node

			if (btn && panel && !btn.contains(target) && !panel.contains(target)) {
				setIsOpen(false)
			}
		}

		window.addEventListener('click', onClickOutside)
		return () => window.removeEventListener('click', onClickOutside)
	}, [isOpen])

	const toggle = useCallback(() => setIsOpen(v => !v), [])

	return (
		<button
			ref={btnRef}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isOpen}
			onClick={toggle}
			aria-controls='header-mobile-nav'
			class='header-burger'
		>
			<span
				class={`block absolute   transition-transform duration-300 ease-in-out ${
					isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
				}`}
			/>
			<span
				class={`block absolute  transition-opacity duration-200 ease-in-out ${
					isOpen ? 'opacity-0' : 'opacity-100'
				}`}
			/>
			<span
				class={`block absolute  transition-transform duration-300 ease-in-out ${
					isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
				}`}
			/>
		</button>
	)
}
