// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// COMPONENTS
import Banner from '/src/components/Banner';

// SCSS
import '/src/styles/components/pages/SignIn.scss';

function SignIn ({darkMode, lan}) {

  const en = lan === 'en';
  const pageTitle = en ? 'LOGIN' : 'تسجيل الدخول';
  const telLabelEL = useRef(null);
  const passLabelEL = useRef(null);

  const navigate = useNavigate();

  const handleFocus = e => {
    const {name} = e.target;

    switch (name) {
      case 'tel':
        telLabelEL.current.style.top = '0';
        telLabelEL.current.style.fontSize = 'var(--font-size-extraSmall)';
        telLabelEL.current.style.fontWeight = '500';
        telLabelEL.current.style.color = 'var(--primary-color)';
        break;
      case 'password':
        passLabelEL.current.style.top = '0';
        passLabelEL.current.style.fontSize = 'var(--font-size-extraSmall)';
        passLabelEL.current.style.fontWeight = '500';
        passLabelEL.current.style.color = 'var(--primary-color)';
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
        case 'tel':
          telLabelEL.current.style.top = '50%';
          telLabelEL.current.style.fontSize = 'var(--font-size-small)';
          telLabelEL.current.style.fontWeight = '600';
          telLabelEL.current.style.color = 'var(--signIn-label-font-color)';
          break;
        case 'password':
          passLabelEL.current.style.top = '50%';
          passLabelEL.current.style.fontSize = 'var(--font-size-small)';
          passLabelEL.current.style.fontWeight = '600';
          passLabelEL.current.style.color = 'var(--signIn-label-font-color)';
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

  return (
    <section className='signIn-container'>
      <Banner pageTitle={pageTitle}/>
      <form className='signIn-container__form'>
        <div className='signIn-container__form__tel'>
          <label htmlFor="tel" ref={telLabelEL}>{en ? 'PHONE NUMBER' : 'رقم الهاتف'}</label>
          <input type="tel" name="tel" id="tel" required onFocus={handleFocus} onBlur={handleBlur}/>
        </div>
        <div className='signIn-container__form__password'>
          <label htmlFor="password" ref={passLabelEL}>{en ? 'PASSWORD' : 'كلمه المرور'}</label>
          <input type="password" name="password" id="password" required onFocus={handleFocus} onBlur={handleBlur}/>
        </div>
        <a className="forgot-password" tabIndex="0">{en ? 'Forgot password?' : 'نسيت كلمه المرور؟'}</a>
        <button className='signIn' type="submit">{en ? 'SIGN IN' : 'سجل الدخول'}</button>
        <a className="new-costumer" tabIndex="0" data-path="/account/register" onClick={handleClick} onKeyDown={handleKeyDown}>{en ? 'Don\'t have an account? Join us!' : 'ليس لديك حساب؟ انضم الينا'}</a>
      </form>
    </section>
  )
}

export default SignIn;