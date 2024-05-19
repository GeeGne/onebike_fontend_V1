// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '../Styles/Components/Footer.scss';

function Footer () {

  return (
    <div className="footer-grid">
      <section className="footer-container__section">
        <h3 className="footer-container__section-title">title</h3>
        <ul className="footer-container__section-list">
          <li className="footer-container__section-list__item">
            <Link className="footer-container__section-list__item__link"></Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Footer;