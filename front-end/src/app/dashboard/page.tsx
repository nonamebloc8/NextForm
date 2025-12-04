import Faq from "../component/Faq";
import HeroSectionAnimated from "../component/HeroSection";
import ProductsSection from "../component/ProductsSection";
import Testimonials from "../component/Testimonials";
import WhyChooseSection from "../component/WhyChooseSection";

export default function Home() {
  return (
    <div className="p-5 flex flex-col gap-10 lg:mt-10">
    <HeroSectionAnimated/>
    <ProductsSection/>
    <WhyChooseSection/>
    <Testimonials/>
    <Faq/>
    </div>)
}