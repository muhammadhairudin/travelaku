import { Text } from '../../../../components/atoms';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Text variant="h3" className="mb-4">TravelAku</Text>
            <Text variant="body2">
              Platform untuk menemukan dan memesan aktivitas wisata terbaik di Indonesia.
            </Text>
          </div>
          <div>
            <Text variant="h4" className="mb-4">Kontak</Text>
            <Text variant="body2">Email: info@travelaku.com</Text>
            <Text variant="body2">Phone: +62 812 3456 7890</Text>
          </div>
          <div>
            <Text variant="h4" className="mb-4">Ikuti Kami</Text>
            <div className="flex gap-4">
              <a href="#" className="hover:text-secondary">Instagram</a>
              <a href="#" className="hover:text-secondary">Facebook</a>
              <a href="#" className="hover:text-secondary">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <Text variant="caption">
            © {new Date().getFullYear()} TravelAku. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 