import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

//Show children if user is logged in
const ShowOnLogin = ({ children }) => {
   const user = useSelector(selectUser);

   if (user?.email) {
      return children;
   }
   return null;
};

//show children if user is logged out
export const ShowOnLogout = ({ children }) => {
   const user = useSelector(selectUser);

   if (!user) {
      return children;
   }
   return null;
};

export default ShowOnLogin;
