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

	return <div className={[styles.menuItem, styles.itemView].join(" ")} onClick={handleClick}>
		<props.icon/><h3>{props.title}</h3>
	</div>
}

export const MenuItemDetail: FunctionComponent<{item:ItemType}> = ({item}) => {
	return <div className={styles.itemView}>
		<h3><item.icon /> {item.title}<Link href="/" as="/">Volver</Link></h3>
		{item.component && <item.component />}
	</div>
}

export const MenuItems: FunctionComponent = () => {
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
			: <MenuItemDetail item={item} />
		}
	</div>
}

export default Menu