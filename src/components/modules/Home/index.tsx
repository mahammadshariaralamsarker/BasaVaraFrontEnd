import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/shared/Hero';
import HomeSlider from '@/components/shared/Slider';
import React from 'react';
import Testimonials from './Testimonials';

export default function index() {
  return (
    <div>
      <HomeSlider />
      <HeroSection />
      <Testimonials />
      {/* <p>Welcome to the Home Page!</p>
      <p>banner</p>
      <p>customer review</p> */}
      <Footer />
    </div>
  );
}
