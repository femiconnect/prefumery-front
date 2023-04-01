import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import {
   ref,
   uploadBytesResumable,
   getDownloadURL,
   deleteObject,
} from 'firebase/storage';
import { db, storage } from '../../../../firebase/config';
import { selectProducts } from '../../../../redux/slices/productSlice';
import Helmet from '../../../../components/layout/helmet/Helmet';
import SubmitBtn from '../../../../components/ui/submitBtn/SubmitBtn';
import './addEditProduct.css';

const initialState = {
   name: '',
   brand: '',
   sex: '',
   price: '',
   popular: '',
   new: '',
   gift: '',
   desc: '',
   imageURL: '',
};

const AddProduct = () => {
   const { id } = useParams();

   //get product to be updated
   const products = useSelector(selectProducts);
   const productToBeUpdated = products.find((item) => {
      return item.id === id;
   });

   const [product, setProduct] = useState(() => {
      const newState = detectForm(id, { ...initialState }, productToBeUpdated);
      return newState;
   });
   const [fileUploadProgress, setFileUploadProgress] = useState(0);
   const [isLoading, setIsLoading] = useState(false);

   const navigate = useNavigate();

   //function to detect whether the form will be used to update or create a product
   function detectForm(id, arg1, arg2) {
      if (id === 'add') {
         return arg1;
      }
      return arg2;
   }

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
   };

   const handleImageChange = (e) => {
      //get selected image
      const file = e.target.files[0];

      //pushing the image file to firebase storage - 2 steps
      //step 1 - create a reference in firebase for the image
      const storageRef = ref(storage, `perfumery/${Date.now()}-${file.name}`);
      //step2 - upload the image with the function below
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers(effects) on uploadTask
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            // Observer 1 - calc upload progress
            const progress = Math.floor(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setFileUploadProgress(progress);
         },
         (error) => {
            //Observer 2 - Handle unsuccessful uploads
            toast.error(error.message);
         },
         () => {
            //Observer 3 - get the download URL: https://firebasestorage.googleapis.com/... for the uploaded image
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setProduct({ ...product, imageURL: downloadURL });

               toast.success('Image uploaded successfully...');
            });
         }
      );
   };

   //Function to add the product if it is new
   const addProduct = (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         const docRef = addDoc(collection(db, 'perfumes'), {
            name: product.name,
            brand: product.brand,
            sex: product.sex,
            price: Number(product.price),
            popular: Boolean(product.popular),
            new: Boolean(product.new),
            gift: Boolean(product.gift),
            desc: product.desc,
            imageURL: product.imageURL,
            createdAt: Timestamp.now().toDate(),
         });

         setTimeout(() => {
            setIsLoading(false);
            setFileUploadProgress(0);
            setProduct({ ...initialState });
            toast.success('Product created successfully....');
         }, '3500');

         setTimeout(() => {
            navigate('/admin/all-products');
         }, '6000');
      } catch (error) {
         setIsLoading(false);
         toast.error(error.message);
      }
   };

   //Function to update the details of a product already in the database
   const editProduct = (e) => {
      e.preventDefault();
      setIsLoading(true);

      //check if the product image has changed, if so, delete the previous image
      if (product.imageURL !== productToBeUpdated.imageURL) {
         //1. create a refrence to the image file to be deleted
         const storageRef = ref(storage, productToBeUpdated.imageURL);

         //2. delete the image file
         deleteObject(storageRef);
      }

      try {
         setDoc(doc(db, 'perfumes', id), {
            name: product.name,
            brand: product.brand,
            sex: product.sex,
            price: Number(product.price),
            popular: Boolean(product.popular),
            new: Boolean(product.new),
            gift: Boolean(product.gift),
            desc: product.desc,
            imageURL: product.imageURL,
            createdAt: productToBeUpdated.createdAt, //leave the createdAt value unchanged
            editedAt: Timestamp.now().toDate(),
         });

         setIsLoading(false);
         toast.success('Product updated successfully....');
         navigate('/admin/all-products');
      } catch (error) {
         setIsLoading(false);
         toast.error(error.message);
      }
   };

   return (
      <Helmet title={'Add-Edit Product'}>
         <section>
            <Container>
               <Row>
                  <Col lg='12' className='page-bg'>
                     <h4 className='mb-4 text-center'>
                        {detectForm(
                           id,
                           'Create New Product',
                           `Edit Product ID: ${id}`
                        )}
                     </h4>
                     <Form
                        className='add-product-form mb-5'
                        onSubmit={detectForm(id, addProduct, editProduct)}
                     >
                        {/* ========= product Name ========== */}
                        <FormGroup className='form__group pd-1'>
                           <span>Product Name</span>
                           <input
                              type='text'
                              placeholder='Name of fragrance/perfume'
                              name='name'
                              value={product.name}
                              onChange={(e) => handleInputChange(e)}
                              required
                              autoComplete='off'
                           />
                        </FormGroup>

                        {/* ========= image upload ========== */}
                        <div className='product-image-container pd-1'>
                           {fileUploadProgress === 0 ? null : (
                              <div className='progressbar'>
                                 <div
                                    style={{
                                       height: '100%',
                                       width: `${fileUploadProgress}%`,
                                       backgroundColor: '#0a1d37',
                                       transition: 'width 0.5s',
                                    }}
                                 >
                                    <span className='progressPercent'>
                                       {fileUploadProgress}%
                                    </span>
                                 </div>
                              </div>
                           )}

                           <FormGroup className='form__group'>
                              <span>Product Image</span>
                              <input
                                 type='file'
                                 accept='image/*'
                                 placeholder='Product Image'
                                 name='image'
                                 onChange={(e) => handleImageChange(e)}
                              />

                              {product.imageURL === '' ? null : (
                                 <input
                                    type='text'
                                    name='imageURL'
                                    value={product.imageURL}
                                    required
                                    placeholder='image url'
                                    disabled
                                 />
                              )}
                           </FormGroup>
                        </div>

                        {/* ========= product brand ========== */}
                        <FormGroup className='form__group pd-1'>
                           <span>Brand Name</span>
                           <input
                              type='text'
                              placeholder='Name of brand'
                              name='brand'
                              value={product.brand}
                              onChange={(e) => handleInputChange(e)}
                              required
                              autoComplete='off'
                           />
                        </FormGroup>

                        <div className='d-flex align-items-center justify-content-between gap-5 pd-1'>
                           {/* ========= product price ========== */}
                           <FormGroup className='form__group w-50'>
                              <span>Product Price</span>
                              <input
                                 type='text'
                                 placeholder='500'
                                 name='price'
                                 value={product.price}
                                 onChange={(e) => handleInputChange(e)}
                                 required
                                 autoComplete='off'
                              />
                           </FormGroup>

                           {/* ========= Sex ========== */}
                           <FormGroup className='form__group w-50'>
                              <span>Sex</span>
                              <select
                                 className='w-100'
                                 name='sex'
                                 value={product.sex}
                                 onChange={(e) => handleInputChange(e)}
                                 required
                              >
                                 <option value='' disabled>
                                    -- choose sex --
                                 </option>
                                 <option value='Male'>Male</option>
                                 <option value='Female'>Female</option>
                                 <option value='Unisex'>Unisex</option>
                              </select>
                           </FormGroup>
                        </div>

                        {/* ========= product description ========== */}
                        <FormGroup className='form__group pd-1'>
                           <span>Product Description</span>
                           <textarea
                              name='desc'
                              value={product.desc}
                              onChange={(e) => handleInputChange(e)}
                              required
                              cols='30'
                              rows='10'
                              placeholder='Describe the product in details here...'
                           ></textarea>
                        </FormGroup>

                        {/* ========= Popular, New, Gift ========== */}
                        <div className='d-flex align-items-center justify-content-between gap-5 pd-1'>
                           <FormGroup className='form__group w-25'>
                              <span>Popular</span>
                              <select
                                 className='w-100'
                                 name='popular'
                                 value={product.popular}
                                 onChange={(e) => handleInputChange(e)}
                                 required
                              >
                                 <option value='' disabled>
                                    -- select --
                                 </option>
                                 <option value='false'>False</option>
                                 <option value='true'>True</option>
                              </select>
                           </FormGroup>

                           <FormGroup className='form__group w-25'>
                              <span>New </span>
                              <select
                                 className='w-100'
                                 name='new'
                                 value={product.new}
                                 onChange={(e) => handleInputChange(e)}
                                 required
                              >
                                 {' '}
                                 <option value='' disabled>
                                    -- select --
                                 </option>
                                 <option value='false'>False</option>
                                 <option value='true'>True</option>
                              </select>
                           </FormGroup>

                           <FormGroup className='form__group w-25'>
                              <span>Gift</span>
                              <select
                                 className='w-100'
                                 name='gift'
                                 value={product.gift}
                                 onChange={(e) => handleInputChange(e)}
                                 required
                              >
                                 <option value='' disabled>
                                    -- select --
                                 </option>
                                 <option value='false'>False</option>
                                 <option value='true'>True</option>
                              </select>
                           </FormGroup>
                        </div>

                        <SubmitBtn
                           txt={detectForm(
                              id,
                              'Create Product',
                              'Update Product'
                           )}
                           isLoading={isLoading}
                        />
                     </Form>
                  </Col>
               </Row>
            </Container>
         </section>
      </Helmet>
   );
};

export default AddProduct;
