import Image from "next/image";
import { FunctionComponent } from "react";
import css from '../styles/Social.module.css'
import { RiGitRepositoryCommitsLine, RiGitRepositoryLine } from 'react-icons/ri'


const SocialLink: FunctionComponent<{href: string, src: string}> = ({ href, src }) => {
	return <a href={href} target='_blank'>
		<Image src={src} width={80} height={80} />
	</a>
}

const GithubLanguage: FunctionComponent<{lan:string}> = ({ lan = "none"}) => {
	const color = ({
		typescript: "#2B7489",
		javascript: "#F1E05A",
		none: "#9c9c9c"
	})[lan]

	return <>
		<div className={css.gitCircle} style={{backgroundColor: color}}></div>
		<span style={{color: '#9c9c9c'}}>{lan}</span>
	</>
}

const SocialDetail: FunctionComponent = () => {
	return <div className={css.socialDetail}>
		<div>
			<img src="https://avatars.githubusercontent.com/u/39459727?v=4" alt="profile" />
			<div className={css.subtitle}><RiGitRepositoryCommitsLine />195</div>
			<p>contributions last year</p>
			<div className={css.subtitle}><RiGitRepositoryCommitsLine />358</div>
			<p>contributions total</p>
			<div className={css.subtitle}><RiGitRepositoryCommitsLine />24</div>
			<p>repositories</p>
		</div>
		<div>
			<div className={css.title}><RiGitRepositoryLine /> portfolio <GithubLanguage lan='typescript' /></div>
			<p>New portfolio including ThreeJS</p>
			<div className={css.title}><RiGitRepositoryLine /> vigenere-cipher <GithubLanguage lan='javascript' /></div>
			<p>Classic Vigenère cipher (a cipher that incorporates the message of the text into the key).</p>
			<div className={css.title}><RiGitRepositoryLine /> github-get-contributions <GithubLanguage lan='javascript' /></div>
			<p>Get total git contributions of any user</p>
			<div className={css.title}><RiGitRepositoryLine /> benawad-reactinterview <GithubLanguage lan='javascript' /></div>
			<p>Clément Mihailescu code from Ben Awad React intermediate interview, but optimized by me.</p>
		</div>
	</div>
}

const Social: FunctionComponent = () => {
	return <div className={css.socialScreen}>
		<div className={css.grid}>
			<SocialLink href='https://github.com/franelfers/' src='/github.png' />
			<SocialLink href='https://linkedin.com/in/franciscoelfers' src='/linkedin.svg' />
			<SocialLink href='https://www.codewars.com/users/FranElfers' src='/codewars.svg' />
			<SocialLink href='about:blank' src='/discord.svg' />
		</div>
		<SocialDetail />
	</div>
}

export default Social