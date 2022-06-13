import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { RiGitRepositoryCommitsLine, RiGitRepositoryLine, RiRecordCircleFill } from 'react-icons/ri';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { SiCodewars } from 'react-icons/si';
import { FaMedal } from 'react-icons/fa'
import { IconType } from "react-icons";
import css from '../styles/Social.module.css';

type CurrentDetail = "github" | "linkedin" | "codewars" | "discord"

const newTab = (url:string) => () => window.open(url, '_blank')

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
		: <section style={{ cursor: "pointer" }} onClick={newTab(url)}>
			{children}
		</section>
}

type Segment = { Icon:IconType, title:string|number, desc:string }

const LeftSection: FunctionComponent<{src:string, url:string, segments: Segment[]}> = ({ src, url, segments }) => {
	return <div className={css.left}>
		<img src={src} alt="profile" onClick={newTab(url)}/>
		{segments.map(segment => <section key={segment.desc}>
			<div><segment.Icon />{segment.title}</div>
			<p>{segment.desc}</p>
		</section>)}
	</div>
}

const GithubSocialDetail: FunctionComponent = () => {
	const segments:Segment[] = [
		{ Icon: RiGitRepositoryCommitsLine, title: 195, desc: "contributions last year" },
		{ Icon: RiGitRepositoryCommitsLine, title: 358, desc: "contributions total" },
		{ Icon: RiGitRepositoryCommitsLine, title: 24, desc: "repositories" }
	]

	return <div className={css.socialDetail}>
		<LeftSection src="https://avatars.githubusercontent.com/u/39459727?v=4" url="https://github.com/franelfers" segments={segments} />
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
}

const LinkedInSocialDetail: FunctionComponent = () => {
	const segments:Segment[] = [
		{ Icon: RiRecordCircleFill, title: 63, desc: "contacts" }
	]

	return <div className={css.socialDetail}>
		<LeftSection src="https://media-exp1.licdn.com/dms/image/C4E03AQFRqQ95K43RzA/profile-displayphoto-shrink_800_800/0/1583444261521?e=1658966400&v=beta&t=bjqaFa4e7GI5wBfaxT4XP91qnnOSBoaFgyjZzDQeFNM" url="https://linkedin.com/in/franciscoelfers/" segments={segments} />

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
}

const CodewarsSocialDetail: FunctionComponent = () => {
	const [ data, setData ] = useState<any>()
	const segments:Segment[] = [
		{ Icon: SiCodewars, title: data?.ranks.overall.name, desc: "current rank" },
		{ Icon: SiCodewars, title: data?.honor, desc: "honor" }
	]
	
	useEffect(() => {
		fetch('https://purpose-tiger.herokuapp.com/codewars/FranElfers')
			.then(res => res.json())
			.then(setData)
	},[])


	if (data === undefined) return <p>loading</p>

	return <div className={css.socialDetail}>
		<LeftSection src="https://avatars.githubusercontent.com/u/39459727?v=4" url="https://www.codewars.com/users/FranElfers" segments={segments} />
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