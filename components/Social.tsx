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

const RigthSection: FunctionComponent<{url?:string}> = ({ url, children }) => {
	if (url === undefined) return <section>
		{children}
	</section>

	return <section style={{ cursor: "pointer" }} onClick={() => window.open(url, '_blank')}>
		{children}
	</section>
}

const GithubSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
	<div className={css.left}>
		<img src="https://avatars.githubusercontent.com/u/39459727?v=4" alt="profile" />
		<section>
			<div><RiGitRepositoryCommitsLine />195</div>
			<p>contributions last year</p>
		</section>
		<section>
			<div><RiGitRepositoryCommitsLine />358</div>
			<p>contributions total</p>
		</section>
		<section>
			<div><RiGitRepositoryCommitsLine />24</div>
			<p>repositories</p>
		</section>
	</div>
	<div className={css.right}>
		<RigthSection url="https://github.com/FranElfers/portfolio2">
			<div><RiGitRepositoryLine /> portfolio <GithubLanguage lan='ts' /></div>
			<p>New portfolio including ThreeJS</p>
		</RigthSection>
		<RigthSection url="https://github.com/FranElfers/vigenere-cipher">
			<div><RiGitRepositoryLine /> vigenere-cipher <GithubLanguage lan='js' /></div>
			<p>Classic Vigenère cipher (a cipher that incorporates the message of the text into the key).</p>
		</RigthSection>
		<RigthSection url="https://github.com/FranElfers/github-get-contributions">
			<div><RiGitRepositoryLine /> github-get-contributions <GithubLanguage lan='js' /></div>
			<p>Get total git contributions of any user</p>
		</RigthSection>
		<RigthSection url="https://github.com/FranElfers/benawad-reactinterview">
			<div><RiGitRepositoryLine /> benawad-reactinterview <GithubLanguage lan='js' /></div>
			<p>Clément Mihailescu code from Ben Awad React intermediate interview, but optimized by me.</p>
		</RigthSection>
	</div>
</div>

const LinkedInSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
	<div className={css.left}>
		<img src="https://media-exp1.licdn.com/dms/image/C4E03AQFRqQ95K43RzA/profile-displayphoto-shrink_800_800/0/1583444261521?e=1658966400&v=beta&t=bjqaFa4e7GI5wBfaxT4XP91qnnOSBoaFgyjZzDQeFNM" alt="profile" />
		<section>
			<div><RiGitRepositoryCommitsLine />63</div>
			<p>contacts</p>
		</section>
	</div>
	<div className={css.right}>
		<section>
			<div>Tutor de ReactJS en Coderhouse.<br/>Técnico en informática.</div>
		</section>
		<section>
			<div><RiGitRepositoryLine />Licenses & certifications</div>
			<p>Coderhouse - ReactJS <br/>LinkedIn - Github<br/>LinkedIn - Github<br/>LinkedIn - JavaScript</p>
		</section>
		<section>
			<div><HiOutlineClipboardCheck />Skills</div>
			<p>CSS<br/>ReactJS<br/>NodeJS<br/>JavaScript<br/>Git<br/>HTML</p>
		</section>
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



