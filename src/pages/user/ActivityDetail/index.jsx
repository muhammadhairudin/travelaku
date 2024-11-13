import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivityDetail } from '../../../store/slices/activitySlice';
import { Text, Button } from '../../../components/atoms';
import { Card } from '../../../components/molecules';
import ImageGallery from './components/ImageGallery';
import ActivityInfo from './components/ActivityInfo';
import BookingForm from './components/BookingForm';

const ActivityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedActivity: activity, loading, error } = useSelector(state => state.activity);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchActivityDetail(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <Text variant="body1" className="text-red-500">
            {error}
          </Text>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => dispatch(fetchActivityDetail(id))}
          >
            Coba Lagi
          </Button>
        </Card>
      </div>
    );
  }

  if (!activity) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images & Info */}
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery 
            images={activity.imageUrls}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
          
          <ActivityInfo activity={activity} />
        </div>

        {/* Right Column - Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <BookingForm activity={activity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail; 