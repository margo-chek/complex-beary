import s from "./cottages.module.sass"

import {FC, useEffect, useState} from "react"

import {classNames} from "shared/lib/classNames/classNames"
import {Main} from "widgets"

interface CottagesProps {
	className?: string
}

export const Cottages: FC<CottagesProps> = (props) => {
	const [scrollPermitted, setScrollPermitted] = useState(false)
	const [open, setOpen] = useState(true)

	useEffect(() => {
		const permitScroll = () => {
			setScrollPermitted(true)
		}

		const preventScroll = (event: WheelEvent | TouchEvent) => {
			if (!scrollPermitted) {
				event.preventDefault()
				setOpen(false)
				setTimeout(permitScroll, 600)
			}
		}

		const handleTouchMove = (event: TouchEvent) => {
			preventScroll(event)
		}

		document.addEventListener("wheel", preventScroll, { passive: false })
		document.addEventListener("touchmove", handleTouchMove, { passive: false })

		return () => {
			document.removeEventListener("wheel", preventScroll)
			document.removeEventListener("touchmove", handleTouchMove)
		}
	}, [scrollPermitted])

	const {className = ""} = props

	return (
		<div className={classNames([s.cottages, className], {[s.open]: open})}>
			<Main/>
		</div>
	)
}
