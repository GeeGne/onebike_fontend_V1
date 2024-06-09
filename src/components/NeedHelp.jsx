// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/NeedHelp.scss';

// COMPONENTS
import Alert from './Alert';

// JSON
import oneBike from '/src/data/one-bike.json';

// UTILS
import strRemoveSpace from '/src/utils/strRemoveSpace.js';

// ICONS
import callIcon from '/assets/img/icons/call.svg';
import mailIcon from '/assets/img/icons/mail.svg';
import chatDotsIcon from '/assets/img/icons/chat_dots.svg';

// ICONS - DARKMODE
import callIconDarkMode from '/assets/img/icons/call_darkMode.svg';
import mailIconDarkMode from '/assets/img/icons/mail_darkMode.svg';
import chatDotsIconDarkMode from '/assets/img/icons/chat_dots_darkMode.svg';

function NeedHelp ({darkMode, lan}) {

  const [alertText, setAlertText] = useState(null);
  const [newAlert, setNewAlert] = useState(0);

  const handleClick = (type) => {
    let copiedMessage;
    let alertMessage ;
    
    if (type === 'phone') {
      copiedMessage = strRemoveSpace(oneBike.phone);
      alertMessage = lan === 'en' ? 'Number is copied to the clipboard successfully!' : 'لقد تم نسخ رقم الهاتف بنجاح!';
    }

    if (type === 'email') {
      copiedMessage = oneBike.email;
      alertMessage = lan === 'en' ? 'Email is copied to the clipboard successfully!' : 'لقد تم نسخ عنوان البريد الاكنروني بنجاح!';
    }
  
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copiedMessage).then(() => {
        setAlertText(alertMessage);
        setNewAlert(Math.random());
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = copiedMessage;
      textarea.style.position = 'fixed';  // Avoid scrolling to bottom
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        setAlertText(alertMessage);
        setNewAlert(Math.random());
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textarea);
    }
  }

  return (
    <div className="need-help-container">
      <Alert alertText={alertText} newAlert={newAlert}/>
      <section className="need-help-container__need-help">
        <h1 className="need-help-container__need-help__title">{lan === 'en' ? 'NEED HELP?' : 'اتحتاج للمساعده؟'}</h1>
        <h3 className="need-help-container__need-help__description">{lan === 'en' ? <>Whether you need assistance to pick the right equipment for your bicycle, or your're having an issue with your order, we at <span style={{fontWeight: 'bold'}}>ONE BIKE</span> and our amazing community are here to help.</> : <>ان اردت المساعده في اختيار المعدات المناسبه لدراجتك او ان كان لديك مشكله في عمليه الشحن, اعضاء <span style={{fontWeight: 'bold'}}>ون بايك</span> جاهزين للخدمه.</>}</h3>
      </section>
      <section className="need-help-container__call-us">
        <img className="need-help-container__call-us__img" src={darkMode ? callIconDarkMode : callIcon}/>
        <h2 className="need-help-container__call-us__title">{lan === 'en' ? 'Call us' : 'اتصل بنا'}</h2>
        <h3 className="need-help-container__call-us__description">{lan === 'en' ? 'We\'re mostly available from 10 AM to 5 PM' : 'نحن متواجدون من الساعه 10 صباحاالى 5 مساءا في معظم الاوقات.'}</h3>
        <button className="need-help-container__call-us__button" onClick={() => handleClick('phone')}>{lan === 'en' ? 'Copy Phone Number' : 'انسخ رقم الهاتف'}</button>
      </section>
      <section className="need-help-container__email-us">
        <img className="need-help-container__email-us__img" src={darkMode ? mailIconDarkMode : mailIcon}/>
        <h2 className="need-help-container__email-us__title">{lan === 'en' ? 'Send an Email' : 'ارسل بريدا الكترونيا'}</h2>
        <h3 className="need-help-container__email-us__description">{lan === 'en' ? 'We respond to emails within 48 hours of your support request.' : 'نحن نستجيب على طلبك خلال 48 ساعه كحد اقصى.'}</h3>
        <button className="need-help-container__email-us__button" onClick={() => handleClick('email')}>{lan === 'en' ? 'Copy Email' : 'انسخ عنوان بريدنا الاكتروني'}</button>
      </section>
      <section className="need-help-container__chat-with-us">
        <img className="need-help-container__chat-with-us__img" src={darkMode ? chatDotsIconDarkMode : chatDotsIcon}/>
        <h2 className="need-help-container__chat-with-us__title">{lan === 'en' ? 'Chat with us' : 'تواصل معنا'}</h2>
        <h3 className="need-help-container__chat-with-us__description">{lan === 'en' ? 'Our amazing community is always here to answer whatever question you have, feel free to post your question on the Group Chat!' : 'مجتمعنا الفريد من نوعه متواجد دائما للدعم على ايا استفسار لديك, قم بارسال سؤالك على مجموعه المحادثه!'}</h3>
        <a className="need-help-container__chat-with-us__a" href={oneBike.whatsApp} target="_blank">{lan === 'en' ? 'Join our Group Chat' : 'انضم الى مجموعه المحادثه'}</a>
      </section>
    </div>
  )
}

export default NeedHelp;