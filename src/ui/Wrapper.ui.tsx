import type { FC, PropsWithChildren } from 'preact/compat'
import type { IWrapperContentSectionProps } from '../types/ui.interface'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={'wrapper'}>
			{children}{' '}
			<img
				src='/assets/main/mg-top.png'
				alt='image'
				className={'wrapper-image-top'}
				loading={'eager'}
			/>
			<img
				src='/assets/main/mg.png'
				alt='picture'
				className={'wrapper-image'}
				loading={'eager'}
			/>
		</div>
	)
}

export const WrapperContent: FC<PropsWithChildren> = ({ children }) => {
	return <main className='wrapper-content'>{children}</main>
}

export const WrapperContentSection: FC<IWrapperContentSectionProps> = ({
	children,
	classStyle,
}) => {
	return (
		<section className={`section_content ${classStyle ?? ''}`}>
			{children}
		</section>
	)
}
