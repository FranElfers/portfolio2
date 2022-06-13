import { FunctionComponent } from "react";
import { IconType } from "react-icons";
import { MdConstruction, MdManageAccounts, MdOutline3P, MdOutlineBadge, MdPublic, MdVerified, MdWarning } from "react-icons/md";
import Feedback from "../components/Feedback";
import Resume from "../components/Resume";
import Skills from "../components/Skills";
import Social from "../components/Social"
import Tools from "../components/Tools"

export interface ItemType {
	title: string
	url: string
	icon: IconType
	component?: FunctionComponent
}


export const list: ItemType[] = [
	{
		icon: MdManageAccounts,
		url: '/skills',
		title: 'Skills',
		component: Skills
	},
	{
		icon: MdOutlineBadge,
		url: '/resume',
		title: 'Resume',
		component: Resume
	},
	{
		icon: MdVerified,
		url: '/achievements',
		title: 'Achievements'
	},
	{
		icon: MdPublic,
		url: '/social',
		title: 'Social',
		component: Social
	},
	{
		icon: MdConstruction,
		url: '/tools',
		title: 'Tools I created',
		component: Tools
	},
	{
		icon: MdOutline3P,
		url: '/feedback',
		title: 'Give me feedback',
		component: Feedback
	}
]

const notFound: ItemType = {
	icon: MdWarning,
	url: '/404',
	title: 'Not found'
}

export const get = (url:string) => list.find((item) => item.url === url) || notFound