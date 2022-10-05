import { Slide } from "react-slideshow-image"

import styles from './ProductSlideShow.module.css'
import 'react-slideshow-image/dist/styles.css'

interface ProductSlideShowProps {
    images: string[]
}

export const ProductSlideShow = ({ images }: ProductSlideShowProps) => {
  return (
    <Slide
        easing="ease"
        duration={ 700 }
        indicators
    >
        {images.map(img => {
            const url = `/products/${img}`;
            return (
                <div className={ styles['each-slide'] } key={ img }>
                    <div style={{
                        backgroundImage: `url(${ url })`,
                        backgroundSize: 'cover'
                    }}>

                    </div>
                </div>
            )
        })}
    </Slide>
  )
}