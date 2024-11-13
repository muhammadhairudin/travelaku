import { Link } from 'react-router-dom';
import { Text } from '../../../components/atoms';
import { Icon } from '../../../components/atoms';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Karir', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kebijakan Privasi', href: '/privacy' }
    ],
    product: [
      { label: 'Aktivitas', href: '/activities' },
      { label: 'Promo', href: '/promos' },
      { label: 'Gift Card', href: '/gift-cards' },
      { label: 'Affiliate', href: '/affiliate' }
    ],
    support: [
      { label: 'Pusat Bantuan', href: '/help' },
      { label: 'Hubungi Kami', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Syarat & Ketentuan', href: '/terms' }
    ]
  };

  const socialLinks = [
    { icon: 'facebook', href: 'https://facebook.com' },
    { icon: 'twitter', href: 'https://twitter.com' },
    { icon: 'instagram', href: 'https://instagram.com' },
    { icon: 'youtube', href: 'https://youtube.com' }
  ];

  const contactInfo = {
    email: 'hello@travelaku.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat'
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section with Enhanced Logo */}
          <div>
            <Link to="/" className="inline-block mb-6 group">
              {/* Logo Container with 3D Effect */}
              <div className="relative transform transition-all duration-300 hover:scale-105">
                {/* Outer Circle with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full transform rotate-12 group-hover:rotate-0 transition-transform duration-300"></div>
                
                {/* Middle Circle with Glow */}
                <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full backdrop-blur-sm"></div>
                
                {/* Inner Content Container */}
                <div className="relative p-4">
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20">
                    {/* Logo Image with Shadow */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"></div>
                      <img 
                        src="/Logo.svg" 
                        alt="TravelAku" 
                        className="relative h-10 w-10 object-contain"
                      />
                    </div>
                    {/* Brand Text */}
                    <Text variant="h1" className="text-xl font-bold text-white">
                      TravelAku
                    </Text>
                  </div>
                </div>
              </div>
            </Link>
            <Text variant="body2" className="text-gray-400 mb-6">
              Jelajahi Indonesia dengan pengalaman yang tak terlupakan bersama TravelAku.
            </Text>
            {/* Social Links with Enhanced Hover Effects */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all transform hover:scale-110 duration-200 hover:shadow-glow"
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <Text variant="h6" className="mb-4 uppercase">
                {category}
              </Text>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <Text variant="h6" className="mb-4 uppercase">
              Kontak
            </Text>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="mail" size={16} />
                {contactInfo.email}
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="phone" size={16} />
                {contactInfo.phone}
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="mapPin" size={16} />
                {contactInfo.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Text variant="caption" className="text-center text-gray-400">
            © {currentYear} TravelAku. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 