import { createBrowserRouter } from "react-router-dom";
import Login from '../../uix/src/Screens/LoginScreen';
import Register from '../../uix/src/Screens/RegisterScreen';
import UserHome from '../../uix/src/Screens/Welcome';
import Business from '../../uix/src/Screens/Business';
import Details from '../../uix/src/Screens/DetailsPage';
import DefaultLayout from '../../uix/src/Screens/HomeScreen'; 
import Amusement from '../../uix/src/Screens/Amusement'; 
import Text from '../../uix/src/Screens/Text'; 
import Users from '../../uix/src/Screens/Admin/UsersList'; 
import Reviews from '../../uix/src/Screens/Admin/ReviewsList'; 
import Info from '../../uix/src/Screens/UserHome'; 
import Admin_Side from '../../uix/src/Screens/Admin/PlacesList'; 
import AboutUsScreen from "./Screens/AboutUsScreen";
import Manners from '../../uix/src/Screens/Manners'; 
import Companies from '../../uix/src/Screens/Companies'; 
import Jobs from '../../uix/src/Screens/Jobs';
import Admin_Dashboard from '../../uix/src/Screens/Admin/Dashboard'; 
import UniList from '../../uix/src/Screens/Admin/UniList'; 
import JobList from '../../uix/src/Screens/Admin/JobList'; 
import CompaniesList from '../../uix/src/Screens/Admin/CompanyList'; 



const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
  },
  {
    path: '/job_list',
    element: <JobList />,
  },
  {
    path: '/companies_list',
    element: <CompaniesList />,
  },
  {
    path: '/dashboard',
    element: <Admin_Dashboard/>,
  },
  {
    path: '/home', 
    element: <UserHome />,  
  },
  {
    path: '/academic_list', 
    element: <UniList />,  
  },
  {
    path: '/login',
    element: <Login />,  
  },
  {
    path: '/about',
    element: <AboutUsScreen />,
  },
  {
    path: '/business',
    element: <Business />,  
  },
  {
    path: '/jobs',
    element: <Jobs />,  
  },
  {
    path: '/places',
    element: <Admin_Side />,  
  },
  {
    path: '/reviews',
    element: <Reviews />,  
  },

  {
    path: '/amusement',
    element: <Amusement />,  
  },
  {
    path: '/companies',
    element: <Companies />,  
  },
  {
    path: '/academic',
    element: <Info />,  
  },
  {
    path: '/info/:tableName/:id',
    element: <Details />,  
  },
  {
    path: '/text',
    element: <Text />,  
  },
  {
    path: '/manners',
    element: <Manners />,  
  },
  {
    path: '/users',
    element: <Users />, 
  },

  {
    path: '/register',
    element: <Register />,  // Register Screen
  },
]);

export default router;
