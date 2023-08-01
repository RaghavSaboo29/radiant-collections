import React from 'react'
import Navbar2 from '../navbar/Navbar2'
import SliderIndex from '../all-slider/slider-index/SliderIndex'
import GridLayout from '../grid-image-layout/GridLayout'
import DecorBanner from '../decor-sub-cat/DecorBanner'
import Footer from '../footer/Footer'
import AllProductSlider from '../all-slider/product-slider/AllProductSlider'
import ProductSlider from '../all-slider/product-slider/ProductSlider'
import CategoryProductSlider from '../all-slider/category-product-slider/CategoryProductSlider'
import ScrollToTop from '../ScrollToTop'
import HeroSection from '../home-page-component/HeroSection'
import SoftFurnishingSection from '../home-page-component/SoftFurnishingSection'
import EthnicClothing from '../home-page-component/EthnicClothing'
import Crockery from '../home-page-component/Crockery'

const HomePageLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar2 />
      <SliderIndex />
      <HeroSection />
      <GridLayout />
      <ProductSlider />
      <SoftFurnishingSection />
      <CategoryProductSlider name={'bedsheets'} />
      <CategoryProductSlider name={'cushions-and-blankets'} />
      <DecorBanner />
      <CategoryProductSlider name={'showpieces'} />
      <CategoryProductSlider name={'wall-hangings'} />
      <Crockery />
      <CategoryProductSlider name={'kitchenware'} />
      <CategoryProductSlider name={'dining'} />
      <EthnicClothing />
      <CategoryProductSlider name={'sarees'} />
      <CategoryProductSlider name={`women's-kurta`} />
      <AllProductSlider />
      <Footer />
    </>
  )
}

export default HomePageLayout
