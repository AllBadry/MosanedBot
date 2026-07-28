import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import PricingSection from '../components/sections/PricingSection';

// تسجيل الإضافة (مهم جداً لكي تعمل مع GSAP)
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // نحدد كل الأقسام التي أضفنا لها كلاس "scroll-section"
      const sections = gsap.utils.toArray('.scroll-section');

      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 }, // يبدأ مخفياً ومنزاحاً للأسفل قليلاً
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%", // تبدأ الحركة عندما يصل أعلى القسم إلى 80% من الشاشة
              toggleActions: "play none none reverse", // play عند النزول، reverse عند الصعود (لحيوية مستمرة)
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col overflow-hidden">
      {/* قسم الهيرو لا يحتاج ScrollTrigger لأنه يظهر فور تحميل الصفحة */}
      <Hero />
      
      {/* باقي الأقسام نغلفها بـ div يحمل الكلاس لكي يلتقطها GSAP */}
      <div className="scroll-section">
        <AboutSection />
      </div>
      <div className="scroll-section">
        <ServicesSection />
      </div>
      <div className="scroll-section">
        <PricingSection />
      </div>
    </div>
  );
}