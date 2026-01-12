import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center py-4 px-6 absolute top-0 left-0 z-50">
      <Link to="/" className="flex items-center">
        <img 
          src={logo} 
          alt="Brand Logo" 
          className="w-16 md:w-30 lg:w-40 h-auto object-contain" 
        />
      </Link>
    </nav>
  );
}