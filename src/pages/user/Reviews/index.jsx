import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReviews } from '../../../store/slices/profileSlice';
import { Text } from '../../../components/atoms';
import { Card } from '../../../components/molecules';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 animate-spin border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <Text variant="body1" className="text-center text-red-500">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <Text variant="h1" className="mb-8 text-3xl font-bold">
        Ulasan Saya
      </Text>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex gap-4 items-start">
              <img
                src={review.activity.imageUrls[0]}
                alt={review.activity.title}
                className="object-cover w-24 h-24 rounded-lg"
              />
              <div className="flex-grow">
                <Text variant="h6" className="font-semibold">
                  {review.activity.title}
                </Text>
                <div className="flex gap-2 items-center my-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <Text variant="caption" className="text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Text>
                </div>
                <Text variant="body2">
                  {review.comment}
                </Text>
              </div>
            </div>
          </Card>
        ))}

        {reviews.length === 0 && (
          <div className="py-12 text-center">
            <Text variant="body1" className="text-gray-500">
              Belum ada ulasan
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage; 