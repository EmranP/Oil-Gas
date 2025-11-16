import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type FC,
} from 'preact/compat'
import type { ISliders } from '../types/ui.interface'

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))

export const ServiceSliders: FC<ISliders> = ({ slides }) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [progress, setProgress] = useState<number>(0)
	const [active, setActive] = useState<number>(0)
	const rafRef = useRef<number | null>(null)
	const slideHeightRef = useRef<number>(0)

	const reCalc = useCallback(() => {
		const container = containerRef.current
		if (!container) return

		// попытаемся взять реальную высоту слайда
		const firstSlide = container.querySelector('section')
		const itemHeight = firstSlide?.clientHeight || container.clientHeight
		slideHeightRef.current = itemHeight

		const scrollTop = container.scrollTop
		const max = Math.max(0, container.scrollHeight - container.clientHeight)
		const pct = max > 0 ? clamp(scrollTop / max) : 0

		// вычисление индекса
		const index = Math.round(scrollTop / (itemHeight || container.clientHeight))
		// обновляем состояние только при изменении — уменьшение ререндеров
		setProgress(prev => (Math.abs(prev - pct) < 1e-4 ? prev : pct))
		setActive(prev =>
			prev === index ? prev : clamp(index, 0, slides.length - 1)
		)
	}, [slides.length])

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		// оптимизированный обработчик скролла через rAF
		const onScroll = () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			rafRef.current = requestAnimationFrame(() => {
				const scrollTop = container.scrollTop
				const max = Math.max(0, container.scrollHeight - container.clientHeight)
				const pct = max > 0 ? clamp(scrollTop / max) : 0

				const itemHeight = slideHeightRef.current || container.clientHeight
				const index = Math.round(scrollTop / itemHeight)

				// только если изменилось — setState
				setProgress(prev => (Math.abs(prev - pct) < 1e-4 ? prev : pct))
				setActive(prev =>
					prev === index ? prev : clamp(index, 0, slides.length - 1)
				)
			})
		}

		container.addEventListener('scroll', onScroll, { passive: true })
		// initial calc
		reCalc()

		// ResizeObserver для пересчёта при ресайзе контента / окна
		let ro: ResizeObserver | null = null
		try {
			ro = new ResizeObserver(() => {
				reCalc()
			})
			ro.observe(container)
			// также наблюдаем первый слайд, если он есть
			const first = container.querySelector('section')
			if (first) ro.observe(first)
		} catch (e) {
			// браузеры без ResizeObserver — подпадём под window resize
			const onResize = () => reCalc()
			window.addEventListener('resize', onResize)
			// cleanup добавится ниже
		}

		return () => {
			container.removeEventListener('scroll', onScroll)
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			if (ro) {
				ro.disconnect()
			} else {
				window.removeEventListener('resize', reCalc)
			}
		}
	}, [reCalc])

	const goTo = useCallback(
		(index: number) => {
			const container = containerRef.current
			if (!container) return
			const target = clamp(index, 0, slides.length - 1)
			const itemHeight = slideHeightRef.current || container.clientHeight
			container.scrollTo({
				top: itemHeight * target,
				behavior: 'smooth',
			})
		},
		[slides.length]
	)

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowDown') goTo(active + 1)
			if (e.key === 'ArrowUp') goTo(active - 1)
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [active, goTo])

	const progressPercent = Math.round(progress * 100)

	return (
		<div class='relative w-full flex items-stretch '>
			{/* Контент слайдов — вертикальный viewport */}
			<div
				ref={containerRef}
				class='w-full h-[400px] overflow-y-auto scroll-smooth snap-y snap-mandatory '
				style={{ WebkitOverflowScrolling: 'touch' }}
				aria-roledescription='vertical carousel'
			>
				{slides.map((s, i) => (
					<section
						key={s.id}
						class='snap-start w-full h-[396px] sm:mb-6 mb-2 sm:max-h-[396px] gap-6 '
						style={{ minHeight: 'inherit' }}
						aria-hidden={active !== i}
					>
						{/* Изображение слева (на больших экранов можно показать) */}
						<div class='block flex-shrink-0 w-full h-full overflow-hidden relative '>
							{s.img ? (
								<img
									src={s.img}
									alt={s.title}
									loading={'lazy'}
									className='absolute top-0 left-0 w-full h-full object-cover object-center  sm:rounded-2xl'
								/>
							) : (
								<div class='w-full h-full bg-gray-800' />
							)}
							<div className={'flex gap-2 items-center'}>
								<div class='flex-1 relative z-20 px-4 mt-48'>
									<h2 class='text-[28px] font-semibold text-white mb-4'>
										{s.title}
									</h2>
									<p class='text-base text-white/90 leading-7 max-w-prose'>
										{s.text}
									</p>
								</div>
								{/* Справа: прогресс бар + нумерация */}
								<div class='flex-col items-center w-[72px] relative z-20'>
									{/* Номера (вертикально) */}
									<div class='flex flex-col gap-4 mb-6 text-sm select-none'>
										{slides.map((_, idx) => (
											<button
												key={idx}
												onClick={() => goTo(idx)}
												class={`w-10 text-right ${
													idx === active
														? 'text-white font-semibold'
														: 'text-white/50'
												}`}
												aria-label={`Go to slide ${idx + 1}`}
											>
												{String(idx + 1).padStart(2, '0')}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					</section>
				))}

				{/* Вертикальная линия прогресса */}
				{/* <div class='relative h-[240px] w-[6px] rounded-full bg-white/10 overflow-hidden'>
					<div
						class='absolute bottom-0 left-0 right-0 bg-white rounded-full'
						style={{
							height: `${progressPercent}%`,
							transition: 'height 150ms linear',
						}}
					/>
				</div> */}

				{/* Процент (опционально) */}
				{/* <div class='mt-4 text-xs text-white/60'>{progressPercent}%</div> */}
			</div>
		</div>
	)
}
