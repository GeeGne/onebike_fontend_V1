// HOOKS
import {Link} from "react-router-dom";

// SCSS
import '/src/styles/components/pages/NotFound.scss';


function NotFound () {

  return (
    <section className="notFound-container">
      <div className="notFound-container__404">404</div>
      <div className="notFound-container__not-found">NOT FOUND</div>
      <h2 className="notFound-container__h2">We couldn't find that page.</h2>
      <p className="notFound-container__description">The address could be mistyped or the page have moved.</p>
      <p className="notFound-container__link-to-home">Try a new search on our <Link to="/"><span>home page</span></Link></p>
    </section>
  )
}

export default NotFound;