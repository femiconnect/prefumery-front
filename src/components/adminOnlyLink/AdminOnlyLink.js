import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

//Shows top menu link only if user is an admin
const AdminOnlyLink = ({ children }) => {
   const user = useSelector(selectUser);

   if (user?.email === 'femi.webdeveloper@gmail.com') {
      return children;
   }

   return null;
};

export default AdminOnlyLink;
