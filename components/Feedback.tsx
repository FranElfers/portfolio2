import { FunctionComponent, useRef } from "react"
import css from '../styles/Component.module.css'

const Feedback:FunctionComponent = () => {
	const nameField = useRef<HTMLInputElement>(null)
	const textField = useRef<HTMLTextAreaElement>(null)

	const submit = () => {
		if (!nameField.current || !textField.current) return
		if (!textField.current.value) return alert('Write an opinion')
		
		const feedback = {
			name: nameField.current.value,
			text: textField.current.value
		}
		// ship this feedback to my api
	}

	return <div className="el">
		<p>Name (optional)</p>
		<input type="text" maxLength={30} ref={nameField} />
		<p>Your opinion</p>
		<textarea ref={textField} ></textarea>
		<button className={css.formSubmit} onClick={submit}>Send</button>
	</div>
}

export default Feedback