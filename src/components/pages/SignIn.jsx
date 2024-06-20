// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from "/src/firebase/authSignUp";
import {signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
import handleAuthError from "/src/firebase/handleAuthError";

// COMPONENTS
import Banner from '/src/components/Banner';
import ProgressActivity from '/src/components/ProgressActivity';
import Alert from '/src/components/Alert';

// SCSS
import '/src/styles/components/pages/SignIn.scss';

// UTILS
import validate from '/src/utils/validate';

function SignIn ({darkMode, lan}) {

  const [processing, setProcessing] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [newAlert, setNewAlert] = useState(0);
  const [user, setUser] = useState(null);
  const [forgotPass, setForgotPass] = useState(false);
  const [formData, setFormData] =  useState({
    email: '',
    password: '',
  });

  const emailEL = useRef(null);
  const passEL = useRef(null);

  const emailPopupEL = useRef(null);
  const passPopupEL = useRef(null);

  const emailLabelEL = useRef(null);
  const passLabelEL = useRef(null);
  
  const en = lan === 'en';
  const pageTitle = forgotPass ? (en ? 'Reset your password' : 'إعادة تعيين كلمة المرور') : (en ? 'LOGIN' : 'تسجيل الدخول');
  const description = forgotPass ? (en ? 'We will send an email to reset your passowrd' : 'سنرسل بريدًا إلكترونيًا لإعادة تعيين كلمة المرور') : '';
  const navigate = useNavigate();

  useEffect(() => redirectAuthenticated(), [user]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const redirectAuthenticated = () => {
    const {pathname} = window.location;
    if (user && (pathname === '/account/login' || pathname === '/account/login/')) navigate('/account');
  }

  const handleSubmit = async e => {
    
    const signIn = async () => {
      const {email, password} = formData;
      try {
        await signInWithEmailAndPassword(auth, email, password)
        return true;
      } catch (err) {
        console.error(err);
        setAlertText(handleAuthError(err, en));
        setNewAlert(Math.random());
        return false;
      } 
    }

    const sendPassReset = async () => {
      const {email} = formData;
      try {
        const response = await sendPasswordResetEmail(auth, email)
        if (!response) throw new Error('email is invalid');
        setAlertText('Rest password email has been sent!');
        setNewAlert(Math.random());
        return true;
      } catch (err) {
        console.error(err);
        setAlertText(handleAuthError(err, en));
        setNewAlert(Math.random());
        return false;
      }
    }

    e.preventDefault();
    if (!validateInputs()) return;
    setProcessing(true);

    if (forgotPass) {
      const isOperationSucessful = await sendPassReset();
      if (isOperationSucessful) setForgotPass(prevVal => !prevVal) 
      setProcessing(false);
      return;
    }

    const isOperationSucessful = await signIn();
    setProcessing(false);
    scroll({top: 0, behavior: 'smooth'});
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  const handleFocus = e => {
    const {name} = e.target;

    switch (name) {
      case 'email':
        emailEL.current.classList.add('onFocus');
        emailEL.current.classList.remove('error');
        break;
      case 'password':
        passEL.current.classList.remove('error');
        passEL.current.classList.add('onFocus');
      break;
      default:
        console.log('Unknown type:', type);
    }
  }

  const handleBlur = e => {
    const {name} = e.target;
    const inputEmpty = e.target.value === '';

    if (inputEmpty) {
      switch (name) {
        case 'email':
          emailEL.current.classList.remove('onFocus');
          break;
        case 'password':
          passEL.current.classList.remove('onFocus');
          break;
        default:
          console.log('Unknown type:', type);
      }
    }
  }

  const handleClick = e => {
    navigate(path(e.target))
    scroll({top: 0, behavior: 'smooth'});
  }

  const handleKeyDown = e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  }

  const path = el => el.dataset.path;
  const removeError = el => el.classList.remove('error');

  const validateInputs = () => {

    const handleError = (errorMessage, popupEL, formChildEL) => {
      popupEL.textContent = errorMessage;
      formChildEL.classList.add('error');
      return false;      
    }

    const {email, password} = formData;

    if (forgotPass) {
      if (typeof(validate.login.email(email, en)) === 'string') return handleError(validate.login.email(email, en), emailPopupEL.current, emailEL.current);
    } else {
      if (typeof(validate.login.email(email, en)) === 'string') return handleError(validate.login.email(email, en), emailPopupEL.current, emailEL.current);
      if (typeof(validate.login.password(password, en)) === 'string') return handleError(validate.login.password(password, en), passPopupEL.current, passEL.current);
    }

    return true;
  }

  const handleProcessing = text => {
    switch (true) {
      case processing:
        return <ProgressActivity darkMode={darkMode} invert={true} />
      default:
        return text;
    }
  }


  return (
    <section className='signIn' onSubmit={handleSubmit}>
      <Alert alertText={alertText} newAlert={newAlert} />
      <Banner pageTitle={pageTitle} description={description}/>
      <form className='signIn__form'>
        <div className='signIn__form__email' ref={emailEL}>
          <label htmlFor="email" ref={emailLabelEL}>{en ? 'EMAIL' : 'البريد الالكتروني'}</label>
          <input type="text" name="email" id="email" autoComplete="true" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
          <div className="signIn__form__email__error-popup" onClick={() => removeError(emailEL.current)} ref={emailPopupEL} />
        </div>
        {!forgotPass && 
        <div className='signIn__form__password' ref={passEL}>
          <label htmlFor="password" ref={passLabelEL}>{en ? 'PASSWORD' : 'كلمه المرور'}</label>
          <input type="password" name="password" id="password" autoComplete="true" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
          <div className="signIn__form__password__error-popup" onClick={() => removeError(passEL.current)} ref={passPopupEL} />
        </div>}
        {!forgotPass && <button className="forgot-password" tabIndex="0" onClick={() => setForgotPass(prevVal => !prevVal)}>{en ? 'Forgot password?' : 'نسيت كلمه المرور؟'}</button>}
        <button className='signIn__form__submit' type="submit">{handleProcessing(en ? (forgotPass ? 'SUBMIT' : 'SIGN IN') : (forgotPass ? 'ارسال' : 'سجل الدخول'))}</button>
        {!forgotPass && <a className="new-costumer" tabIndex="0" data-path="/account/register" onClick={handleClick} onKeyDown={handleKeyDown}>{en ? 'Don\'t have an account? Join us!' : 'ليس لديك حساب؟ انضم الينا'}</a>}
        {forgotPass && <a className="cancel" tabIndex="0" onClick={() => setForgotPass(prevVal => !prevVal)} onKeyDown={handleKeyDown}>{en ? 'Cancel' : 'الغاء'}</a>}
      </form>
    </section>
  )
}

export default SignIn;