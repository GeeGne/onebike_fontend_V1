import React, {useState, useRef, useEffect} from 'react';

import HamMenu from './HamMenu';
import DropMenu from './DropMenu';

import '../../../Styles/Components/Header/Navbar/Navbar.scss';

import logo from '../../../assets/Img/Logo/ONEBIKE.png';
import searchIcon from '../../../assets/Img/Icons/search.svg';
import searchIconDarkMode from '../../../assets/Img/Icons/search_darkMode.svg';

function Navbar ({darkMode, language}) {

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const searchInputElement = useRef(null);

  // const mainListData = {
  //   english: [{
  //     mainList: 'Bikes',
  //     secondaryList: ['Road Bikes', 'Mountain Bikes', 'Hybird Bikes']
  //   },{
  //     mainList: 'Accessories',
  //     secondaryList: ['Flash lights', 'Horns', 'Wear', 'Stickers']
  //   },{
  //     mainList: 'Components',
  //     secondaryList: ['Handle Bar', 'Chain', 'Wheels', 'Frames', 'Forks']
  //   },{
  //     mainList: 'Clothing',
  //     secondaryList: ['Upper Body', 'Lower Body', 'Essentials', 'Helmets', 'Shoes']
  //   },{
  //     mainList: 'Helmets & Shoes',
  //     secondaryList: ['Handle Bar', 'Chain', 'Wheels', 'Frames', 'Forks']
  //   }],
  //   arabic: [{
  //     mainList: 'دراجات',
  //     secondaryList: ['سباقي', 'جبلي', 'هجين']
  //   },{
  //     mainList: 'اكسسوارات',
  //     secondaryList: ['سباقي', 'جبلي', 'هجين']
  //   },{
  //     mainList: 'قطع الدراجه',
  //     secondaryList: ['سباقي', 'جبلي', 'هجين']
  //   }]
  // }

  const mainListData = {
    english: [{
      id: 0,
      mainList: 'Bikes',
      secondaryList: [{
        id: 0,
        name:  'Bikes',
        thirdList: ['Road Bike', 'Mountain Bike', 'Hybird Bike', 'City Bike']
      },{
        id: 1,
        name:  'Top Bike Brands',
        thirdList: ['Giant', 'Trek', 'Scott', 'SantaCrus', 'Felt', 'Cannondale']
      }]
    },{
      id: 1,
      mainList: 'Accessories',
      secondaryList: [{
        id: 0,
        name: 'Most Popular',
        thirdList: ['Lights', 'Bags', 'Pumps', 'Trainers', 'Sunglasses']
      },{
        id: 1,
        name: 'Essentials',
        thirdList: ['Bike Locks', 'Body Creams', 'Bells & Horns', 'Bottles', 'Cages']
      },{
        id: 2,
        name: 'Tools, Racks, Lube',
        thirdList: ['Chain Lubricants', 'Cleaning Tools', 'Tools', 'Car Bike Racks', 'Storage & Display Stands']
      },{
        id: 3,
        name: 'Additonal',
        thirdList: ['Handlebar Mirros', 'Baskets', 'Child Seats', 'Bike Trailers']
      }]
    },{
      id: 2,
      mainList: 'Components',
      secondaryList: [{
        id: 0,
        name: 'Common Parts',
        thirdList: ['Pedals', 'Groupsets', 'Seats', 'Brakes & Parts', 'Power Meters']
      },{
        id: 1,
        name: 'Drive Train',
        thirdList: ['Cassettes', 'Chains', 'Derailleurs', 'Cranksets', 'Bottom Brackets']
      },{
        id: 2,
        name: 'Handlebars',
        thirdList: ['GearShifters & Cables', 'Grips', 'Bar Tape', 'Stems', 'Headsets & Spacers']
      },{
        id: 3,
        name: 'Popular Brands',
        thirdList: ['Shimano', 'SRAM', 'Campagnolo', 'Zipp', 'RockShox']
      }]
    },{
      id: 3,
      mainList: 'Clothing',
      secondaryList: [{
        id: 0,
        name: 'UpperBody',
        thirdList: ['Short SLeeve Jerseys', 'Long Sleeve Jerseys', 'Sleeveless Jerseys', 'Vests', 'Jackets']
      },{
        id: 1,
        name: 'Lower Body',
        thirdList: ['Shorts', 'Mountain Bike Shorts', 'Cycling Tights']
      },{
        id: 2,
        name: 'Essentials',
        thirdList: ['Gloves', 'Socks', 'Warmers & Base Layers', 'T-Shirts', 'Caps']
      },{
        id: 3,
        name: 'Popular Clothing Brands',
        thirdList: ['Endura', 'Fox', 'Castelli', '2XU']
      }]
    },{
      id: 4,
      mainList: 'Helmets & Shoes',
      secondaryList: [{
        id: 0,
        name: 'Shoe Accessories',
        thirdList: ['Cleats', 'Cleat Covers', 'Shoe Covers']
      },{
        id: 1,
        name: 'Popular Shoe Brands',
        thirdList: ['Shimano', 'Vittoria', 'Sidi', 'Giro']
      },{
        id: 2,
        name: 'Helmet Categories',
        thirdList: ['Road', 'Mountain Bike', 'Full Face']
      },{
        id: 3,
        name: 'Popular Helmet Brands',
        thirdList: ['Giro', 'Bell', 'Fox']
      }]
    }],
    arabic: [{
      id: 5,
      mainList: 'دراجات',
      secondaryList: [{
        id: 0,
        name: 'دراجات',
        thirdList: ['دراجه الجبلي', 'دراجه الطرق', 'دراجه الهجين']
      },{
        id: 1,
        name: 'اشهر ماركات للدراجات',
        thirdList: ['Giant', 'Treck', 'Scott', 'SantaCrus', 'Felt', 'Cannondale']
      }]
    },{
      id: 6,
      mainList: 'اكسسوارات',
      secondaryList: [{
        id: 0,
        name: 'اكثر طلبا',
        thirdList: ['اناره', 'حقائب', 'منافخ', 'ترينرز', 'نظارات شمسيه']
      },{
        id: 1,
        name: 'اساسيات',
        thirdList: ['قفل للدراجه', 'كريم للجسم', 'مزامير', 'مطره' , 'حماله مطره']
      },{
        id: 2,
        name: 'ادوات, شحم',
        thirdList: ['شحم للجنزير', 'معدات للتنضيف', 'معدات', 'قواعد تنصيب الدراجه للسياره', 'تخزين & عرض']
      },{
        id: 3,
        name: 'اضافي',
        thirdList: ['مرايا', 'سله', 'مقعد للاطفال', 'مقطورات الدراجه']
      }]
    },{
      id: 7,
      mainList: 'قطع الدراجه',
      secondaryList: [{
        id: 0,
        name: 'قطع الاكثر شيوعا',
        thirdList: ['دواسه', 'مجموعه القياده', 'مقعد', 'فرامل و اجزاءه', 'مقياس الطاقه']
      },{
        id: 1,
        name: 'قطع الحركه',
        thirdList: ['التروس الخلفيه و الاماميه', 'جنزير', 'صندوق المسننات', 'مجموعه الدفع الاماميه', 'القوالب الاماميه و الخلفيه']
      },{
        id: 2,
        name:  'مستلزمات الكيدون',
        thirdList: ['غيار الحركه & شرطان', 'مسكات', 'لفاف الكيدون', 'رقبات', 'مجموعه قطع الرقبه & تسميكات']
      }]
    },{
      id: 8,
      mainList: 'ملابس',
      secondaryList: [{
        id: 0,
        name: 'القسم العلوي',
        thirdList: ['جيرسي كم قصير', 'جيرسي كم طويل', 'جيرسي كم حفر', 'فيستس', 'جواكيت']
      },{
        id: 1,
        name: 'القسم السفلي',
        thirdList: ['شورتس', 'شورتس للدراجه الجبلي', 'مشدات رياضيه']
      },{
        id: 2,
        name: 'اساسيات',
        thirdList: ['كفوف', 'جرابات', 'داخلي', 'تشيرتات', 'طواقي']
      },{
        id: 3,
        name:  'ماركات ملابس مشهوره',
        thirdList: ['Endura', 'Fox', 'Castelli', '2XU']
      }]
    },{
      id: 9,
      mainList: 'خوذ & احذيه',
      secondaryList: [{
        id: 0,
        name: 'اكسسوارات الاحذيه',
        thirdList: ['مرابط', 'كفر المربط', 'كفر الحذاء']
      },{
        id: 1,
        name: 'ماركات احذيه مشهوره',
        thirdList: ['Shimano', 'Vittoria', 'Sidi', 'Giro']
      },{
        id: 2,
        name: 'اقسام الخوذ',
        thirdList: ['خوذ الطريق', 'خوذ الجبلي', 'الوجه كامل']
      },{
        id: 3,
        name: 'ماركات خوذ مشهوره',
        thirdList: ['Grio', 'Bell', 'Fox']
      }]
    }]
  }

  useEffect(() => {
    const handleResize = () => {
      const largeWidth = 1000;
      const webWidth = window.innerWidth;
      setSearch(webWidth >= largeWidth ? true : false)
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setMenu(oldMenu => !oldMenu)
  }

  const handleHover = type => {
    const largeWidth = 1000;
    const webWidth = window.innerWidth;
    setSearch(webWidth >= largeWidth ? true : type);
  }

  const handleMenuChange = (data) => {
    setMenu(data)
  }

  return (
    <>
      <nav className="nav-container">
        <button className="nav-container__hamburger" onClick={handleClick}/>
        <img className="nav-container__logo" src={logo}/>
        <div className={`nav-container__search-input${search ? ' hover' : ''}`}
          onMouseEnter={() => handleHover(true)} 
          onMouseLeave={() => handleHover(false)}
          ref={searchInputElement}
        >
          <input placeholder={language === 'English' ? 'Type something' : 'هل تبحث عن شيء؟'}/>
          <img src={darkMode ? searchIconDarkMode : searchIcon}/>
        </div>
        <button className="nav-container__search" 
          onMouseEnter={() => handleHover(true)} 
          onMouseLeave={() => handleHover(false)}
        />
        <button className="nav-container__user"/>
        <button className="nav-container__favourite"/>
        <button className="nav-container__shoppingCart"/>
      </nav>
      <DropMenu menu={menu} darkMode={darkMode} language={language} mainListData={mainListData}/>
      <HamMenu menu={menu} onChange={handleMenuChange} darkMode={darkMode} language={language} mainListData={mainListData}/>
      {/* <NavBottom/> */}
    </>
    
  )
}

export default Navbar;