// HOOKS
import {Helmet} from 'react-helmet-async';

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
  const pageURL = window.location.href;

  return (
    <div className="home-container">
      <Helmet>
        <title>ONEBIKE - E-commerce for Bicycles & Bicycle Parts in Syria</title>
        <meta name="description" content="Buy quality bicycles and bicycle parts online from ONEBIKE, Syria's leading e-commerce site for bikes and accessories." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ONEBIKE - Buy Quality Bicycles" />
        <meta property="og:description" content="Your one-stop shop for bicycles and parts in Syria." />
        {/* <meta property="og:image" content="/path/to/image.jpg" /> */}
        <meta property="og:url" content={pageURL} />
        <link rel="canonical" href={pageURL} />
      </Helmet>
      <ImageSlider />
      <CategoryPicker darkMode={darkMode} lan={lan} />
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'discount', name: {en: 'Hot sales', ar: 'اخر التخفيضات'}}}/>
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'category', name: {en: 'Accessories', ar: 'اكسسوارات'}}}/>
      <NewsLetter />
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'type', name: {en: 'Lights', ar: 'اناره'}}}/>
      <JoinWhatsAppGroup />
      <NeedHelp darkMode={darkMode} lan={lan} />
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'category', name: {en: 'Components', ar: 'قطع الدراجه'}}}/>
      <AdvertTile darkMode={darkMode} lan={lan} type={{categoryType: 'category', name: {en: 'Tires & Wheels', ar: 'كوشوك & اطار'}}}/>
    </div>
  )
}

export default Home;