import React from 'react';
import { NavLink } from 'react-router-dom';
import css from '../../css-modules/register-page.module.css';
import { CALENDAR_ROUTE, LOGIN_ROUTE } from '../../utils/routes';

const RegisterPage = (props) => {
  const { LoginRegisterSwitcher, email, setEmail, password, setPassword, RegisterHandler } = props;

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
          <div onClick={RegisterHandler} className={css.button__block__Login}>
            <NavLink to={CALENDAR_ROUTE}>
              <span>Register</span>
            </NavLink>
          </div>
          <div onClick={LoginRegisterSwitcher} className={css.button__block__Register}>
            <NavLink to={LOGIN_ROUTE}>Log in?</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
