import s from "./imagesList.module.sass"

import {FC, useEffect, useState} from "react"

import {classNames} from "shared/lib/classNames/classNames"
import {LazyImage} from "shared/lazyImage/ui/LazyImage"

interface ImagesListProps {
    className?: string
	images: string[]
}

export const ImagesList: FC<ImagesListProps> = (props) => {
	const {className = "", images} = props

	const [currentImages, setCurrentImages] = useState<string[]>([])

	useEffect(() => {
		const shiftedImages = images
		shiftedImages.shift()

		setCurrentImages(shiftedImages)
	}, [])

	return (
		<div className = {classNames([s.imagesList, className])}>
			{currentImages.map((src) =>
				<LazyImage className={s.image} key={src} src={src}/>
			)}
		</div>
	)
}
