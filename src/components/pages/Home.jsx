// COMPONENTS
import ImageSlider from '../ImageSlider';
import NewsLetter from '../NewsLetter';
import JoinWhatsAppGroup from '../JoinWhatsAppGroup';
import NeedHelp from '../NeedHelp';

// SCSS
import '/src/styles/components/pages/Home.scss';

function Home ({darkMode, lan}) {

  return (
    <div className="home-container">
      <ImageSlider/>
      <NewsLetter/>
      <JoinWhatsAppGroup/>
      <NeedHelp darkMode={darkMode} lan={lan}/>
    </div>
  )
}

export default Home;