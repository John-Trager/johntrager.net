import React from 'react'
import type { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

import useEmblaCarousel from 'embla-carousel-react'
import type { CarouselImages } from '@types'

type PropType = {
  images: CarouselImages
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { images, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport p-2 shadow-md rounded" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, idx) => (
            <div className="embla__slide relative flex justify-center" key={idx}>
              <div className="relative h-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="embla__slide__number w-full h-full object-contain shadow-inner" />
                {image.alt !== '' && (
                  <figcaption
                    className="caption absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs px-2 py-1 text-center"
                  >
                    {image.alt}
                  </figcaption>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
