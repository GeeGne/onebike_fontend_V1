// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/pages/products/EmptyList.scss'

// JSON
import descriptions from '/src/data/empty-list.json';
import oneBike from '/src/data/one-bike.json';

function EmptyList ({darkMode, lan, productCategoryEN, productCategory}) {
  const getCurrentDescription = descriptions.filter(description => productCategoryEN === description.keyword);

  return (
    <article className='empty-list-container'>
      {getCurrentDescription.map(description => 
      <div key={description.id}>
      <h1>{description.title[lan]}</h1>
      <p>{lan === 'en' ? 'Hey there, fellow rider!' : 'مرحباً أيها الراكب العزيز!'}</p>
      <p>{description.intro[lan]}</p>
      <h2>{lan === 'en' ? 'Stay tuned for updates:' : 'ابقَ على اطلاع بالتحديثات:'}</h2>
      {lan === 'en' ?
      <ul>
        <li><b>Follow us on <a href={oneBike.facebook} target="_blank">Facebook</a></b> for the latest arrivals and exclusive offers.</li>
        <li><b>Check out our <a href={oneBike.instagram} target="_blank">Instagram</a></b> for sneak peeks of what's coming.</li>
        <li><b>Join our newsletter </b>{`to be the first to know when the new ${productCategory} are in!`}</li>
      </ul>
        :
      <ul>
        <li><b>تابعنا على فيسبوك </b>تابعنا على فيسبوك لأحدث الإصدارات والعروض الحصرية.</li>
        <li><b>تفقد حسابنا على إنستغرام </b>تفقد حسابنا على إنستغرام للحصول على لمحات مسبقة عن ما هو قادم.</li>
        <li><b>اشترك في نشرتنا الإخبارية </b>{`اشترك في نشرتنا الإخبارية لتكون أول من يعلم عند وصول ${productCategory} الجديدة!`}</li>
      </ul>
      }
      <p>{description.outro[lan]}</p>
      <p>{lan === 'en' ? 'Happy riding and stay tuned!' : 'نتمنى لك ركوباً سعيداً وترقب الجديد!'}</p>
      <p>{lan === 'en' ? 'best,' : 'أطيب التحيات،'}</p>
      {lan === 'en' ? 
      <p>The <b>ONE BIKE</b> Team 🚴‍♂️💨</p> : 
      <p>فريق  <b>ONE BIKE</b> 🚴‍♂️💨</p>
      }
      </div>
      )}
    </article>
  )
}

export default EmptyList;