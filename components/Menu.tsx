import React, { FunctionComponent, MouseEventHandler } from 'react'
import styles from '../styles/Component.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { get, ItemType, list } from '../utils/items'

export const MenuItem: FunctionComponent<ItemType> = (props) => {
	const router = useRouter()

	const handleClick:MouseEventHandler = (e) => {
		e.preventDefault()
		router.push('/[dynamic]', props.url)
	}

	return <div className={styles.menuItem} onClick={handleClick}>
		<props.icon/>{props.title}
	</div>
}

export const MenuItemDetail: FunctionComponent<{item:ItemType}> = ({children,item}) => {
	return <>
		<Link href="/" as="/">Volver</Link>
		<h1><item.icon /> {item.title}</h1>
		{children}
	</>
}

export const MenuItems: FunctionComponent = (props) => {
	return <>
		{list.map(item => <MenuItem key={item.url} {...item} />)}
	</>
}

const Menu: FunctionComponent = () => {
	const router = useRouter()
	const route = router.query.dynamic
	const item = get('/' + route)

	return <div className={styles.menu}>
		{!route
			? <MenuItems />
			: <MenuItemDetail item={item}>
			</MenuItemDetail>
		}
	</div>
}

export default Menu