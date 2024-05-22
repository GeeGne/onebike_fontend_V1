// COMPONENTS
import ImageSlider from '../ImageSlider';
import NewsLetter from '../NewsLetter';
import NeedHelp from '../NeedHelp';

// SCSS
import '/src/Styles/Components/Pages/Home.scss';

function Home ({darkMode, lan}) {

  return (
    <div className="home-container">
      <ImageSlider/>
      <NewsLetter/>
      <NeedHelp darkMode={darkMode} lan={lan}/>
    </div>
  )
}

export default Home;