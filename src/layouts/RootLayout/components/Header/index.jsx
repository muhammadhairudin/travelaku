import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '../../../../components/atoms';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector(state => state.auth);

  // Jika user adalah admin, jangan tampilkan header user
  if (user?.role === 'admin') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} />
          </button>

          {/* Desktop Navigation */}
          <DesktopMenu />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <MobileMenu />}
      </nav>
    </header>
  );
};

export default Header;