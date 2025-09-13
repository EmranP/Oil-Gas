import type { ChangeEvent } from 'preact/compat'
import { useState } from 'preact/hooks'

export const useInput = (initValue: string | number) => {
	const [value, setValue] = useState<string | number>(initValue)

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setValue(e.currentTarget.value)

	return { value, onChange }
}
