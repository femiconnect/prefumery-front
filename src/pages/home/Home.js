import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, Header, Footer } from '../../components/layout';
import HeroSlider from '../../components/ui/slider/HeroSlider';
import Services from '../../components/ui/services/Services';
import Loader from '../../components/ui/loader/Loader';
import Spinner from '../../components/ui/spinner/Spinner';
import ProductList from '../../components/ui/productList/ProductList';
import InfoBox from '../../components/ui/info-box/InfoBox';
import DiscoverImg1 from '../../assets/images/discover/discover-1.jpg';
import DiscoverImg2 from '../../assets/images/discover/discover-2.jpg';
import ParallaxSalesOffer from '../../components/ui/parallaxSalesOffer/ParallaxSalesOffer';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { selectProducts, storeProducts } from '../../redux/slices/productSlice';
import './home.css';

const Home = () => {
   const { data, isPending, error } = useFetchCollection('perfumes');
   const [isLoading, setIsLoading] = useState(true);
   const [trendingProducts, setTrendingProducts] = useState([]);
   const [newProducts, setNewProducts] = useState([]);
   const [giftProducts, setGiftProducts] = useState([]);

   const products = useSelector(selectProducts);

   const dispatch = useDispatch();

   //push the fetched data(perfumes) to the redux store
   useEffect(() => {
      dispatch(
         storeProducts({
            products: data,
         })
      );
      setIsLoading(false);
   }, [data, dispatch]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   useEffect(() => {
      const filteredTrendingProducts = products.filter(
         (item) => item.popular === true
      );

      const filteredNewProducts = products.filter((item) => item.new === true);

      const filteredGiftProducts = products.filter(
         (item) => item.gift === true
      );

      setTrendingProducts(filteredTrendingProducts);
      setNewProducts(filteredNewProducts);
      setGiftProducts(filteredGiftProducts);
   }, [products]);

   //console.log(['trendingProducts', trendingProducts]);
   //console.log(['newProducts', newProducts]);
   //console.log(['giftProducts', giftProducts]);

   return (
      <>
         <Header />
         <Helmet title={'Home'}>
            {error && <div>{error}</div>}
            {isPending && <Loader />}
            {isLoading && <Loader />}
            {products && (
               <div className='home'>
                  <section className='hero__section'>
                     <HeroSlider />
                  </section>

                  <Services />

                  <section className='trending__products'>
                     <Container>
                        <Row>
                           <Col lg='12' className='text-center'>
                              <h2 className='section__title'>
                                 Trending Products
                              </h2>
                           </Col>
                        </Row>
                        <Row>
                           <Col lg='12'>
                              {trendingProducts?.length > 0 ? (
                                 <div className='shop-product-listing'>
                                    <ProductList
                                       data={trendingProducts.slice(0, 8)}
                                    />
                                 </div>
                              ) : (
                                 <div className='spinner-container'>
                                    <Spinner />
                                 </div>
                              )}
                           </Col>
                        </Row>
                     </Container>
                  </section>

                  <div className='parallax-sales-container'>
                     <ParallaxSalesOffer />
                  </div>

                  <section className='best__sales'>
                     <Container>
                        <Row>
                           <Col lg='12' className='text-center'>
                              <h2 className='section__title'>New Products</h2>
                           </Col>
                        </Row>
                        <Row>
                           <Col lg='12'>
                              {newProducts?.length > 0 ? (
                                 <div className='shop-product-listing'>
                                    <ProductList
                                       data={newProducts.slice(0, 8)}
                                    />
                                 </div>
                              ) : (
                                 <div className='spinner-container'>
                                    <Spinner />
                                 </div>
                              )}
                           </Col>
                        </Row>
                     </Container>
                  </section>

                  <section className='discover-box'>
                     <Container>
                        <Row>
                           <Col lg='6' md='12'>
                              <InfoBox
                                 bg={DiscoverImg1}
                                 text='best for men style'
                              />
                           </Col>
                           <Col lg='6' md='12'>
                              <InfoBox
                                 bg={DiscoverImg2}
                                 text='best for women style '
                              />
                           </Col>
                        </Row>
                     </Container>
                  </section>

                  <section className='best__sales'>
                     <Container>
                        <Row>
                           <Col lg='12' className='text-center'>
                              <h2 className='section__title'>Best Sales</h2>
                           </Col>
                        </Row>
                        <Row>
                           <Col lg='12'>
                              {giftProducts?.length > 0 ? (
                                 <div className='shop-product-listing'>
                                    <ProductList
                                       data={giftProducts.slice(0, 8)}
                                    />
                                 </div>
                              ) : (
                                 <div className='spinner-container'>
                                    <Spinner />
                                 </div>
                              )}
                           </Col>
                        </Row>
                     </Container>
                  </section>
               </div>
            )}
         </Helmet>
         <Footer />
      </>
   );
};

export default Home;
