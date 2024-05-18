// COMPONENTS
import ImageSlider from '../ImageSlider';
import NewsLetter from '../NewsLetter';

// SCSS
import '/src/Styles/Components/Pages/Home.scss';

function Home () {

  return (
    <div className="home-container">
      <ImageSlider/>
      <NewsLetter/>
    </div>
  )
}

export default Home;