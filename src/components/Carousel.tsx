import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { CarouselImages } from '@types'

interface CarouselProps {
	images: CarouselImages;
	options?: any;
}

export function Carousel({ images, options }: CarouselProps) {
	const emblaOptions = {
		loop: true,
		align: 'center',
		containScroll: 'trimSnaps',
		...options,
	  };

	const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<div className="embla relative overflow-hidden">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{images.map((image, idx) => (
						<div className="embla__slide flex-none w-full px-2" key={idx}>
							<img
								src={image.src}
								alt={image.alt}
								className="w-full rounded-xl shadow-lg mx-auto"
							/>
						</div>
					))}
				</div>
			</div>
			<button 
				className="embla__prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-black bg-opacity-80 p-2 rounded-full shadow-md z-10 hover:bg-opacity-100"
				onClick={scrollPrev}>
				Prev
			</button>
			<button 
				className="embla__next absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-black bg-opacity-80 p-2 rounded-full shadow-md z-10 hover:bg-opacity-100"
				onClick={scrollNext}>
				Next
			</button>
		</div>
	)
}
