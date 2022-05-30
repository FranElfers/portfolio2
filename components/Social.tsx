import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import css from '../styles/Social.module.css';
import { RiGitRepositoryCommitsLine, RiGitRepositoryLine, RiRecordCircleFill } from 'react-icons/ri';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { SiCodewars } from 'react-icons/si';
import { FaMedal } from 'react-icons/fa'

type CurrentDetail = "github" | "linkedin" | "codewars" | "discord"

const GithubIcon: FunctionComponent = () => {
	return <></>
}

interface LinkType {
	tag: CurrentDetail
	state: Dispatch<SetStateAction<CurrentDetail>>
}

const SocialLink: FunctionComponent<LinkType> = ({ tag, state }) => {
	return <button onClick={()=>state(tag)}>
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
	return url === undefined
		? <section>{children}</section>
		: <section style={{ cursor: "pointer" }} onClick={() => window.open(url, '_blank')}>
		{children}
	</section>
}

const GithubSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
	<div className={css.left}>
		<img src="https://avatars.githubusercontent.com/u/39459727?v=4" alt="profile" onClick={() => window.open("https://github.com/franelfers", '_blank')}/>
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
		<img src="https://media-exp1.licdn.com/dms/image/C4E03AQFRqQ95K43RzA/profile-displayphoto-shrink_800_800/0/1583444261521?e=1658966400&v=beta&t=bjqaFa4e7GI5wBfaxT4XP91qnnOSBoaFgyjZzDQeFNM" alt="profile" onClick={() => window.open("https://linkedin.com/in/franciscoelfers/", '_blank')}/>
		<section>
			<div><RiRecordCircleFill fill="none" />63</div>
			<p>contacts</p>
		</section>
	</div>
	<div className={css.right}>
		<section>
			<div>Tutor de ReactJS en Coderhouse.<br/>Técnico en informática.</div>
		</section>
		<section>
			<div><HiOutlineClipboardCheck />Licenses & certifications</div>
			<p>Coderhouse - ReactJS <br/>LinkedIn - Github<br/>LinkedIn - Github<br/>LinkedIn - JavaScript</p>
		</section>
		<section>
			<div><HiOutlineClipboardCheck />Skills</div>
			<p>CSS<br/>ReactJS<br/>NodeJS<br/>JavaScript<br/>Git<br/>HTML</p>
		</section>
	</div>
</div>

const CodewarsSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
	<div className={css.left}>
		<img src="https://avatars.githubusercontent.com/u/39459727?v=4" alt="profile" onClick={() => window.open("https://www.codewars.com/users/FranElfers", '_blank')}/>
		<section>
			<div><SiCodewars />4 KYU</div>
			<p>current rank</p>
		</section>
		<section>
			<div><SiCodewars />500</div>
			<p>honor</p>
		</section>
	</div>
	<div className={css.right}>
		<section>
			<div><FaMedal />32</div>
			<p>Completed Kata. 1x3kyu, 4x4kyu, 9x5kyu</p>
		</section>
		<section>
			<div><FaMedal />17%</div>
			<p>Leaderboard percentile</p>
		</section>
		<section>
			<div><FaMedal />#69509</div>
			<p>Leaderboard position</p>
		</section>
		<section>
			<div><FaMedal />1.2%</div>
			<p>Rank completion until 3kyu</p>
		</section>
	</div>
</div>

const SocialDetail: FunctionComponent<{current:CurrentDetail}> = ({ current }) => {
	if (current === "linkedin") return <LinkedInSocialDetail />
	if (current === "codewars") return <CodewarsSocialDetail />
	return <GithubSocialDetail />
}


const Social: FunctionComponent = () => {
	const [ current, setCurrent ] = useState<CurrentDetail>("github")
	return <div className={css.socialScreen}>
		<div className={css.grid}>
			<SocialLink state={setCurrent} tag='github' />
			<SocialLink state={setCurrent} tag='linkedin' />
			<SocialLink state={setCurrent} tag='codewars' />
		</div>
		<br />
		<SocialDetail current={current} />
	</div>
}

export default Social



