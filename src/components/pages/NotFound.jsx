// HOOKS
import {Link} from "react-router-dom";
import {Helmet} from 'react-helmet-async';

// SCSS
import '/src/styles/components/pages/NotFound.scss';


function NotFound ({darkMode, lan}) {

  const pageURL = window.location.href;
  const siteName = "ONEBIKE";
  const pageTitle = "Page Not Found - ONEBIKE";
  const pageDescription = "The page you are looking for does not exist. Return to ONEBIKE to explore our range of bicycles and bicycle parts.";
  const pageKeywords = "ONEBIKE, 404, page not found, bicycle, bicycle parts, Syria";
  const en = lan === 'en';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageURL} />
        {/* <meta property="og:image" content="https://onebike-b622f.web.app/path/to/your/image.jpg" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
      </Helmet>
      <section className="notFound">
        <div className="notFound__404">404</div>
        <div className="notFound__not-found">{en ?'NOT FOUND' : 'غير موجود'}</div>
        <h2 className="notFound__h2">{en ? 'We couldn\'t find that page.' : 'لم نتمكن من العثور على تلك الصفحة.'}</h2>
        <p className="notFound__description">{en ? 'The address could be mistyped or the page have moved.' : 'قد يكون العنوان مكتوبًا بشكل خاطئ أو قد تكون الصفحة قد تم نقلها.'}</p>
        <p className="notFound__link-to-home">{en ? 'Try a new search on our' : 'حاول البحث من جديد على'} <Link to="/"><span>{en ? 'home page' : 'صفحتنا الرئيسية'}</span></Link></p>
      </section>
    </>
  )
}

export default NotFound;