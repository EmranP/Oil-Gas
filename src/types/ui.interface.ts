import type { ChangeEvent, ReactNode } from 'preact/compat'

export interface IButton {
	title: string
}

export interface IArrowButton {
	title: string
	rotate: string
	textItems: string
	justifyItems: 'justify-baseline' | 'justify-end'
	icon: string
}

export interface IWrapperContentSectionProps {
	children: ReactNode
	classStyle?: string
}

export interface IInput {
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder: string
}

export interface ITextarea extends Omit<IInput, 'onChange'> {
	onInput: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
