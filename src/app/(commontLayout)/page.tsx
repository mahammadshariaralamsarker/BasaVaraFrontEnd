import Testimonials from '@/components/modules/Home/Testimonials';
import HeroSection from '@/components/shared/Hero';
import HomeSlider from '@/components/shared/Slider';

export default function page() {
  return (
    <div>
      <HomeSlider />
      <HeroSection />
      <Testimonials />
    </div>
  );
}
