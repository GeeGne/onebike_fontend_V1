// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// COMPONENTS
import Banner from '/src/components/Banner';

// SCSS
import '/src/styles/components/pages/SignUp.scss';

// ASSETS
import user from '/assets/img/icons/user.svg';
import person from '/assets/img/icons/person.svg';

// ASSETS - DARKMODE
import userDarkMode from '/assets/img/icons/user_darkMode.svg';
import personDarkMode from '/assets/img/icons/person_darkMode.svg';

function SignUp ({darkMode, lan}) {

  const en = lan === 'en';
  const pageTitle = en ? 'CREATE ACCOUNT' : 'انشاء حساب';
  const fNameLabelEL = useRef(null);
  const lNameLabelEL = useRef(null);
  const telLabelEL = useRef(null);
  const passLabelEL = useRef(null);
  const cPassLabelEL = useRef(null);

  const navigate = useNavigate();

  const handleFocus = e => {
    const {name} = e.target;

    switch (name) {
      case 'fname':
        fNameLabelEL.current.style.top = '0';
        fNameLabelEL.current.style.fontSize = 'var(--font-size-extraSmall)';
        fNameLabelEL.current.style.fontWeight = '500';
        fNameLabelEL.current.style.color = 'var(--primary-color)';
        break;
      case 'lname':
        lNameLabelEL.current.style.top = '0';
        lNameLabelEL.current.style.fontSize = 'var(--font-size-extraSmall)';
        lNameLabelEL.current.style.fontWeight = '500';
        lNameLabelEL.current.style.color = 'var(--primary-color)';
        break;
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
      case 'cpassword':
        cPassLabelEL.current.style.top = '0';
        cPassLabelEL.current.style.fontSize = 'var(--font-size-extraSmall)';
        cPassLabelEL.current.style.fontWeight = '500';
        cPassLabelEL.current.style.color = 'var(--primary-color)';
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
        case 'fname':
          fNameLabelEL.current.style.top = '50%';
          fNameLabelEL.current.style.fontSize = 'var(--font-size-small)';
          fNameLabelEL.current.style.fontWeight = '600';
          fNameLabelEL.current.style.color = 'var(--signUp-label-font-color)';
          break;
        case 'lname':
          lNameLabelEL.current.style.top = '50%';
          lNameLabelEL.current.style.fontSize = 'var(--font-size-small)';
          lNameLabelEL.current.style.fontWeight = '600';
          lNameLabelEL.current.style.color = 'var(--signUp-label-font-color)';
          break;
        case 'tel':
          telLabelEL.current.style.top = '50%';
          telLabelEL.current.style.fontSize = 'var(--font-size-small)';
          telLabelEL.current.style.fontWeight = '600';
          telLabelEL.current.style.color = 'var(--signUp-label-font-color)';
          break;
        case 'password':
          passLabelEL.current.style.top = '50%';
          passLabelEL.current.style.fontSize = 'var(--font-size-small)';
          passLabelEL.current.style.fontWeight = '600';
          passLabelEL.current.style.color = 'var(--signUp-label-font-color)';
          break;
        case 'cpassword':
          cPassLabelEL.current.style.top = '50%';
          cPassLabelEL.current.style.fontSize = 'var(--font-size-small)';
          cPassLabelEL.current.style.fontWeight = '600';
          cPassLabelEL.current.style.color = 'var(--signUp-label-font-color)';
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

  const path = el => el.dataset.path;

  return (
    <section className='signUp-container'>
      <Banner pageTitle={pageTitle}/>
      <form className='signUp-container__form'>
        <div className="signUp-container__form__intro">
          <div className="img"/>
          <h1>{en ? 'Start Your Cycling Journey' : 'ابدأ رحلتك في ركوب الدراجات'}</h1>
          <p>{en ? 'Let\'s get you set up!' : 'دعنا نقوم بإعدادك!'}</p>
        </div>
        <div className='signUp-container__form__fname'>
          <label htmlFor="fname" ref={fNameLabelEL}>{en ? 'FIRST NAME' : 'الاسم الاول'}</label>
          <input type="fname" name="fname" id="fname" required onFocus={handleFocus} onBlur={handleBlur}/>
        </div>
        <div className='signUp-container__form__lname'>
          <label htmlFor="lname" ref={lNameLabelEL}>{en ? 'LAST NAME' : 'الاسم الاخير'}</label>
          <input type="lname" name="lname" id="lname" required onFocus={handleFocus} onBlur={handleBlur}/>
        </div>
        <div className='signUp-container__form__tel'>
          <label htmlFor="tel" ref={telLabelEL}>{en ? 'PHONE NUMBER' : 'رقم الهاتف'}</label>
          <input type="tel" name="tel" id="tel" required onFocus={handleFocus} onBlur={handleBlur}/>
        </div>
        <div className='signUp-container__form__password'>
          <label htmlFor="password" ref={passLabelEL}>{en ? 'PASSWORD' : 'كلمه المرور'}</label>
          <input type="password" name="password" id="password" required onFocus={handleFocus} onBlur={handleBlur}/>
        </div>
        <div className='signUp-container__form__cpassword'>
          <label htmlFor="cpassword" ref={cPassLabelEL}>{en ? 'CONFIRM PASSWORD' : 'تاكيد كلمه المرور'}</label>
          <input type="cpassword" name="cpassword" id="cpassword" required onFocus={handleFocus} onBlur={handleBlur}/>
        </div>
        <div className='signUp-container__form__newsletter'>
          <input className="checkbox-input" type="checkbox" id="newsletter"/>
          <label className="description" htmlFor="newsletter">{en ? 'I agree recieving latest news and special deals emails according to the privacy policy' : 'أوافق على تلقي آخر الأخبار والعروض الخاصة عبر البريد الإلكتروني وفقًا لسياسة الخصوصية'}</label>
        </div>
        <button className='signUp-container__form__create' type="submit">{en ? 'CREATE' : 'انشئ'}</button>
      </form>
    </section>
  )
}

export default SignUp;