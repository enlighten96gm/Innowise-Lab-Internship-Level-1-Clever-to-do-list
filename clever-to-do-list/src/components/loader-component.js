import React from 'react'
import css from '../css-modules/loader-component.module.css'

const LoaderComponent = () => {
    return (
        <div className={css.container__loader}>
            <img className={css.loader__image} src='https://www.publy.ru/wp-content/uploads/2015/11/mario.jpg' alt='#'/>
        </div>
    )
}

export default LoaderComponent