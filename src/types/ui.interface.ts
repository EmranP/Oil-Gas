import type { ChangeEvent, ReactNode } from 'preact/compat'
import type { navbarList } from '../constants/nav.constants'

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

type RawSectionId = (typeof navbarList)[number]['id']

type StripHash<T extends string> = T extends `#${infer R}` ? R : T

type TypeSectionId = StripHash<RawSectionId>

export interface IWrapperContentSectionProps {
	sectionId: TypeSectionId
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

export interface ISlidersItems {
	id: string
	title: string
	text: string
	img: string
}

export interface ISliders {
	slides: ISlidersItems[]
}
