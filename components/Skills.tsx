import { FunctionComponent } from "react"
import Image from "next/image"
import css from "../styles/Skills.module.css"

const Item: FunctionComponent<{url:string, name:string}> = ({url, name}) => {
	return <div className={css.item}>
		<img src={url} height={30} style={{maxWidth:'100%'}} />
		<p>{name}</p>
	</div>
}

const Skills: FunctionComponent = () => {
	return <div className={`el ${css.skillsScreen}`}>
		<h4>Langs</h4>
		<div className={css.list}>
			<Item url="/js.svg" name="Javascript"/> 
			<Item url="/ts.svg" name="Typescript" />
			<Item url="/html.svg" name="HTML" />
			<Item url="/css.svg" name="CSS"/>
			<Item url="/python.svg" name="Python" />
		</div>
		<h4>Front-end</h4>
		<div className={css.list}>
			<Item url="/react.svg" name="Reactjs"/>
			<Item url="/nextjs.svg" name="Nextjs"/>
			<Item url="/solidjs.svg" name="Solidjs"/>
			<Item url="/vuejs.svg" name="Vuejs"/>
			<Item url="/threejs.svg" name="Threejs"/>
		</div>
		<h4>Back-end</h4>
		<div className={css.list}>
			<Item url="/nodejs.svg" name="Nodejs" />
			<Item url="/expressjs.svg" name="Expressjs" />
			<Item url="/socketio.svg" name="Socket.io" />
			<Item url="/api.svg" name="RestAPI" />
		</div>
		<h4>Databases</h4>
		<div className={css.list}>
			<Item url="/firebase.svg" name="Firebase" />
			<Item url="/mongodb.svg" name="MongoDB" />
			<Item url="/redis.svg" name="Redis" />
		</div>
		<h4>Tools</h4>
		<div className={css.list}>
			<Item url="/git.svg" name="Git" />
			<Item url="/figma.svg" name="Figma" />
			<Item url="/docker.svg" name="Docker" />
		</div>
		<h4>Learning</h4>
		<div className={css.list}>
			<Item url="/rust.svg" name="Rust" />
		</div>
	</div>
}

export default Skills