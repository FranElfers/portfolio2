import Link from "next/link"
import { FunctionComponent } from "react"

const MenuItemDetail: FunctionComponent = (props) => {
	return <>
		<Link href="/" as="/">Volver</Link>
		{props.children}
	</>
}

export default MenuItemDetail