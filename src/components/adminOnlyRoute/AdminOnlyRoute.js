import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../redux/slices/authSlice';

//Permits only admin users to access these routes
const AdminOnlyRoute = ({ children }) => {
   const user = useSelector(selectUser);

   if (user?.email === 'femi.webdeveloper@gmail.com') {
      return children;
   } else {
      return <Navigate to='/redirect' replace={true} />;
   }

   //return null;

   // return user === 'shop3@gmail.com' ? (
   //    children
   // ) : (
   //    <Navigate to='/redirect' />
   // );
};

export default AdminOnlyRoute;
