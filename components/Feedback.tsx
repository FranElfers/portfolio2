import { FunctionComponent } from "react"
import styles from '../styles/Component.module.css'

const Feedback: FunctionComponent = () => {
	return <>
		<p>Name (optional)</p>
		<input type="text" maxLength={30}/>
		<p>Your opinion</p>
		<textarea></textarea>
		<button className={styles.formSubmit}>Send</button>
	</>
}

export default Feedback