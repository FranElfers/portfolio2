import React, { FunctionComponent, MouseEventHandler } from 'react'
import styles from '../styles/Component.module.css'
import { MdOutlineBadge, MdManageAccounts, MdVerified, MdOutline3P, MdConstruction, MdPublic }  from 'react-icons/md'
import { IconType } from 'react-icons'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface MenuItemProps {
	title: string
	url: string
	icon: IconType
}

export const MenuItem: FunctionComponent<MenuItemProps> = (props) => {
	const router = useRouter()

	const handleClick:MouseEventHandler = (e) => {
		e.preventDefault()
		router.push('/[dynamic]', props.url)
	}

	return <div className={styles.menuItem} onClick={handleClick}>
		<props.icon/>{props.title}
	</div>
}

export const MenuItemDetail: FunctionComponent = (props) => {
	return <>
		<Link href="/" as="/">Volver</Link>
		{props.children}
	</>
}

export const MenuItems: FunctionComponent = (props) => {
	return <>
		<MenuItem icon={MdManageAccounts} title="Skills" url="/skills" />
		<MenuItem icon={MdOutlineBadge} title="Resume" url="/resume" />
		<MenuItem icon={MdVerified} title="Achievements" url="/achievements" />
		<MenuItem icon={MdPublic} title="Social" url="/social" />
		<MenuItem icon={MdConstruction} title="Tools I Created" url="/tools" />
		<MenuItem icon={MdOutline3P} title="Give me feedback" url="/feedback" />
	</>
}

const Menu: FunctionComponent = (props) => {
	return <div className={styles.menu}>
		{props.children}
	</div>
}

export default Menu