import HomePage from '../../pages/user/Home';
import ActivitiesPage from '../../pages/user/Activities';
import ActivityDetailPage from '../../pages/user/ActivityDetail';
import CartPage from '../../pages/user/Cart';
import CheckoutPage from '../../pages/user/Checkout';
import ProfilePage from '../../pages/user/Profile';
import PromoPage from '../../pages/user/Promo';
import TransactionsPage from '../../pages/user/Transactions';
import ReviewsPage from '../../pages/user/Reviews';

export const userRoutes = [
  {
    index: true,
    element: HomePage
  },
  {
    path: 'activities',
    children: [
      {
        index: true,
        element: ActivitiesPage
      },
      {
        path: ':id',
        element: ActivityDetailPage
      }
    ]
  },
  {
    path: 'promos',
    element: PromoPage
  },
  {
    path: 'cart',
    element: CartPage
  },
  {
    path: 'checkout',
    element: CheckoutPage
  },
  {
    path: 'profile',
    children: [
      {
        index: true,
        element: ProfilePage
      },
      {
        path: 'transactions',
        element: TransactionsPage
      },
      {
        path: 'reviews',
        element: ReviewsPage
      }
    ]
  }
]; 