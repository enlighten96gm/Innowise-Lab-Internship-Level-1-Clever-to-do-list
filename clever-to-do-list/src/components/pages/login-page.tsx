import React from 'react';
import { NavLink } from 'react-router-dom';
import css from '../../css-modules/login-page.module.css';
import { CALENDAR_ROUTE, REGISTER_ROUTE } from '../../utils/routes';
import { LoginPageType } from '../../utils/types';

const LoginPage: React.FC<LoginPageType> = (props) => {
  const { LoginRegisterSwitcher, email, setEmail, password, setPassword, loginHandler } = props;
  return (
    <div className={css.main}>
      <div className={css.wrapper}>
        <div className={css.login__block}>
          <div className={css.login__block__text}>Username...</div>
          <input
            className={css.login__block__input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={css.password__block}>
          <div className={css.password__block__text}>Password...</div>
          <input
            className={css.password__block__input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={css.button__block}>
          <div onClick={loginHandler} className={css.button__block__Login}>
            <NavLink to={CALENDAR_ROUTE}>
              <span>Log in</span>
            </NavLink>
          </div>
          <div onClick={LoginRegisterSwitcher} className={css.button__block__Register}>
            <NavLink to={REGISTER_ROUTE}>Register?</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
