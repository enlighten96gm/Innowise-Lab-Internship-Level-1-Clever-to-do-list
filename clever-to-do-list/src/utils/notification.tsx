import React, { useEffect } from 'react';
import css from './notification.module.css';
import { NotificationTypeComponent } from './types';
const NotificationComponent: React.FC<NotificationTypeComponent> = ({
  errorToast,
  setErrorMessage,
}) => {
  const handleCloseButton = () => {
    setErrorMessage('');
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);
  return (
    <div className={css.main}>
      <div>
        <div className={css.error}>{errorToast}</div>
        <div onClick={handleCloseButton} className={css.close__btn}>
          Close
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
