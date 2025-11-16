import type { FC, PropsWithChildren } from 'preact/compat'
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
	classStyle,
}) => {
	return (
		<section id={sectionId} className={`section_content ${classStyle ?? ''}`}>
			{children}
		</section>
	)
}
