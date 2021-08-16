import React, { useState } from 'react'
import css from '../css-modules/login-page.module.css'

const LoginPage = (props) => {
    const {
        LoginRegisterSwitcher,
        email,
        setEmail,
        password,
        setPassword,
        loginHandler,
        emailError,
        passwordError
    } = props
    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <div className={css.login__block}>
                    <div className={css.login__block__text}>Username...</div>
                    <input 
                        className={css.login__block__input} 
                        type='text' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <div className={css.error__message}>{emailError}</div>
                </div>
                <div className={css.password__block}>
                    <div className={css.password__block__text}>Password...</div>
                    <input 
                    className={css.password__block__input} 
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <div className={css.error__message}>{passwordError}</div>
                </div>
                <div className={css.button__block}>
                    <div onClick={loginHandler} className={css.button__block__Login}><span>Log in</span></div>
                    <div onClick={LoginRegisterSwitcher} className={css.button__block__Register}>Register?</div>
                </div>
            </div>    
        </div>
    )
}

export default LoginPage