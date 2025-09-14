import type { FC } from 'preact/compat'
import type { ITextarea } from '../types/ui.interface'

export const Textarea: FC<ITextarea> = ({ value, placeholder, onInput }) => {
	return (
		<textarea
			className={
				'w-full rounded-[10px] border border-white backdrop-blur-[4.568749904632568px] placeholder:text-[#BCBCBC] placeholder:text-[18.275px] placeholder:leading-normal placeholder:font-normal text-[18.275px] text-white placeholder:text-center placeholder:pt-14 px-2.5 outline-0 resize-none p-3'
			}
			name={placeholder}
			value={value}
			onInput={onInput}
			required={true}
			placeholder={placeholder}
			rows={5}
		></textarea>
	)
}
