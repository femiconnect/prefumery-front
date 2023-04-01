import React from 'react';
import { Routes, Route } from 'react-router';
import AdminNav from './adminComponents/adminNav/AdminNav';
import Dashboard from './adminComponents/dashboard/Dashboad';
import AllProducts from './adminComponents/allProducts/AllProducts';
import AddEditProduct from './adminComponents/addEditProduct/AddEditProduct';
import AdminHeader from './adminComponents/adminHeader/adminHeader';
import { Footer } from '../../components/layout';

const Admin = () => {
   return (
      <>
         <AdminHeader />
         <AdminNav />
         <Routes>
            {/* .../admin/dashboard */}
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='all-products' element={<AllProducts />} />
            <Route path='add-product/:id' element={<AddEditProduct />} />
         </Routes>
         <Footer />
      </>
   );
};

export default Admin;
