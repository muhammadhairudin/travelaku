import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivityDetail, deleteActivity } from '../../../store/slices/activitySlice';
import { addToCart } from '../../../store/slices/cartSlice';
import { Button, Text } from '../../../components/atoms';
import { ErrorAlert } from '../../../components/molecules';
import ImageGallery from './components/ImageGallery';
import ActivityInfo from './components/ActivityInfo';
import LoadingPage from '../../../components/common/LoadingPage';

const ActivityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { activity, loading: activityLoading } = useSelector((state) => state.activity);
  const { loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loadingState, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const isAdmin = user?.role === 'admin';

  const formatPrice = (price) => {
    if (!price) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchActivityDetail(id));
    }
  }, [dispatch, id]);

  const handleBookNow = async () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: `/activities/${id}`,
          message: 'Silakan login untuk melakukan pemesanan'
        } 
      });
      return;
    }

    try {
      setBookingError(null);
      await dispatch(addToCart(id)).unwrap();
      navigate('/cart');
    } catch (error) {
      console.error('Add to cart error:', error);
      setBookingError({
        message: 'Gagal menambahkan ke keranjang',
        details: error || 'Silakan coba lagi nanti'
      });
    }
  };

  const handleEdit = () => {
    navigate(`/admin/activities/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus aktivitas ini?')) {
      try {
        await dispatch(deleteActivity(id)).unwrap();
        navigate('/admin/activities');
      } catch (error) {
        console.error('Delete activity error:', error);
      }
    }
  };

  if (activityLoading || loadingState) {
    return <LoadingPage />;
  }

  if (cartError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-500">
          <h2 className="mb-2 text-xl font-bold">Error</h2>
          <p>{cartError}</p>
          <Button 
            variant="primary"
            onClick={() => dispatch(fetchActivityDetail(id))}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!activity) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Gallery */}
      <div className="bg-white border-b">
        <div className="container px-4 py-8 mx-auto">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                  <img
                    src={activity.imageUrls?.[selectedImageIndex]}
                    alt={activity.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                {activity.imageUrls?.length > 1 && (
                  <div className="flex overflow-x-auto gap-2 pb-2">
                    {activity.imageUrls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 
                          ${selectedImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                      >
                        <img
                          src={url}
                          alt={`${activity.title} ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Activity Info */}
              <div className="space-y-6">
                <div>
                  <Text variant="caption" className="font-medium text-primary">
                    {activity.category?.name}
                  </Text>
                  <Text variant="h1" className="mt-1 text-3xl font-bold">
                    {activity.title}
                  </Text>
                  <Text variant="body1" className="mt-2 text-gray-600">
                    {activity.city}, {activity.province}
                  </Text>
                </div>

                <div className="flex gap-4 items-center py-4 border-y">
                  <div className="flex gap-1 items-center">
                    <span className="text-yellow-500">★</span>
                    <Text variant="h3" className="font-bold">
                      {activity.rating}
                    </Text>
                  </div>
                  <Text variant="body2" className="text-gray-500">
                    ({activity.total_reviews} reviews)
                  </Text>
                </div>

                {/* Booking Section */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  {bookingError && (
                    <div className="mb-4">
                      <ErrorAlert
                        message={bookingError.message}
                        details={bookingError.details}
                        onRetry={() => {
                          setBookingError(null);
                          handleBookNow();
                        }}
                      />
                    </div>
                  )}

                  <div className="flex gap-2 items-baseline mb-2">
                    <Text variant="h2" className="text-2xl font-bold">
                      {formatPrice(activity.price_discount || activity.price)}
                    </Text>
                    {activity.price_discount && (
                      <Text variant="body2" className="text-gray-500 line-through">
                        {formatPrice(activity.price)}
                      </Text>
                    )}
                  </div>
                  
                  <Text variant="caption" className="text-gray-600">
                    per person
                  </Text>

                  {isAdmin ? (
                    // Admin Actions
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="primary" 
                        className="flex-1"
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="error" 
                        className="flex-1"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    // User Actions
                    <Button 
                      variant="primary" 
                      className="mt-4 w-full"
                      onClick={handleBookNow}
                      disabled={cartLoading}
                    >
                      {cartLoading ? 'Memproses...' : isAuthenticated ? 'Book Now' : 'Login to Book'}
                    </Button>
                  )}
                  
                  {!isAuthenticated && !isAdmin && (
                    <Text variant="caption" className="mt-2 text-center text-gray-500">
                      Please login to make a booking
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container px-4 py-12 mx-auto">
        <div className="mx-auto space-y-12 max-w-4xl">
          {/* Description */}
          <section>
            <Text variant="h2" className="mb-6 text-2xl font-bold">
              About This Activity
            </Text>
            <Text variant="body1" className="text-gray-700 whitespace-pre-line">
              {activity.description}
            </Text>
          </section>

          {/* Facilities */}
          <section>
            <Text variant="h2" className="mb-6 text-2xl font-bold">
              Facilities
            </Text>
            <div 
              className="max-w-none prose prose-lg"
              dangerouslySetInnerHTML={{ __html: activity.facilities }} 
            />
          </section>

          {/* Location Section */}
          <section className="overflow-hidden bg-white rounded-lg shadow-sm">
            <Text variant="h2" className="p-6 text-2xl font-bold border-b">
              Location
            </Text>
            
            <div className="p-6">
              <Text variant="body1" className="mb-4 text-gray-700">
                {activity.address}
              </Text>
            </div>

            {/* Map Container - Full Width */}
            <div 
              className="w-full h-[500px] relative"
              dangerouslySetInnerHTML={{ 
                __html: activity.location_maps?.replace(
                  'width="600"',
                  'width="100%"'
                ).replace(
                  'height="450"',
                  'height="500"'
                ) || ''
              }} 
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail; 