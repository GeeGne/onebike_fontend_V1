// COMPONENTS
import ImageSlider from '/src/components/ImageSlider';
import CategoryPicker from '/src/components/CategoryPicker';
import AdvertTile from '/src/components/AdvertTile';
import NewsLetter from '/src/components/NewsLetter';
import JoinWhatsAppGroup from '/src/components/JoinWhatsAppGroup';
import NeedHelp from '/src/components/NeedHelp';

// SCSS
import '/src/styles/components/pages/Home.scss';

function Home ({darkMode, lan}) {

  return (
    <div className="home-container">
      <ImageSlider />
      <CategoryPicker darkMode={darkMode} lan={lan} />
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'discount', name: {en: 'hot sales', ar: 'اخر التخفيضات'}}}/>
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'category', name: {en: 'accessories', ar: 'اكسسوارات'}}}/>
      <NewsLetter />
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'type', name: {en: 'lights', ar: 'اناره'}}}/>
      <JoinWhatsAppGroup />
      <NeedHelp darkMode={darkMode} lan={lan} />
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'category', name: {en: 'components', ar: 'قطع الدراجه'}}}/>
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'category', name: {en: 'tires-&-wheels', ar: 'كوشوك & اطار'}}}/>
    </div>
  )
}

export default Home;