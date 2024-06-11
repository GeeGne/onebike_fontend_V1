// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// COMPONENTS
import Banner from '/src/components/Banner';

// SCSS
import '/src/styles/components/pages/SignIn.scss';

function SignIn ({darkMode, lan}) {
  const en = lan === 'en';
  const pageTitle = en ? 'LOGIN' : 'تسجيل الدخول';

  return (
    <section className='signIn-container'>
      <Banner pageTitle={pageTitle}/>
      <form className='signIn-container__form'>
        <label htmlFor="number">PHONE NUMBER</label><br/>
        <input type="text" id="number"/><br/>
        <label htmlFor="password">PASSWORD</label><br/>
        <input type="text" id="password"/><br/>
        <button>SIGN IN</button>
      </form>
    </section>
  )
}

export default SignIn;