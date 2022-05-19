import Link from "next/link"
import { FunctionComponent } from "react"
import styles from '../styles/Component.module.css'

const MenuItemDetail: FunctionComponent = (props) => {
	return <div className={styles.itemView}>
		<Link href="/" as="/">Back</Link>
		{props.children}
	</div>
}

export default MenuItemDetail