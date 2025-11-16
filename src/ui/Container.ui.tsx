import type { FC, PropsWithChildren } from 'preact/compat'

export const Container: FC<PropsWithChildren & { isMobile?: boolean }> = ({
	children,
	isMobile,
}) => {
	return (
		<div
			className={
				isMobile ? `max-w-[1462px] mx-auto sm:px-[15px] px-0` : 'container'
			}
		>
			{children}
		</div>
	)
}
