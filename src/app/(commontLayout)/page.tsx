import Testimonials from '@/components/modules/Home/Testimonials'; 
import HomeSlider from '@/components/shared/Slider'; 
import { HeroSection } from '@/components/shared/Hero';

export default function page() {
  return (
    <div className='bg-slate-50'>
      <HomeSlider /> 
      <HeroSection/> 
      <Testimonials />
    </div>
  );
}
