import { MdLaunch } from "react-icons/md";
import css from "../styles/Tools.module.css"

const Tools = () => {
	return <div className={css.toolsScreen}>
		<div className={css.tool}>
			<h4>Feedback</h4>
			<span>Expressjs, Redis</span>
			<p>App receiving feedback from my portfolio and storing it in a Redis database</p>
		</div>

		<div className={css.tool}>
			<h4><a href="https://github.com/franelfers/vigenere-cipher" target="_blank" rel="noreferrer">Vigenere Cipher <MdLaunch /></a></h4>
			<span>Nodejs</span>
			<p>Classic Vigenère cipher (a cipher that incorporates the message of the text into the key).</p>
		</div>

		<div className={css.tool}>
			<h4><a href="https://github.com/franelfers/github-get-contributions" target="_blank" rel="noreferrer">Get Contributions <MdLaunch /></a></h4>
			<span>Expressjs, Heroku</span>
			<p>Get total git contributions of any user</p>
		</div>
	</div>
}

export default Tools