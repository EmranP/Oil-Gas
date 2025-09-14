import type { FC } from 'preact/compat'
import type { IArrowButton } from '../types/ui.interface'

export const ButtonArrow: FC<IArrowButton> = ({
	title,
	rotate,
	textItems,
	justifyItems,
	icon,
}) => {
	return (
		<div className={`flex items-center ${justifyItems} gap-[15px]`}>
			<span className={textItems}>{title ?? 'Read more'}</span>
			<img src={icon} alt={title} className={rotate} loading={'lazy'} />
		</div>
	)
}
