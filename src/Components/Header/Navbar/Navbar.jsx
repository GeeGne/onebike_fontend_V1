import HamMenu from './HamMenu';

import '../../../Styles/Components/Header/Navbar/Navbar.scss';

import logo from '../../../assets/Img/Logo/ONEBIKE.png';

function Navbar () {

  return (
    <>
      <nav className="nav-container">
        <button className="nav-container__hamburger"/>
        <img className="nav-container__logo" src={logo}/>
        <button className="nav-container__search"/>
        <button className="nav-container__shoppingCart"/>
      </nav>
      <HamMenu/>
    </>
    
  )
}

export default Navbar;