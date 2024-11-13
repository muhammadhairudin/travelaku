import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const StatCard = ({ title, value, icon, link, onClick }) => {
  const CardContent = () => (
    <div className="flex items-center justify-between">
      <div>
        <Text variant="label" className="text-gray-500 mb-1">
          {title}
        </Text>
        <Text variant="h3" className="text-2xl font-bold">
          {value}
        </Text>
      </div>
      <div className="text-primary opacity-20 text-3xl">
        {icon}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        <Card className="p-6 hover:bg-gray-50 transition-colors">
          <CardContent />
        </Card>
      </div>
    );
  }

  if (link) {
    return (
      <Link to={link}>
        <Card className="p-6 hover:bg-gray-50 transition-colors">
          <CardContent />
        </Card>
      </Link>
    );
  }

  return (
    <Card className="p-6">
      <CardContent />
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func
};

const StatisticsCards = ({ stats }) => {
  const navigate = useNavigate();

  const handleActivityClick = () => {
    navigate('/admin/activities', {
      state: { showDetails: true }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Total Aktivitas"
        value={stats.totalActivities}
        icon="🎯"
        onClick={handleActivityClick}
      />
      <StatCard
        title="Total Banner"
        value={stats.totalBanners}
        icon="🖼️"
        link="/admin/banners"
      />
      <StatCard
        title="Total Kategori"
        value={stats.totalCategories}
        icon="📑"
        link="/admin/categories"
      />
      <StatCard
        title="Total Promo"
        value={stats.totalPromos}
        icon="🎫"
        link="/admin/promos"
      />
      <StatCard
        title="Total User"
        value={stats.totalUsers}
        icon="👥"
        link="/admin/users"
      />
    </div>
  );
};

StatisticsCards.propTypes = {
  stats: PropTypes.shape({
    totalActivities: PropTypes.number.isRequired,
    totalBanners: PropTypes.number.isRequired,
    totalCategories: PropTypes.number.isRequired,
    totalPromos: PropTypes.number.isRequired,
    totalUsers: PropTypes.number.isRequired
  }).isRequired
};

export default StatisticsCards; 