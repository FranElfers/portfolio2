import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import css from '../styles/Social.module.css';
import { RiGitRepositoryCommitsLine, RiGitRepositoryLine } from 'react-icons/ri';
import { HiOutlineClipboardCheck } from 'react-icons/hi';

type CurrentDetail = "github" | "linkedin" | "codewars" | "discord"

const GithubIcon: FunctionComponent = () => {
	return <></>
}

interface LinkType {
	href: string
	tag: CurrentDetail
	state: Dispatch<SetStateAction<CurrentDetail>>
}

const SocialLink: FunctionComponent<LinkType> = ({ href, tag, state }) => {
	return <button onClick={()=>state(tag)} >
		<Image src={`/${tag}.svg`} width={80} height={80} />
	</button>
}

const GithubLanguage: FunctionComponent<{lan:string}> = ({ lan = "none"}) => {
	const color = ({
		ts: "#2B7489",
		js: "#F1E05A",
		none: "#9c9c9c"
	})[lan]

	return <>
		<div className={css.gitCircle} style={{backgroundColor: color}}></div>
		<span style={{color: '#9c9c9c'}}>{lan}</span>
	</>
}

const GithubSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
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
		<div className={css.title}><RiGitRepositoryLine /> portfolio <GithubLanguage lan='ts' /></div>
		<p>New portfolio including ThreeJS</p>
		<div className={css.title}><RiGitRepositoryLine /> vigenere-cipher <GithubLanguage lan='js' /></div>
		<p>Classic Vigenère cipher (a cipher that incorporates the message of the text into the key).</p>
		<div className={css.title}><RiGitRepositoryLine /> github-get-contributions <GithubLanguage lan='js' /></div>
		<p>Get total git contributions of any user</p>
		<div className={css.title}><RiGitRepositoryLine /> benawad-reactinterview <GithubLanguage lan='js' /></div>
		<p>Clément Mihailescu code from Ben Awad React intermediate interview, but optimized by me.</p>
	</div>
</div>

const LinkedInSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
	<div>
		<img src="https://media-exp1.licdn.com/dms/image/C4E03AQFRqQ95K43RzA/profile-displayphoto-shrink_800_800/0/1583444261521?e=1658966400&v=beta&t=bjqaFa4e7GI5wBfaxT4XP91qnnOSBoaFgyjZzDQeFNM" alt="profile" />
		<div className={css.subtitle}><RiGitRepositoryCommitsLine />63</div>
		<p>contacts</p>
	</div>
	<div>
		<div className={css.title}>Tutor de ReactJS en Coderhouse.<br/>Técnico en informática.</div>
		<div className={css.title}><RiGitRepositoryLine />Licenses & certifications</div>
		<p>Coderhouse - ReactJS <br/>LinkedIn - Github<br/>LinkedIn - Github<br/>LinkedIn - JavaScript</p>
		<div className={css.title}><HiOutlineClipboardCheck />Skills</div>
		<p>CSS<br/>ReactJS<br/>NodeJS<br/>JavaScript<br/>Git<br/>HTML</p>
	</div>
</div>

const SocialDetail: FunctionComponent<{current:CurrentDetail}> = ({ current }) => {
	if (current === "linkedin") return <LinkedInSocialDetail />
	return <GithubSocialDetail />
}


const Social: FunctionComponent = () => {
	const [ current, setCurrent ] = useState<CurrentDetail>("github")
	return <div className={css.socialScreen}>
		<div className={css.grid}>
			<SocialLink state={setCurrent} href='https://github.com/franelfers/' tag='github' />
			<SocialLink state={setCurrent} href='https://linkedin.com/in/franciscoelfers' tag='linkedin' />
			<SocialLink state={setCurrent} href='https://www.codewars.com/users/FranElfers' tag='codewars' />
			<SocialLink state={setCurrent} href='about:blank' tag='discord' />
		</div>
		<SocialDetail current={current} />
	</div>
}

export default Social



