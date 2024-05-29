// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/pages/products/EmptyList.scss'

// JSON
import descriptions from '/src/data/empty-list.json';

function EmptyList ({darkMode, lan, productCategoryEN, productCategory}) {

  const getCurrentDescription = descriptions.filter(description => productCategoryEN === description.keyword);
  console.log(getCurrentDescription);

  return (

     // <div className={`empty-list-container${productCategoryEN.includes('bike') ? '' : ' hide'}`}>
    //   { lan === 'en' ? 
    //   <>
    //   <h1>No Bikes Available</h1>
    //   <p>Hey there, fellow rider!</p>
    //   <p>We know you're eager to find the perfect bike to hit the road or trail. Unfortunately, our bike section is currently out of stock. But don't worry, our team is working hard to bring in new models that will get you back on two wheels in no time!</p>
    //   <h2>Stay tuned for updates:</h2>
    //   <ul>
    //     <li><b>Follow us on Facebook</b> for the latest arrivals and exclusive offers.</li>
    //     <li><b>Check out our Instagram</b>Check out our Instagram for sneak peeks of what's coming.</li>
    //     <li><b>Join our newsletter</b> to be the first to know when the new bikes are in!</li>
    //   </ul>
    //   <p>We appreciate your patience and can’t wait to help you find your dream bike. If you have any questions or need assistance, feel free to reach out to our friendly support team.</p>
    //   <p>Happy riding and stay tuned!</p>
    //   <p>best,</p>
    //   <p>The <b>ONE BIKE</b> Team 🚴‍♂️💨</p>
    //   </>
    //   :
    //   <>
    //   <h1>لا توجد دراجات متاحة</h1>
    //   <p>مرحباً أيها الراكب العزيز!</p>
    //   <p>نعلم أنك متحمس للعثور على الدراجة المثالية لتجوب الطرق أو المسارات. للأسف، قسم الدراجات لدينا حالياً غير متوفر. لكن لا تقلق، فريقنا يعمل بجد لإحضار موديلات جديدة تعيدك إلى الطريق على دراجتين في أقرب وقت!</p>
    //   <h2>ابقَ على اطلاع بالتحديثات:</h2>
    //   <ul>
    //     <li>تابعنا على فيسبوك لأحدث الإصدارات والعروض الحصرية.</li>
    //     <li>تفقد حسابنا على إنستغرام للحصول على لمحات مسبقة عن ما هو قادم.</li>
    //     <li>اشترك في نشرتنا الإخبارية لتكون أول من يعلم عند وصول الدراجات الجديدة!</li>
    //   </ul>
    //   <p>نقدر صبرك ونتطلع لمساعدتك في العثور على دراجتك المثالية. إذا كان لديك أي أسئلة أو تحتاج إلى مساعدة، لا تتردد في التواصل مع فريق الدعم الودود لدينا.</p>
    //   <p>نتمنى لك ركوباً سعيداً وترقب الجديد!</p>
    //   <p>أطيب التحيات،,</p>
    //   <p>فريق  <b>ONE BIKE</b> 🚴‍♂️💨</p>
    //   </>
    //   }
    // </div> 
    <article className="empty-list-container">
      {getCurrentDescription.map(description => 
      <div key={description.id}>
      <h1>{description.title[lan]}</h1>
      <p>{lan === 'en' ? 'Hey there, fellow rider!' : 'مرحباً أيها الراكب العزيز!'}</p>
      <p>{description.intro[lan]}</p>
      <h2>{lan === 'en' ? 'Stay tuned for updates:' : 'ابقَ على اطلاع بالتحديثات:'}</h2>
      {lan === 'en' ?
      <ul>
        <li><b>Follow us on Facebook</b> for the latest arrivals and exclusive offers.</li>
        <li><b>Check out our Instagram</b> for sneak peeks of what's coming.</li>
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