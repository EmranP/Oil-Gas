import type { FC } from 'preact/compat'
import { useInput } from '../hooks/useInput.hook'
import { Input } from './Input.ui'
import { Textarea } from './Textarea.ui'

export const ContactForm: FC = () => {
	const fullNameInput = useInput('')
	const emailInput = useInput('')
	const titleInput = useInput('')
	const messageInput = useInput('')
	return (
		<form action='' method='post' class='space-y-[24px]'>
			<Input
				value={fullNameInput.value}
				onChange={fullNameInput.onChange}
				placeholder='Full name'
			/>
			<Input
				value={emailInput.value}
				onChange={emailInput.onChange}
				placeholder='E-mail'
			/>
			<Input
				value={titleInput.value}
				onChange={titleInput.onChange}
				placeholder='Title'
			/>
			<Textarea
				value={messageInput.value}
				onInput={messageInput.onChange}
				placeholder='Your message'
			/>
			<button type={'submit'} className={'contact-btn'}>
				<span>SEND YOUR MESSAGE</span>
			</button>
		</form>
	)
}
