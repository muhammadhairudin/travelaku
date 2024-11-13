import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from '../../../../components/atoms';
import { SearchInput } from '../../../../components/molecules';

const HeroBanner = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/activities?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg" // Pastikan gambar tersedia di folder public/images
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <Text variant="h1" className="text-5xl font-bold mb-4 text-white">
          Jelajahi Keindahan Indonesia
        </Text>
        <Text variant="body1" className="text-xl mb-8 text-white/90 max-w-2xl">
          Temukan pengalaman wisata terbaik di seluruh penjuru nusantara
        </Text>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="flex gap-2">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari destinasi wisata..."
              className="flex-grow bg-white/90 backdrop-blur-sm"
            />
            <Button type="submit" variant="primary">
              Cari
            </Button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="mt-8 flex gap-4">
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white/20"
            onClick={() => navigate('/activities')}
          >
            Lihat Semua Aktivitas
          </Button>
          <Button 
            variant="outline"
            className="text-white border-white hover:bg-white/20"
            onClick={() => navigate('/promos')}
          >
            Promo Spesial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner; 