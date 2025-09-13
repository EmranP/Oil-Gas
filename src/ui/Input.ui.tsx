import type { FC } from 'preact/compat'
import type { IInput } from '../types/ui.interface'

export const Input: FC<IInput> = ({ value, placeholder, onChange }) => {
	return (
		<input
			className={
				'w-full pt-[13.71px] pb-[15.46px] rounded-[10px] border border-white backdrop-blur-[4.568749904632568px] placeholder:text-[#BCBCBC] placeholder:text-[18.275px] placeholder:leading-normal placeholder:font-normal text-[18.275px] text-white placeholder:text-center px-2.5 outline-0'
			}
			name={placeholder}
			value={value}
			placeholder={placeholder}
			required={true}
			onChange={onChange}
		/>
	)
}
