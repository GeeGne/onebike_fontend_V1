import {Link} from 'react-router-dom';

import '../../Styles/Components/Header/IntroSection.scss';
import shoppingCartLogo from '../../assets/Img/Icons/home_app.svg';
import facebook from '../../assets/Img/Icons/facebook.svg';
import instagram from '../../assets/Img/Icons/instagram.svg';
import whatsapp from '../../assets/Img/Icons/whatsapp.svg';

function IntroSection () {

  return (
    <>
      <section className="userinfo-container">
        {/* <Link to="/">
          <img className="logo" src={shoppingCartLogo}/>
        </Link> */}

        <a 
          className="userinfo-container__icons-a"
          href="https://www.facebook.com/profile.php?id=61555487381717"
          target="_blank" 
        >
          <img className="userinfo-container__icons-a__img" src={facebook}/>
        </a>
        <a 
          className="userinfo-container__icons-a"
          href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fonebike2024%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR0w6aYCDJGvMivgUz_w8X80es1HJ_7pw1C8SoFWz-dXSV82nzB7p2WBhAs_aem_AQCp6vp2WH18qga8n9Xxkms5Parh7WnW-XeJKJjRolLpd22rFmAbD-RJo2UXzvWxd3gtVnjnETyVbk07gc90-_DP&h=AT2F8y0fhas8_jET2eCAy7Ijb90oIl6CuhXOFH6ZtOF46Pg-dmqHcDn4oWQ2hfDfX4sl3XvMcwbQWEdxEczkVb4GH1K4OpTWHA7aO6gZaQFZIFUir_P-E0f3SObw7Gkakl0f" 
          target="_blank"
        >
          <img className="userinfo-container__icons-a__img" src={instagram}/>
        </a>
        <a 
          href="https://chat.whatsapp.com/BanGDxwaSLgKMBWN6eDVzq"
          className="userinfo-container__icons-a"
          target="_blank"
        >
          <img className="userinfo-container__icons-a__img" src={whatsapp}/>
        </a>
      </section>
    </>
  )
}

export default IntroSection;