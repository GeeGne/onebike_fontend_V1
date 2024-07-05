// HOOKS
import {Link} from "react-router-dom";

// SCSS
import '/src/styles/components/pages/NotFound.scss';


function NotFound ({darkMode, lan}) {

  const en = lan === 'en';

  return (
    <section className="notFound">
      <div className="notFound__404">404</div>
      <div className="notFound__not-found">{en ?'NOT FOUND' : 'غير موجود'}</div>
      <h2 className="notFound__h2">{en ? 'We couldn\'t find that page.' : 'لم نتمكن من العثور على تلك الصفحة.'}</h2>
      <p className="notFound__description">{en ? 'The address could be mistyped or the page have moved.' : 'قد يكون العنوان مكتوبًا بشكل خاطئ أو قد تكون الصفحة قد تم نقلها.'}</p>
      <p className="notFound__link-to-home">{en ? 'Try a new search on our' : 'حاول البحث من جديد على'} <Link to="/"><span>{en ? 'home page' : 'صفحتنا الرئيسية'}</span></Link></p>
    </section>
  )
}

export default NotFound;