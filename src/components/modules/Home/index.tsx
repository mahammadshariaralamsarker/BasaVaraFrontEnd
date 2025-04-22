import HeroSection from '@/components/shared/Hero';
import HomeSlider from '@/components/shared/Slider';
import React from 'react';

export default function index() {
  return (
    <div>
      <HomeSlider />
      <HeroSection />
      <p>Welcome to the Home Page!</p>
      <p>banner</p>
      <p>customer review</p>
    </div>
  );
}
