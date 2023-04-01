import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import userIcon from '../../../../assets/images/z-others/user-icon.png';
import './adminHeader.css';

const AdminHeader = () => {
   const navigate = useNavigate();

   const navigateToHome = () => {
      navigate('/');
   };

   return (
      <header className='admin__header'>
         <div className='admin__nav-wrapper'>
            <Container>
               <Row>
                  <div className='admin__nav-wrapper-top'>
                     <div className='logo' onClick={navigateToHome}>
                        <h2>Perfumery</h2>
                     </div>

                     <div className='admin__nav-top-right'>
                        <span>
                           <i className='ri-notification-3-line'></i>
                        </span>
                        <span>
                           <i className='ri-settings-2-line'></i>
                        </span>
                        <img src={userIcon} alt='' />
                     </div>
                  </div>
               </Row>
            </Container>
         </div>
      </header>
   );
};

export default AdminHeader;
