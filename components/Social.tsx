import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import css from '../styles/Social.module.css';
import { RiGitRepositoryCommitsLine, RiGitRepositoryLine, RiRecordCircleFill } from 'react-icons/ri';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { SiCodewars } from 'react-icons/si';
import { FaMedal } from 'react-icons/fa'
import { IconType } from "react-icons";

type CurrentDetail = "github" | "linkedin" | "codewars" | "discord"

interface LinkType {
	tag: CurrentDetail
	state: Dispatch<SetStateAction<CurrentDetail>>
}

const newTab = (url:string) => () => window.open(url, '_blank')

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

const RigthSection: FunctionComponent<{url?:string, Icon?:IconType, description?:string, title:string}> = ({ url, Icon, description, title }) => {
	if (url === undefined) {
		return (<section>
			<div>{Icon && <Icon />}{title}</div>
			{description && <p>{description}</p>}
		</section>)
	}

	return <section style={{ cursor: "pointer" }} onClick={newTab(url)}>
		<div>{Icon && <Icon />}{title}</div>
		{description && <p>{description}</p>}
	</section>
}

const RigthGitSection: FunctionComponent<{url?:string}> = ({ url, children }) => {
	return url === undefined
		? <section>{children}</section>
		: <section style={{ cursor: "pointer" }} onClick={() => window.open(url, '_blank')}>
		{children}
	</section>
}

const GithubSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
	<div className={css.left}>
		<img src="https://avatars.githubusercontent.com/u/39459727?v=4" alt="profile" onClick={newTab("https://github.com/franelfers")}/>
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
		<RigthGitSection url="https://github.com/FranElfers/portfolio2" >
			<div><RiGitRepositoryLine /> portfolio <GithubLanguage lan='ts' /></div>
			<p>New portfolio including ThreeJS</p>
		</RigthGitSection>
		<RigthGitSection url="https://github.com/FranElfers/vigenere-cipher">
			<div><RiGitRepositoryLine /> vigenere-cipher <GithubLanguage lan='js' /></div>
			<p>Classic Vigenère cipher (a cipher that incorporates the message of the text into the key).</p>
		</RigthGitSection>
		<RigthGitSection url="https://github.com/FranElfers/github-get-contributions">
			<div><RiGitRepositoryLine /> github-get-contributions <GithubLanguage lan='js' /></div>
			<p>Get total git contributions of any user</p>
		</RigthGitSection>
		<RigthGitSection url="https://github.com/FranElfers/benawad-reactinterview">
			<div><RiGitRepositoryLine /> benawad-reactinterview <GithubLanguage lan='js' /></div>
			<p>Clément Mihailescu code from Ben Awad React intermediate interview, but optimized by me.</p>
		</RigthGitSection>
	</div>
</div>

const LinkedInSocialDetail: FunctionComponent = () => <div className={css.socialDetail}>
	<div className={css.left}>
		<img src="https://media-exp1.licdn.com/dms/image/C4E03AQFRqQ95K43RzA/profile-displayphoto-shrink_800_800/0/1583444261521?e=1658966400&v=beta&t=bjqaFa4e7GI5wBfaxT4XP91qnnOSBoaFgyjZzDQeFNM" alt="profile" onClick={newTab("https://linkedin.com/in/franciscoelfers/")}/>
		<section>
			<div><RiRecordCircleFill fill="none" />63</div>
			<p>contacts</p>
		</section>
	</div>
	<div className={css.right}>
		<RigthSection title="Tutor de ReactJS en Coderhouse.\nTécnico en informática." />
		<RigthSection Icon={HiOutlineClipboardCheck} title="Licenses & certifications" description="Coderhouse - ReactJS <br/>LinkedIn - Github<br/>LinkedIn - Github<br/>LinkedIn - JavaScript" />
		<RigthSection Icon={HiOutlineClipboardCheck} title="Skills" description="CSS<br/>ReactJS<br/>NodeJS<br/>JavaScript<br/>Git<br/>HTML"/>
	</div>
</div>

const CodewarsSocialDetail: FunctionComponent = () => {
	const [ data, setData ] = useState<any>()

	useEffect(() => {
		fetch('https://purpose-tiger.herokuapp.com/codewars/FranElfers')
			.then(res => res.json())
			.then(setData)
	},[])


	if (data === undefined) return <p>loading</p>

	return <div className={css.socialDetail}>
		<div className={css.left}>
			<img src="https://avatars.githubusercontent.com/u/39459727?v=4" alt="profile" onClick={newTab("https://www.codewars.com/users/FranElfers")}/>
			<section>
				<div><SiCodewars />{data.ranks.overall.name}</div>
				<p>current rank</p>
			</section>
			<section>
				<div><SiCodewars />{data.honor}</div>
				<p>honor</p>
			</section>
		</div>
		<div className={css.right}>
			<section>
				<div><FaMedal />{data.codeChallenges.totalCompleted}</div>
				<p>Completed Kata</p>
			</section>
			<section>
				<div><FaMedal />{data.honorPercentile}</div>
				<p>Leaderboard percentile</p>
			</section>
			<section>
				<div><FaMedal />#{data.leaderboardPosition}</div>
				<p>Leaderboard position</p>
			</section>
			<section>
				<div><FaMedal />{data.rankCompletion}</div>
				<p>Rank completion until {parseInt(data.ranks.overall.name)-1}kyu</p>
			</section>
		</div>
	</div>
}

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



