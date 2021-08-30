const errorsHandler = (response, setErrorMessage) => {
  response.catch((err) => {
    switch (err.code) {
      case 'auth/email-already-in-use':
      case 'auth/invalid-email':
        setErrorMessage(err.message);
        break;
      case 'auth/weak-password':
        setErrorMessage(err.message);
        break;
      case 'auth/invalid-email':
      case 'auth/user-disabled':
      case 'auth/user-not-found':
        setErrorMessage(err.message);
        break;
      case 'auth/wrong-password':
        setErrorMessage(err.message);
        break;
      default:
        break;
    }
  });
};

export default errorsHandler;
