import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './adminNav.css';

const activeLink = ({ isActive }) =>
   isActive ? 'active__admin-menu-item' : '';

const AdminNav = () => {
   const [show, setShow] = useState(true);

   function showSwitch() {
      return setShow(!show);
   }

   return (
      <section className='admin__menu p-0'>
         <Container>
            <Row>
               <div className='admin__navigation'>
                  <ul
                     className={
                        show ? 'admin__menu-list active' : 'admin__menu-list'
                     }
                  >
                     <li className='admin__menu-item'>
                        <NavLink
                           to='/admin/dashboard'
                           className={activeLink}
                           onClick={() => showSwitch()}
                        >
                           Dashboard
                        </NavLink>
                     </li>
                     <li className='admin__menu-item'>
                        <NavLink
                           to='/admin/all-products'
                           className={activeLink}
                           onClick={() => showSwitch()}
                        >
                           All Products
                        </NavLink>
                     </li>
                     <li className='admin__menu-item'>
                        <NavLink
                           to='/admin/add-product/add'
                           className={activeLink}
                           onClick={() => showSwitch()}
                        >
                           Add Product
                        </NavLink>
                     </li>
                     <li className='admin__menu-item'>
                        <NavLink
                           to='/admin/all-orders'
                           className={activeLink}
                           onClick={() => showSwitch()}
                        >
                           Orders
                        </NavLink>
                     </li>
                     <li className='admin__menu-item'>
                        <NavLink
                           to='/admin/all-users'
                           className={activeLink}
                           onClick={() => showSwitch()}
                        >
                           Users
                        </NavLink>
                     </li>
                  </ul>
                  <div
                     className={show ? 'bars-btn active' : 'bars-btn'}
                     onClick={() => showSwitch()}
                  >
                     <span></span>
                     <span></span>
                     <span></span>
                  </div>
               </div>
            </Row>
         </Container>
      </section>
   );
};

export default AdminNav;
