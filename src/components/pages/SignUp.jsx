// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from "/src/firebase/authSignUp";
import {createUserWithEmailAndPassword, onAuthStateChanged, updateProfile} from "firebase/auth";
import handleAuthError from "/src/firebase/handleAuthError";

// COMPONENTS
import Banner from '/src/components/Banner';
import ProgressActivity from '/src/components/ProgressActivity';
import Alert from '/src/components/Alert';

// SCSS
import '/src/styles/components/pages/SignUp.scss';

// ASSETS
// import user from '/assets/img/icons/user.svg';
import person from '/assets/img/icons/person.svg';

// ASSETS - DARKMODE
import userDarkMode from '/assets/img/icons/user_darkMode.svg';
import personDarkMode from '/assets/img/icons/person_darkMode.svg';

function SignUp ({darkMode, lan}) {

  const [processing, setProcessing] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [newAlert, setNewAlert] = useState(0);
  const [user, setUser] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    newsLetter: false,
    confirmedPassword: '',
  });

  const en = lan === 'en';
  const pageTitle = en ? 'CREATE ACCOUNT' : 'انشاء حساب';

  const formEL = useRef(null);
  const fNameLabelEL = useRef(null);
  const lNameLabelEL = useRef(null);
  const emailLabelEL = useRef(null);
  const phoneLabelEL = useRef(null);
  const passLabelEL = useRef(null);
  const cPassLabelEL = useRef(null);

  const fNameInputEL = useRef(null);
  const lNameInputEL = useRef(null);
  const emailInputEL = useRef(null);
  const phoneInputEL = useRef(null);
  const passInputEL = useRef(null);
  const cPassInputEL = useRef(null);

  const fNamePopupEL = useRef(null);
  const lNamePopupEL = useRef(null);  
  const emailPopupEL = useRef(null);  
  const phonePopupEL = useRef(null);  
  const passPopupEL = useRef(null);  
  const cPassPopupEL = useRef(null);  

  const fNameEL = useRef(null);
  const lNameEL = useRef(null);
  const emailEL = useRef(null);
  const phoneEL = useRef(null);
  const passEL = useRef(null);
  const cPassEL = useRef(null);

  const createButtonEL = useRef(null);
  const navigate = useNavigate();

  useEffect(() => redirectAuthenticated(), [user]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const redirectAuthenticated = () => {
    const {pathname} = window.location;
    if (user && (pathname === '/account/register' || pathname === '/account/register/')) navigate('/account');
  }

  const handleChange = e => {
    const {name, value, checked} = e.target;
    const isNewsLetter = name === 'newsLetter';
    setFormData(prevData => ({...prevData, [name]: isNewsLetter ? checked : value}))
  }

  const handleSubmit = async e => {

    const removeErrorPopup = () => {
      fNameEL.current.classList.remove('error');
      lNameEL.current.classList.remove('error');
      phoneEL.current.classList.remove('error');
      passEL.current.classList.remove('error');
      cPassEL.current.classList.remove('error');
    }

    e.preventDefault();
    removeErrorPopup();
    if (validateInputs()) {
      setProcessing(true);
      const isOperationSucesssful = await signUpWithEmailAndPass();
      if (isOperationSucesssful) {
        await submitForm();
        setProcessing(false);
        scroll({top: 0, behavior: 'smooth'});
      } else {
        setProcessing(false);
        formEL.current.style.border = 'solid var(--red-color) 2px';
      }
    }
  }

  const signUpWithEmailAndPass = async () => {
    const {email, password} = formData;
    try {
      const userCredintial = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredintial.user;
      return true;
    } catch (error) {
      console.error(error);
      setAlertText(handleAuthError(error, en));
      setNewAlert(Math.random());
      return false;
    }
  }

  const submitForm = async () => {
    const {fname, lname, phone, newsLetter} = formData
    try {
      updateProfile(auth.currentUser, {
        displayName: fname + ' ' + lname
      })
    } catch (err) {
      console.error(err);
    }
  }
  
  const validateInputs = () => {
    const validateFirstName = () => {
      const {fname} = formData;
      const re= /^[a-zA-Z\u0600-\u06FF]+$/;

      switch (false) {
        case fname !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !fname.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';  
        case re.test(fname):
          return en ? 'must not contain Special Characters \'$%@..\' or Numbers' : 'يجب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام'
        case fname.length > 2:
          return en ? 'must be at least 3 characters' : 'يجب أن يكون على الأقل 3 أحرف';
        case fname.length < 12:
          return en ? 'must not exceed 12 characters' : 'يجب ألا يتجاوز 12 حرفً';
        default:
          return true
      }
    }

    const validateLastName = () => {
      const {lname} = formData;
      const re= /^[a-zA-Z\u0600-\u06FF]+$/;

      switch (false) {
        case lname !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !lname.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';  
        case re.test(lname):
          return en ? 'must not contain Special Characters \'$%@..\' or Numbers' : 'يجب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام'
        case lname.length > 2:
          return en ? 'must be at least 3 characters' : 'يجب أن يكون على الأقل 3 أحرف';
        case lname.length < 12:
          return en ? 'must not exceed 12 characters' : 'يجب ألا يتجاوز 12 حرفً';
        default:
          return true
      }
    }

    const validateEmail = () => {
      const {email} = formData;
      const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      switch (false) {
        case email !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !email.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';  
        case re.test(email):
            return en ? 'wrong email ex: example@email.com' : 'بريد الكتروني غير صحيح مثال: example@email.com'
        default:
          return true
      }
    }

    const validatePhone = () => {
      const {phone} = formData;
      const re= /^[0-9+]+$/;
      const re1= /^\+963/;

      switch (false) {
        case phone !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !phone.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';
        case re1.test(phone):
          return en ? 'wrong phone number ex: +963936534080' : 'رقم هاتف خاطئ مثال: +963936534080';
        case phone.length === 13:
          return en ? 'wrong phone number ex: +963936534080' : 'رقم هاتف خاطئ مثال: +963936534080';
        default:
          return true
      }
    }

    const validatePass = () => {
      const {password} = formData;
      const re= /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      const re1= /^[a-zA-Z]+$/;
      const re2= /^[0-9]+$/;

      switch (false) {
        case password !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case !password.includes(' '):
          return en ? 'must not contain Spaces' : 'يجب أن لا يحتوي على مسافات';
        case password.length > 7:
          return en ? 'must be at least 8 characters' : 'يجب أن يكون على الأقل 8 أحرف';
        case (re.test(password)):
          if (!re1.test(password)) {
            return en ? 'must contain at least one alphabet': 'يجب أن يحتوي على حرف واحد على الأقل';
          } 
          if (!re2.test(password)) {
            return en ? 'must contain at least one number' : 'يجب أن يحتوي على رقم واحد على الأقل';
          };
        default:
          return true
      }
    }

    const validateCPass = () => {
      const {confirmedPassword, password} = formData;

      switch (false) {
        case confirmedPassword !== '':
          return en ? 'can\'t be blank' : 'لا يمكن أن يكون فارغًا';
        case confirmedPassword === password:
          return en ? 'unmatched password': 'كلمة المرور غير مطابقة';
        default:
          return true
      }
    }

    const handleError = (errorMessage, popupEL, formChildEL) => {
      popupEL.textContent = errorMessage;
      formChildEL.classList.add('error');
      formEL.current.style.border = 'solid var(--red-color) 2px';
      return false;      
    }

    if (typeof(validateFirstName()) === 'string') return handleError(validateFirstName(), fNamePopupEL.current, fNameEL.current);
    if (typeof(validateLastName()) === 'string') return handleError(validateLastName(), lNamePopupEL.current, lNameEL.current);
    if (typeof(validateEmail()) === 'string') return handleError(validateEmail(), emailPopupEL.current, emailEL.current);
    if (typeof(validatePhone()) === 'string') return handleError(validatePhone(), phonePopupEL.current, phoneEL.current);
    if (typeof(validatePass()) === 'string') return handleError(validatePass(), passPopupEL.current, passEL.current);
    if (typeof(validateCPass()) === 'string') return handleError(validateCPass(), cPassPopupEL.current, cPassEL.current);

    return true;
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
      case 'email':
        emailEL.current.classList.remove('error');
        emailEL.current.classList.add('onFocus');  
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
      case 'vcode':
        vCodeEL.current.classList.remove('error');
        vCodeEL.current.classList.add('onFocus');  
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
        case 'email':
          emailEL.current.classList.remove('onFocus');
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
        case 'vcode':
          vCodeEL.current.classList.remove('onFocus');
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

  const handleProcessing = text => {
    switch (true) {
      case processing:
        return <ProgressActivity darkMode={darkMode} invert={true} />
      default:
        return text;
    }
  }

  return (
    <section className='signUp'>
      <Alert alertText={alertText} newAlert={newAlert} />
      <Banner pageTitle={pageTitle} description={''}/>
      <form className='signUp__form' acceptCharset="UTF-8" onSubmit={handleSubmit} ref={formEL} autoComplete="on">
        <div className="signUp__form__intro">
          <div className="img"/>
          <h1>{en ? 'Start Your Cycling Journey' : 'ابدأ رحلتك في ركوب الدراجات'}</h1>
          <p>{en ? 'Let\'s get you set up!' : 'دعنا نقوم بإعدادك!'}</p>
        </div>
        <div className="signUp__form__fname" ref={fNameEL}>
          <label className="signUp__form__fname__label" htmlFor="fname" ref={fNameLabelEL}>{en ? 'FIRST NAME' : 'الاسم الاول'}</label>
          <input className="signUp__form__fname__input" type="text" name="fname" id="fname" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={fNameInputEL} />
          <div className="signUp__form__fname__error-popup" onClick={() => removeError(fNameEL.current)} ref={fNamePopupEL} />
        </div>
        <div className='signUp__form__lname' ref={lNameEL}>
          <label htmlFor="lname" ref={lNameLabelEL}>{en ? 'LAST NAME' : 'الاسم الاخير'}</label>
          <input type="text" name="lname" id="lname" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={lNameInputEL}/>
          <div className="signUp__form__fname__error-popup" onClick={() => removeError(lNameEL.current)} ref={lNamePopupEL} />
        </div>
        <div className='signUp__form__email' ref={emailEL}>
          <label htmlFor="email" ref={emailLabelEL}>{en ? 'EMAIL' : 'البريد الالكتروني'}</label>
          <input type="text" name="email" id="email" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={emailInputEL}/>
          <div className="signUp__form__email__error-popup" onClick={() => removeError(emailEL.current)} ref={emailPopupEL} />
        </div>
        <div className='signUp__form__phone' ref={phoneEL}>
          <label htmlFor="phone" ref={phoneLabelEL}>{en ? 'PHONE NUMBER' : 'رقم الهاتف'}</label>
          <input type="text" name="phone" id="phone" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={phoneInputEL}/>
          <div className="signUp__form__phone__error-popup" onClick={() => removeError(phoneEL.current)} ref={phonePopupEL} />
        </div>
        <div className='signUp__form__password' ref={passEL}>
          <label htmlFor="password" ref={passLabelEL}>{en ? 'PASSWORD' : 'كلمه المرور'}</label>
          <input type="password" name="password" id="password" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}ref={passInputEL}/>
          <div className="signUp__form__password__error-popup" onClick={() => removeError(passEL.current)} ref={passPopupEL} />
        </div>
        <div className='signUp__form__cpassword' ref={cPassEL}>
          <label htmlFor="cpassword" ref={cPassLabelEL}>{en ? 'CONFIRM PASSWORD' : 'تاكيد كلمه المرور'}</label>
          <input type="password" name="confirmedPassword" id="cpassword" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={cPassInputEL}/>
          <div className="signUp__form__password__error-popup" onClick={() => removeError(cPassEL.current)} ref={cPassPopupEL} />
        </div>
        <div className='signUp__form__newsletter'>
          <input className="checkbox-input" type="checkbox" name="newsLetter" id="newsLetter" autoComplete="true" onChange={handleChange} readOnly/>
          <label className="description" htmlFor="newsLetter">{en ? 'I agree recieving latest news and special deals emails according to the privacy policy' : 'أوافق على تلقي آخر الأخبار والعروض الخاصة عبر البريد الإلكتروني وفقًا لسياسة الخصوصية'}</label>
        </div>
        <button className='signUp__form__create' type="submit" ref={createButtonEL}>{handleProcessing(en ? 'CREATE' : 'انشئ')}</button>
      </form>
    </section>
  )
}

export default SignUp;