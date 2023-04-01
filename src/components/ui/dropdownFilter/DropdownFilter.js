import React from 'react';
import { Form, FormGroup } from 'reactstrap';
import './dropdownFilter.css';

const DropdownFilter = () => {
   return (
      <div>
         <Form>
            <FormGroup className='form__group w-25'>
               <select
                  className='w-100'
                  name='fragrance'
                  // value={product.fragrance}
                  // onChange={(e) => handleInputChange(e)}
                  //required
               >
                  <option value=''>All</option>
                  <option value='Rose'>Rose</option>
                  <option value='Chocolate'>Chocolate</option>
                  <option value='Sweet'>Sweet</option>
                  <option value='Pleasant'>Pleasant</option>
                  <option value='Fruit'>Fruit</option>
               </select>
            </FormGroup>
         </Form>
      </div>
   );
};

export default DropdownFilter;
