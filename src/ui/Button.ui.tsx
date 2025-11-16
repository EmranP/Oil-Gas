import type { FC } from 'preact/compat'
import type { IButton } from '../types/ui.interface'

export const Button: FC<IButton> = ({ title }) => {
	return (
		<button
			className={
				'flex py-[15.708px] px-[36.25px] justify-center items-center rounded-[17.666px] bg_gradient-btn cursor-pointer font-bold sm:text-[22.082px] leading-norma sm:mx-0 mx-auto text-[15px] mb-14 sm:mb-0'
			}
		>
			{title}
		</button>
	)
}
