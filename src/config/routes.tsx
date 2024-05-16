// import {Navigate} from 'react-router-dom';
import CreateAccount from '@/pages/createAccount/createAccount';
import Login from '@/pages/login/login';
import LoginAsGuest from '@/pages/loginAsGuest/loginAsGuest';
import VerifyAccount from '@/pages/verifyAccount/verifyAccount';
import Dashboard from '@/pages/dashbaord/dashboard';
import QuoteForm from '@/pages/quoteForm/quoteForm';
import TransactionHistory from '@/pages/transactionHistory/transactionHistory';
import ForgotPin from '@/pages/forgotPin/forgotPin';
import VerifyDetails from '@/pages/verifyDetails/verifyDetails';
import ResetPin from '@/pages/resetPin/resetPin';
import ViewQuote from '@/pages/veiwQuote/viewQuote';
import AcceptQuote from '@/pages/acceptQuote/acceptQuote';
import ConfirmingPayment from '@/pages/confirmingPayment/confirmingPayment';
import RejectQuote from '@/pages/rejectQuote/rejectQuote';
import QuoteSuccess from '@/pages/quoteSuccess/quoteSuccess';
import RequestedPage from '@/pages/requestedPage/requestedPage';
import ResetPinSuccessful from '@/pages/resetPinSuccessful/resetPinSuccessful';

const authRoutes = [
  {path: '/login', element: <Login />},
  {path: '/forgot-pin', element: <ForgotPin />},
  {path: '/reset-pin', element: <ResetPin />},
  {path: '/create-account', element: <CreateAccount />},
  {path: '/login-as-guest', element: <LoginAsGuest />},
  {path: '/verify-account', element: <VerifyAccount />},
  {path: '/verify-details', element: <VerifyDetails />},
  {path: '/reset-pin-successful', element: <ResetPinSuccessful />},
];

const inAppRoutes = [
  {path: '/', element: <Dashboard />},
  {path: '/quote', element: <QuoteForm />},
  {path: '/view-quote', element: <ViewQuote />},
  {path: '/view-quote/accept-quote', element: <AcceptQuote />},
  {path: '/view-quote/reject-quote', element: <RejectQuote />},
  {path: '/requested-quote', element: <RequestedPage />},
  {path: '/quote/quote-submitted', element: <QuoteSuccess />},
  {
    path: '/view-quote/accept-quote/confirming-payment',
    element: <ConfirmingPayment />,
  },

  {path: '/transaction-history', element: <TransactionHistory />},
];
export {authRoutes, inAppRoutes};
