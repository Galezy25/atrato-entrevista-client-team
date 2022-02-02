import logo from '../assets/ColorLogo.png';
import icon from '../assets/ColorIcon.png';

export const Logo = () => (
  <>
    <img className="hidden md:block h-11" src={logo} alt="logo" />
    <img className="block md:hidden h-11" src={icon} alt="icon" />
  </>
);
