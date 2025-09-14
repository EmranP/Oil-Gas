import type { FC, PropsWithChildren } from 'preact/compat'

export const Container: FC<PropsWithChildren> = ({ children }) => {
	return <div className={'container'}>{children}</div>
}
