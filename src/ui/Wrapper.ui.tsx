import {
	useEffect,
	useRef,
	type FC,
	type PropsWithChildren,
} from 'preact/compat'
import type { IWrapperContentSectionProps } from '../types/ui.interface'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={'wrapper'}>
			{children}{' '}
			<img
				src='/assets/main/mg-top.png'
				alt='image'
				className={'sm:block hidden wrapper-image-top'}
				loading={'eager'}
			/>
			<img
				src='/assets/main/mg.png'
				alt='picture'
				className={'sm:block hidden wrapper-image'}
				loading={'eager'}
			/>
			<img
				src={'/assets/main/mg-mobile.png'}
				alt={'picture-mobile'}
				className={'sm:hidden block wrapper-image-mobile'}
				loading={'lazy'}
			/>
		</div>
	)
}

export const WrapperContent: FC<PropsWithChildren> = ({ children }) => {
	return <main className='wrapper-content'>{children}</main>
}

export const WrapperContentSection: FC<IWrapperContentSectionProps> = ({
	sectionId,
	children,
	classStyle = '',
	rootMargin = '0px 0px -60% 0px',
	threshold = 0,
	isAnimation = false,
}) => {
	const ref = useRef<HTMLElement | null>(null)

	useEffect(() => {
		// Эта часть запускается только в браузере
		if (!ref.current) return
		if (!isAnimation) return

		const el = ref.current

		// reduced motion
		const prefersReduced =
			typeof window !== 'undefined' &&
			window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches

		if (prefersReduced) {
			el.classList.add('is-visible')
			el.querySelectorAll<HTMLElement>('.reveal-child').forEach(
				ch => (ch.style.transitionDelay = '0ms')
			)
			return
		}

		const childrenList = Array.from(
			el.querySelectorAll<HTMLElement>('.reveal-child')
		)
		childrenList.forEach((child, idx) => {
			const delay = idx * 80
			child.style.transitionDelay = `${delay}ms`
			child.style.willChange = 'opacity, transform'
		})

		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach(entry => {
					if (!entry.isIntersecting) return

					const top = entry.boundingClientRect.top
					const vh = window.innerHeight || document.documentElement.clientHeight
					const triggerPoint = vh * 0.6 // 60% viewport

					if (top <= triggerPoint) {
						requestAnimationFrame(() => {
							el.classList.add('is-visible')
							obs.unobserve(el) // одноразово
						})
					}
				})
			},
			{ root: null, rootMargin, threshold }
		)

		observer.observe(el)

		return () => {
			observer.disconnect()
		}
	}, [isAnimation, rootMargin, threshold])

	return (
		<section
			ref={ref}
			id={sectionId}
			className={`section_content ${classStyle} ${isAnimation ? 'reveal' : ''}`}
		>
			{children}
		</section>
	)
}
