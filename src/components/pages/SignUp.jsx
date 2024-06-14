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

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    password: '',
    newsLetter: false,
    confirmedPassword: ''
  });

  const en = lan === 'en';
  const pageTitle = en ? 'CREATE ACCOUNT' : 'انشاء حساب';

  const formEL = useRef(null);
  const fNameLabelEL = useRef(null);
  const lNameLabelEL = useRef(null);
  const phoneLabelEL = useRef(null);
  const passLabelEL = useRef(null);
  const cPassLabelEL = useRef(null);

  const fNamePopupEL = useRef(null);
  const lNamePopupEL = useRef(null);  
  const phonePopupEL = useRef(null);  
  const passPopupEL = useRef(null);  
  const cPassPopupEL = useRef(null);  

  const fNameInputEL = useRef(null);

  const fNameEL = useRef(null);
  const lNameEL = useRef(null);
  const phoneEL = useRef(null);
  const passEL = useRef(null);
  const cPassEL = useRef(null);

  const navigate = useNavigate();

  const handleChange = e => {
    const {name, value, checked} = e.target;
    // name === 'newsLetter' && (value = e.target.checked);
    const isNewsLetter = name === 'newsLetter';
    console.log(name, value, checked);
    setFormData(prevData => ({...prevData, [name]: isNewsLetter ? checked : value}))
  }

  const handleSubmit = e => {
    e.preventDefault();
    validateInputs();
    console.log('submit', formData);
  }

  const validateInputs = () => {
    const validateFirstName = () => {
      const {fname} = formData;
      const re= /^[a-zA-Z]+$/;

      switch (false) {
        case fname !== '':
          return 'can\'t be blank';
          case re.test(fname):
            return 'must not contain Special Characters \'$%@..\' or Numbers'
        case fname.length > 2:
          return 'must be atleast 3 characters'
        case fname.length < 12:
          return 'must not exceed 12 characters'
        default:
          return true
      }
    }

    const validateLastName = () => {
      const {lname} = formData;
      const re= /^[a-zA-Z]+$/;

      switch (false) {
        case lname !== '':
          return 'can\'t be blank';
          case re.test(lname):
            return 'must not contain Special Characters \'$%@..\' or Numbers'
        case lname.length > 2:
          return 'must be atleast 3 characters'
        case lname.length < 12:
          return 'must not exceed 3 characters'
        default:
          return true
      }
    }

    const validatePhone = () => {
      const {phone} = formData;
      const re= /^[0-9]+$/;

      switch (false) {
        case phone !== '':
          return 'can\'t be blank';
          case re.test(phone):
            return 'must not contain Special Characters \'$%@..\' or Alphabets';
        case phone.length === 9:
          return 'wrong phone number';
        default:
          return true
      }
    }

    const validatePass = () => {
      const {password} = formData;
      const re= /^[a-zA-Z0-9]+$/;
      const re1= /^[a-zA-Z]+$/;
      const re2= /^[0-9]+$/;

      switch (false) {
        case password !== '':
          return 'can\'t be blank';
        case password.length > 7:
          return 'must be atleast 8 characters long';
        case (re1.test(password) || re2.test(password)):
          if (!re1.test(password)) {
            return 'must contain atleast one alphabet';
          } 
          if (!re2.test(password)) {
            return 'must contain atleast one number';
          };
        default:
          return true
      }
    }

    const validateCPass = () => {
      const {confirmedPassword, password} = formData;

      switch (false) {
        case confirmedPassword !== '':
          return 'can\'t be blank';
        case confirmedPassword === password:
          return 'unmatched password';
        default:
          return true
      }
    }

    if (typeof(validateFirstName()) === 'string') {
      fNamePopupEL.current.textContent = validateFirstName();
      fNameEL.current.classList.add('error');
      formEL.current.style.border = 'solid var(--red-color) 2px';
      return false;
    }

    if (typeof(validateLastName()) === 'string') {
      lNamePopupEL.current.textContent = validateLastName();
      lNameEL.current.classList.add('error');
      formEL.current.style.border = 'solid var(--red-color) 2px';
      return false;
    }

    if (typeof(validatePhone()) === 'string') {
      phonePopupEL.current.textContent = validatePhone();
      phoneEL.current.classList.add('error');
      formEL.current.style.border = 'solid var(--red-color) 2px';
      return false;
    }

    if (typeof(validatePass()) === 'string') {
      passPopupEL.current.textContent = validatePass();
      passEL.current.classList.add('error');
      formEL.current.style.border = 'solid var(--red-color) 2px';
      return false;
    }

    if (typeof(validateCPass()) === 'string') {
      cPassPopupEL.current.textContent = validateCPass();
      cPassEL.current.classList.add('error');
      formEL.current.style.border = 'solid var(--red-color) 2px';
      return false;
    }
  }

  const removeError = el => el.classList.remove('error');

  const handleFocus = e => {
    const {name} = e.target;
    formEL.current.style.border = 'solid var(--signUp-input-border-color) 2px';

    switch (name) {
      case 'fname':
        fNameEL.current.classList.remove('error');
        fNameEL.current.classList.add('onFocus');
        break;
      case 'lname':
        lNameEL.current.classList.remove('error');
        lNameEL.current.classList.add('onFocus');  
        break;
      case 'phone':
        phoneEL.current.classList.remove('error');
        phoneEL.current.classList.add('onFocus');  
        break;
      case 'password':
        passEL.current.classList.remove('error');
        passEL.current.classList.add('onFocus');
        break;
      case 'confirmedPassword':
        cPassEL.current.classList.remove('error');
        cPassEL.current.classList.add('onFocus');  
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
          fNameEL.current.classList.remove('onFocus');
          break;
        case 'lname':
          lNameEL.current.classList.remove('onFocus');
          break;
        case 'phone':
          phoneEL.current.classList.remove('onFocus');
          break;
        case 'password':
          passEL.current.classList.remove('onFocus');
          break;
        case 'confirmedPassword':
          cPassEL.current.classList.remove('onFocus');
          break;
        default:
          console.log('Unknown type:', type);
      }
    }
  }

  const path = el => el.dataset.path;

  const handleClick = e => {
    navigate(path(e.target))
    scroll({top: 0, behavior: 'smooth'});
  }

  return (
    <section className='signUp'>
      <Banner pageTitle={pageTitle}/>
      <form className='signUp__form' onSubmit={handleSubmit} ref={formEL}>
        <div className="signUp__form__intro">
          <div className="img"/>
          <h1>{en ? 'Start Your Cycling Journey' : 'ابدأ رحلتك في ركوب الدراجات'}</h1>
          <p>{en ? 'Let\'s get you set up!' : 'دعنا نقوم بإعدادك!'}</p>
        </div>
        <div className="signUp__form__fname" ref={fNameEL}>
          <label className="signUp__form__fname__label" htmlFor="fname" ref={fNameLabelEL}>{en ? 'FIRST NAME' : 'الاسم الاول'}</label>
          <input className="signUp__form__fname__input" type="text" name="fname" id="fname" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={fNameInputEL}/>
          <div className="signUp__form__fname__error-popup" onClick={() => removeError(fNameEL.current)} ref={fNamePopupEL} />
        </div>
        <div className='signUp__form__lname' ref={lNameEL}>
          <label htmlFor="lname" ref={lNameLabelEL}>{en ? 'LAST NAME' : 'الاسم الاخير'}</label>
          <input type="text" name="lname" id="lname" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          <div className="signUp__form__fname__error-popup" onClick={() => removeError(lNameEL.current)} ref={lNamePopupEL} />
        </div>
        <div className='signUp__form__phone' ref={phoneEL}>
          <label htmlFor="phone" ref={phoneLabelEL}>{en ? 'PHONE NUMBER' : 'رقم الهاتف'}</label>
          <input type="tel" name="phone" id="phone" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          <div className="signUp__form__phone__error-popup" onClick={() => removeError(phoneEL.current)} ref={phonePopupEL} />
        </div>
        <div className='signUp__form__password' ref={passEL}>
          <label htmlFor="password" ref={passLabelEL}>{en ? 'PASSWORD' : 'كلمه المرور'}</label>
          <input type="password" name="password" id="password" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          <div className="signUp__form__password__error-popup" onClick={() => removeError(passEL.current)} ref={passPopupEL} />
        </div>
        <div className='signUp__form__cpassword' ref={cPassEL}>
          <label htmlFor="cpassword" ref={cPassLabelEL}>{en ? 'CONFIRM PASSWORD' : 'تاكيد كلمه المرور'}</label>
          <input type="password" name="confirmedPassword" id="cpassword" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          <div className="signUp__form__password__error-popup" onClick={() => removeError(cPassEL.current)} ref={cPassPopupEL} />
        </div>
        <div className='signUp__form__newsletter'>
          <input className="checkbox-input" type="checkbox" name="newsLetter" id="newsLetter" onChange={handleChange}/>
          <label className="description" htmlFor="newsLetter">{en ? 'I agree recieving latest news and special deals emails according to the privacy policy' : 'أوافق على تلقي آخر الأخبار والعروض الخاصة عبر البريد الإلكتروني وفقًا لسياسة الخصوصية'}</label>
        </div>
        <button className='signUp__form__create' type="submit">{en ? 'CREATE' : 'انشئ'}</button>
      </form>
    </section>
  )
}

export default SignUp;