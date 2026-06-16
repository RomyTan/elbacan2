"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ElBacanApp() {
  const [stage, setStage] = useState('verification'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isVideoFinished, setIsVideoFinished] = useState(false); 
  const [activeSlide, setActiveSlide] = useState(0); 
  const [activeTab, setActiveTab] = useState('ORIGINAL'); 
  const [activeWrapper, setActiveWrapper] = useState(0); 
  const [selectedProduct, setSelectedProduct] = useState(null); // State untuk Pop-Up Mobile
  
  const videoRef = useRef(null);
  const wrapperSliderRef = useRef(null); 

  const bgImagePath = "/images/Havana-01.jpg"; 
  const smokeImagePath = "/images/smoke-effect.png";
  const doorImagePath = "/images/elbacan-door.jpg";
  const logoPath = "/images/elbacan-logo-v2.svg";

  const collectionData = [
    { name: 'CHURCHILL', ring: '48', length: '7"', time: '30-45min', intensity: 3, wrapper: 'Habano', image: '/images/eb-std-churchill.png', badge: null },
    { name: 'DOUBLE CORONA', ring: '52', length: '8"', time: '30-45min', intensity: 4, wrapper: 'Habano', image: '/images/eb-std-double-corona.png', badge: 'BEST SELLER' },
    { name: 'TORPEDO', ring: '52', length: '6 ½"', time: '40min', intensity: 4, wrapper: 'Habano', image: '/images/eb-std-torpedo.png', badge: null },
    { name: 'TORO', ring: '52', length: '6"', time: '30-45min', intensity: 2, wrapper: 'Habano', image: '/images/eb-std-toro.png', badge: null },
    { name: 'ELEGANTES', ring: '50', length: '7"', time: '40-45min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-elegantes_connecticut.jpg', badge: 'BEST SELLER' },
    { name: 'ELEGANTES', ring: '50', length: '7"', time: '40-45min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-elegantes_habano.jpg', badge: null },
    { name: 'ELEGANTES', ring: '50', length: '7"', time: '40-45min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-elegantes_Maduro.jpg', badge: null },
    { name: 'CLASICOS', ring: '52', length: '6"', time: '30-40min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-clasicos_connecticut.jpg', badge: null },
    { name: 'CLASICOS', ring: '52', length: '6"', time: '30-40min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-clasicos_habano.jpg', badge: null },
    { name: 'CLASICOS', ring: '52', length: '6"', time: '30-40min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-clasicos_maduro.jpg', badge: 'BEST SELLER' },
    { name: 'DISTINTOS', ring: '52', length: '6.5"', time: '30-45min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-distintos_connecticut.jpg', badge: null },
    { name: 'DISTINTOS', ring: '52', length: '6.5"', time: '30-45min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-distintos_habano.jpg', badge: null },
    { name: 'DISTINTOS', ring: '52', length: '6.5"', time: '30-45min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-distintos_maduro.jpg', badge: null },
    { name: 'SELECTOS', ring: '50', length: '5"', time: '20-25min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-selectos_connecticut.jpg', badge: null },
    { name: 'SELECTOS', ring: '50', length: '5"', time: '20-25min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-selectos_habano.jpg', badge: null },
    { name: 'SELECTOS', ring: '50', length: '5"', time: '20-25min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-selectos_maduro.jpg', badge: 'BEST SELLER' },
    { name: 'UNICOS', ring: '60', length: '6"', time: '45-55min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-unicos_connecticut.jpg', badge: null },
    { name: 'UNICOS', ring: '60', length: '6"', time: '45-55min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-unicos_habano.jpg', badge: null },
    { name: 'UNICOS', ring: '60', length: '6"', time: '45-55min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-unicos_maduro.jpg', badge: 'BEST SELLER' },
  ];

  const wrapperData = [
    {
      subtitle: 'SMOOTH & CREAMY',
      title: 'The Connecticut Reserve',
      desc: 'A flawless, shade-grown leaf offering a mild yet flavorful profile. Expect notes of toasted almond, cedar, and a hint of vanilla with a creamy, buttery finish.',
      image: '/images/wrapper-connecticut.png', 
      bgColor: '#A67B36'
    },
    {
      subtitle: 'BALANCED & COMPLEX',
      title: 'The Habano Heritage',
      desc: 'Sun-grown and rich in oils, this Rosado wrapper delivers a medium-to-full body. It presents an intricate dance of roasted coffee, earth, and a signature peppery spice.',
      image: '/images/wrapper-habano.png', 
      bgColor: '#5B362A'
    },
    {
      subtitle: 'BOLD & RICH',
      title: 'The Maduro Privado',
      desc: 'A naturally fermented, dark and oily wrapper. It yields a robust, sweet, and savory experience characterized by dark chocolate, espresso, and black cherry nuances.',
      image: '/images/wrapper-maduro.png', 
      bgColor: '#312921'
    }
  ];

  const handleYesClick = () => {
    setStage('transition');
    setTimeout(() => {
      setStage('home');
    }, 1200);
  };

  useEffect(() => {
    if (stage !== 'home' || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsVideoFinished(false); 
        }
      },
      { threshold: 0.4 } 
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [stage]);

  const handleSlideScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const itemWidth = e.target.clientWidth * 0.85; 
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(index);
  };

  const handleWrapperScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const itemWidth = e.target.clientWidth * 0.85; 
    const index = Math.round(scrollLeft / itemWidth);
    setActiveWrapper(index);
  };

  const handleWrapperArrowClick = (direction) => {
    if (wrapperSliderRef.current) {
      const scrollAmount = wrapperSliderRef.current.clientWidth * 0.85;
      if (direction === 'left') {
        wrapperSliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        wrapperSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const filteredCollection = collectionData.filter((cigar) => {
    if (activeTab === 'ORIGINAL') return cigar.image.includes('eb-std');
    if (activeTab === 'PREMIUM EDITION') return cigar.image.includes('ebpe');
    if (activeTab === 'BEST SELLER') return cigar.badge === 'BEST SELLER';
    return true;
  });

  return (
    <>
      <title>El Bacán - Premium Cigars</title>

      <style dangerouslySetInnerHTML={{ __html: `
        /* --- FONTS & BASE --- */
        @font-face { font-family: 'Arpona'; src: url('/fonts/Arpona-Regular.otf') format('truetype'); font-weight: normal; font-style: normal; }
        @font-face { font-family: 'Arpona-Semibold'; src: url('/fonts/Arpona-SemiBold.otf') format('truetype'); font-weight: bold; font-style: normal; }
        @font-face { font-family: 'GreatVibes'; src: url('/fonts/GreatVibes-Regular.ttf') format('truetype'); font-weight: normal; font-style: normal; }
        
        html, body { margin: 0; padding: 0; overflow-x: hidden; font-family: 'Arpona', serif; background-color: #000000; width: 100%; max-width: 100vw; min-height: 100dvh; }

        /* --- AGE VERIFICATION --- */
        @keyframes softZoomIn { 0% { opacity: 0; transform: scale(1); } 100% { opacity: 0.6; transform: scale(1.8); } }
        @keyframes slideDownFade { 0% { opacity: 0; transform: translateY(-40px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes sweep { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes finalZoomAndFade { 0% { opacity: 0.6; transform: scale(1.8); } 100% { opacity: 0; transform: scale(5); } }
        @keyframes fadeOutText { to { opacity: 0; transform: translateY(20px); } }
        @keyframes logoMoveToTop { to { transform: translateY(-40vh) scale(0.55); } }

        .age-page-background { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100dvh; background-image: url('${doorImagePath}'); background-size: cover; background-position: center; transform-origin: center center; z-index: 50; opacity: 0; animation: softZoomIn 2.5s ease-out forwards; }
        .age-page-background.exit-anim { animation: finalZoomAndFade 1.2s ease-in forwards !important; }
        .age-content-wrapper { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 60; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding-top: 16vh; box-sizing: border-box; }
        .age-logo-box { position: relative; width: 100%; max-width: 280px; aspect-ratio: 500 / 443; margin: 0 auto 2rem auto; opacity: 0; animation: slideDownFade 1s ease-out 1.5s forwards; }
        .age-logo-box.exit-anim { animation: logoMoveToTop 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards !important; }
        @media (min-width: 768px) { .age-logo-box { max-width: 380px; margin-bottom: 2rem; } }
        .base-layer { position: absolute; inset: 0; background-image: url('${logoPath}'); background-size: 100% 100%; background-repeat: no-repeat; background-position: center; }
        .mask-layer { position: absolute; inset: 0; -webkit-mask-image: url('${logoPath}'); -webkit-mask-size: 100% 100%; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; mask-image: url('${logoPath}'); mask-size: 100% 100%; mask-repeat: no-repeat; mask-position: center; overflow: hidden; z-index: 2; }
        .light-beam { position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%); transform: skewX(-25deg); animation: sweep 3s infinite ease-in-out; }
        .age-bottom-content { opacity: 0; animation: slideUpFade 1s ease-out 1.5s forwards; }
        .age-bottom-content.exit-anim { animation: fadeOutText 0.8s ease-in forwards; pointer-events: none; }
        .age-text { font-family: 'Arpona', serif; font-size: 1.2rem; margin-bottom: 2rem; color: #e6d5c3; letter-spacing: 0.1rem; text-transform: uppercase; }
        @media (min-width: 768px) { .age-text { font-size: 1.5rem; } }
        .age-button-group { display: flex; gap: 1.5rem; justify-content: center; }
        .age-button { background: transparent; border: 1px solid #e6d5c3; color: #e6d5c3; font-family: 'Arpona', serif; font-size: 0.9rem; font-weight: bold; text-transform: uppercase; padding: 0.8rem 2.5rem; cursor: pointer; transition: all 0.3s ease; border-radius: 2px; }
        .age-button:hover { background: #e6d5c3; color: #1c1c1c; }

        /* --- HOME PAGE HERO --- */
        @keyframes pageFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes bgFadeIn { 0% { opacity: 0; } 100% { opacity: 0.7; } }
        @keyframes floatSmoke { 0% { transform: scale(1) rotate(0deg); opacity: 0; } 50% { transform: scale(1.03) rotate(0.5deg); opacity: 0.85; } 100% { transform: scale(1.01) rotate(-0.5deg); opacity: 0; } }
        @keyframes navSlideDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes contentSlideUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }

        .home-container { position: relative; display: flex; flex-direction: column; background-color: #000000; animation: pageFadeIn 0.5s forwards; }
        .hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100dvh; background-image: url('${bgImagePath}'); background-size: cover; background-position: center top; z-index: 0; opacity: 0; animation: bgFadeIn 1.5s ease-out 0.2s forwards; }
        .smoke-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 1; opacity: 0; animation: bgFadeIn 1.5s ease-out 0.2s forwards; overflow: hidden; }
        .smoke-layer { position: absolute; inset: 0; background-image: url('${smokeImagePath}'); background-size: cover; background-position: center top; transform-origin: center top; animation: floatSmoke 8s infinite ease-out; animation-delay: 1.5s; }
        .hero-gradient { position: absolute; top: 0; left: 0; width: 100%; height: 100dvh; background: linear-gradient( to bottom, rgba(0, 0, 0, 0.9) 0%, transparent 25%, transparent 65%, #000000 100% ); z-index: 2; pointer-events: none; }
        
        .content-layer { position: relative; z-index: 10; display: flex; flex-direction: column; min-height: 100dvh; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease; }
        .content-layer.shifted { transform: translateX(-60%); opacity: 0; }
        
        .hero-section-wrapper { min-height: 100dvh; display: flex; flex-direction: column; }
        
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 2rem 4rem; width: 100%; box-sizing: border-box; }
        .nav-links { display: flex; gap: 7rem; font-size: 20px; font-weight: normal; letter-spacing: 0.1em; text-transform: uppercase; flex: 1; opacity: 0; animation: navSlideDown 0.8s ease-out 0.5s forwards; }
        .nav-links.left { justify-content: flex-end; }
        .nav-links.right { justify-content: flex-start; }
        .nav-links a { color: #e6d5c3; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #89582F; }
        .nav-logo { flex: 0 0 auto; margin: 0 5rem; display: flex; justify-content: center; }
        .hamburger-menu { display: none; }
        .hero-content { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; flex: 1; padding: 2rem; text-align: center; box-sizing: border-box; }
        .text-wrapper { display: flex; flex-direction: column; align-items: center; max-width: 860px; }
        .hero-title { font-family: 'GreatVibes', cursive; font-size: 72px; font-weight: normal; color: #e6d5c3; margin-bottom: 0.5rem; line-height: 1; text-align: center; text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.55); opacity: 0; animation: contentSlideUp 0.8s ease-out 0.8s forwards; }
        .hero-divider { width: 40%; height: 2px; background: rgba(181, 128, 69, 0.6); margin-top: 1rem; margin-bottom: 1.5rem; opacity: 0; animation: contentSlideUp 0.8s ease-out 1.0s forwards; text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.55);}
        .hero-desc { font-family: 'Arpona', serif; font-size: 26px; font-weight: normal; color: rgba(230, 213, 195, 0.9); line-height: 1.4; width: 100%; margin-bottom: 2.5rem; text-align: center; opacity: 0; animation: contentSlideUp 0.8s ease-out 1.2s forwards; text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.55);}
        .hero-buttons { display: flex; gap: 1.5rem; opacity: 0; animation: contentSlideUp 0.8s ease-out 1.4s forwards; }
        .btn { font-family: 'Arpona', serif; font-weight: bold; letter-spacing: 0.0em; text-transform: uppercase; font-size: 20px; width: 220px; padding: 12px 36px; box-sizing: border-box; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: all 0.3s; }
        .btn-primary { background-color: #e6d5c3; color: #1c1c1c; border: 1px solid #89582F; }
        .btn-primary:hover { background-color: #89582F; color: #FFFFFF;}
        .btn-secondary { background-color: transparent; color: #e6d5c3; border: 1px solid rgba(181, 128, 69, 0.6); }
        .btn-secondary:hover { background-color: rgba(181, 128, 69, 0.2); }
        .hero-footer { text-align: center; padding: 1rem 0 2rem 0; opacity: 0; animation: contentSlideUp 0.8s ease-out 1.6s forwards; }
        .hero-footer p { color: #b58045; font-style: italic; letter-spacing: 0.15em; font-size: 14px; margin: 0; }

        /* --- MOBILE MENU CSS --- */
        .mobile-menu { position: fixed; top: 0; right: 0; width: 100%; height: 100%; z-index: 100; background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); display: flex; flex-direction: column; align-items: center; padding: 1.5rem 2rem 2rem; transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .mobile-menu.open { transform: translateX(0); }
        .menu-close-btn { align-self: flex-end; background: none; border: none; color: #fff; font-size: 28px; cursor: pointer; padding: 0; }
        .menu-logo { margin: 1rem 0 3rem; }
        .menu-nav { display: flex; flex-direction: column; width: 100%; max-width: 280px; gap: 0.5rem; }
        .menu-link { color: #fff; text-decoration: none; font-size: 18px; padding: 14px 24px; box-sizing: border-box; width: 100%; opacity: 0; transform: translateX(30px); transition: all 0.4s ease; }
        .mobile-menu.open .menu-link { opacity: 1; transform: translateX(0); }
        .menu-link.active { background-color: #89582F; border-radius: 30px; }
        .mobile-menu.open .menu-link:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu.open .menu-link:nth-child(2) { transition-delay: 0.2s; }
        .mobile-menu.open .menu-link:nth-child(3) { transition-delay: 0.3s; }
        .mobile-menu.open .menu-link:nth-child(4) { transition-delay: 0.4s; }
        .mobile-menu.open .menu-link:nth-child(5) { transition-delay: 0.5s; }
        .menu-footer-box { margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; width: 100%; opacity: 0; transform: translateY(20px); transition: all 0.5s ease 0.6s; }
        .mobile-menu.open .menu-footer-box { opacity: 1; transform: translateY(0); }
        .menu-socials { display: flex; gap: 1.5rem; }
        .menu-socials img { width: 28px; height: 28px; }
        .btn-whatsapp { display: flex; align-items: center; justify-content: center; gap: 10px; background-color: #89582F; color: #fff; text-decoration: none; border-radius: 30px; width: 100%; max-width: 280px; padding: 14px; font-size: 16px; border: none; cursor: pointer; }
        .btn-whatsapp img { width: 24px; height: 24px; }
        .menu-copyright { color: #fff; font-size: 12px; margin-top: 0.5rem; }

        @media (max-width: 768px) {
          .hero-bg, .smoke-layer { background-position: 65% top; }
          .navbar { padding: 1.5rem; justify-content: flex-start; }
          .nav-links { display: none; }
          .hamburger-menu { display: block; width: 30px; height: auto; cursor: pointer; position: absolute; left: 1.5rem; opacity: 0; animation: navSlideDown 0.8s ease-out 0.5s forwards; z-index: 20;}
          .nav-logo { margin: 0 auto; }
          .nav-logo img { width: 140px !important; height: auto !important; }
          .hero-title { font-size: 52px; white-space: normal; margin-bottom: 0.2rem; }
          .hero-divider { width: 80%; margin-top: 0.5rem; margin-bottom: 1rem;}
          .hero-desc { font-size: 15px; }
          .hero-buttons { flex-direction: row; gap: 15px; width: 100%; justify-content: center; margin-top: -0.75rem; margin-bottom: 0.1rem; }
          .btn { width: 156px; padding: 12px 0; font-size: 16px; margin-bottom: -1rem; }
        }

        /* --- SHOWCASE SECTION (VIDEO & THE EL BACAN) --- */
        .showcase-section { position: relative; width: 100%; min-height: 100vh; background: #000000; display: flex; align-items: center; justify-content: center; z-index: 10; overflow: hidden; }
        .showcase-top-gradient { position: absolute; top: 0; left: 0; width: 100%; height: 25vh; background: linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%); z-index: 5; pointer-events: none; }
        .showcase-video-wrapper { position: absolute; inset: 0; display: flex; justify-content: center; align-items: center; z-index: 1; transition: opacity 1.5s ease-out; }
        .showcase-video-wrapper.fade-out { opacity: 0; pointer-events: none; }
        .showcase-video { width: 100vw; height: 100vh; object-fit: cover; }
        .new-showcase-content { position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 8%; opacity: 0; pointer-events: none; transition: opacity 1.2s ease-in-out; background: linear-gradient(to bottom, #000000 0%, #89582f 100%); }
        .new-showcase-content::before { content: ""; position: absolute; inset: 0; background-image: url('/images/texture.png'); background-size: cover; background-position: center; opacity: 0.2; z-index: -1; }
        .new-showcase-content.visible { opacity: 1; pointer-events: auto; transition-delay: 0.5s; }
        .new-section-title { font-family: 'Arpona-Semibold', serif; font-size: 48px; color: #ffffff; margin-bottom: 1rem; text-align: center; }
        .new-section-divider { width: 64px; height: 6px; background-color: #89582f; margin: 0 auto 2rem auto; border-radius: 10px; }
        .new-section-desc { font-family: 'Arpona', serif; font-size: 26px; color: #ffffff; text-align: center; max-width: 1100px; margin: 0 auto 4rem auto; line-height: 1.5; }
        .features-grid { display: flex; gap: 2rem; justify-content: center; width: 100%; max-width: 1200px; }
        .feature-card { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2rem 1.5rem; border-radius: 12px; border: 2px solid transparent; transition: border-color 0.3s; }
        .feature-card:hover { border-color: #e6d5c3; }
        .feature-img { width: 320px; height: 320px; object-fit: contain; margin-bottom: 1.5rem; border-radius: 50%; }
        .feature-title { font-family: 'Arpona-Semibold', serif; font-size: 24px; color: #ffffff; margin-bottom: 0.8rem; }
        .feature-desc { font-family: 'Arpona', serif; font-size: 16px; color: #e6d5c3; line-height: 1.5; }
        .slider-dots { display: none; } 

        @media (max-width: 768px) {
          .new-showcase-content { padding: 4rem 1.5rem; }
          .new-section-title { font-size: 36px; }
          .new-section-desc { font-size: 16px; margin-bottom: 2rem; }
          .features-grid { flex-direction: row; overflow-x: auto; scroll-snap-type: x mandatory; justify-content: flex-start; gap: 1rem; padding-bottom: 1rem; width: 100vw; margin-left: -1.5rem; margin-right: -1.5rem; padding-left: 7.5vw; padding-right: 7.5vw; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .features-grid::-webkit-scrollbar { display: none; } 
          .feature-card { min-width: 85vw; flex-shrink: 0; scroll-snap-align: center; padding: 1rem; }
          .feature-card:hover { border-color: transparent; } 
          .feature-img { width: 240px; height: 240px; }
          .slider-dots { display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 1rem; }
          .slider-dot { height: 12px; border-radius: 12px; transition: all 0.3s ease; }
          .slider-dot.active { width: 36px; background-color: #89582f; }
          .slider-dot.inactive { width: 12px; background-color: #ffffff; }
        }

        /* --- THE WRAPPER SECTION --- */
        .wrapper-section { position: relative; width: 100%; min-height: 100vh; background: #000000; display: flex; flex-direction: column; align-items: center; padding: 6rem 8% 0 8%; box-sizing: border-box; z-index: 10; overflow: hidden; }
        .wrapper-header { text-align: center; margin-bottom: 4rem; width: 100%; z-index: 2; }
        .wrapper-desc { font-family: 'Arpona', serif; font-size: 18px; color: #ffffff; text-align: center; max-width: 900px; margin: 0 auto; line-height: 1.6; }
        
        .wrapper-content-box { display: flex; width: 100%; max-width: 1200px; gap: 4rem; align-items: stretch; justify-content: center; z-index: 2; flex: 1; }
        
        .wrapper-slider-container { position: relative; width: 100%; display: flex; justify-content: center; flex: 1; max-width: 450px; align-self: center; margin-bottom: 6rem; }
        .wrapper-accordion { width: 100%; display: flex; flex-direction: column; border: 1px solid #1c1c1c; }
        .accordion-item { padding: 1.5rem 2rem; background: #141414; border-bottom: 1px solid #0a0a0a; cursor: pointer; transition: background-color 0.4s ease; overflow: hidden; }
        .accordion-item:last-child { border-bottom: none; }
        
        .acc-subtitle { font-family: 'Arpona', serif; font-size: 11px; color: #e6d5c3; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; display: block; opacity: 0.8; }
        .accordion-item.active .acc-subtitle { color: #fdfaf6; opacity: 0.9; }
        .acc-title { font-family: 'Arpona-Semibold', serif; font-size: 22px; color: #ffffff; margin: 0; }
        
        .acc-desc { max-height: 0; opacity: 0; font-family: 'Arpona', serif; font-size: 15px; color: #fdfaf6; line-height: 1.6; transition: all 0.4s ease; margin-top: 0; }
        .accordion-item.active .acc-desc { max-height: 200px; opacity: 1; margin-top: 1.2rem; }
        
        .wrapper-img-container { flex: 1; display: flex; justify-content: center; align-items: flex-end; position: relative; }
        
        .wrapper-img { position: absolute; bottom: 0; width: 100%; max-width: 624px; object-fit: contain; opacity: 0; transition: opacity 0.8s ease-in-out; display: block; }
        .wrapper-img.active { opacity: 1; z-index: 2; }
        .wrapper-img.placeholder { position: relative; opacity: 0; pointer-events: none; z-index: 0; }
        
        .slider-arrow-wrapper { display: none; }

        @media (max-width: 768px) {
          .wrapper-section { padding: 4rem 1.5rem 0; }
          .wrapper-content-box { flex-direction: column-reverse; gap: 0; width: 100%; } 
          .wrapper-desc { font-size: 16px; }
          
          .wrapper-img { max-width: 90%; }
          .wrapper-img-container { margin-bottom: 0; z-index: 1; }
          
          .wrapper-slider-container { max-width: 100%; align-self: center; margin-bottom: 0; }
          
          .slider-arrow-wrapper { display: flex; position: absolute; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.5); font-size: 32px; z-index: 10; cursor: pointer; padding: 10px; }
          .slider-arrow-wrapper.left { left: 5px; }
          .slider-arrow-wrapper.right { right: 5px; }

          .wrapper-accordion { flex-direction: row; overflow-x: auto; scroll-snap-type: x mandatory; width: 100vw; margin-left: -1.5rem; margin-right: -1.5rem; padding-left: 7.5vw; padding-right: 7.5vw; gap: 1rem; border: none; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .wrapper-accordion::-webkit-scrollbar { display: none; } 
          
          .accordion-item { width: 85vw; min-width: 85vw; max-width: 85vw; flex-shrink: 0; scroll-snap-align: center; border-radius: 8px; border: 1px solid #2a2a2a; white-space: normal; word-wrap: break-word; }
          
          .acc-desc { max-height: 500px; opacity: 1; margin-top: 1.2rem; }
          .acc-subtitle { color: #fdfaf6; opacity: 0.9; }
        }

        /* --- OUR COLLECTION SECTION --- */
        .collection-section { position: relative; width: 100%; min-height: 100vh; background-color: #fdfaf6; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6rem 5%; box-sizing: border-box; z-index: 10; }
        .collection-section::before { content: ""; position: absolute; inset: 0; background-image: url('/images/texture.png'); background-size: cover; background-position: center; opacity: 0.05; z-index: -1; }
        .collection-title { font-family: 'Arpona-Semibold', serif; font-size: 48px; color: #1c1c1c; margin-bottom: 1.5rem; text-align: center; }
        .collection-desc { font-family: 'Arpona', serif; font-size: 20px; color: #1c1c1c; text-align: center; max-width: 900px; line-height: 1.6; margin-bottom: 3rem; }
        .collection-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 3rem; }
        .tab-btn { 
          font-family: 'Arpona-Semibold', serif; 
          font-size: 18px; 
          padding: 10px 28px; 
          cursor: pointer; 
          background-color: #ffffff; 
          color: #1c1c1c; 
          border: 2px solid #d1c8bb; 
          transition: all 0.3s ease; 
          border-radius: 6px; 
        }
        .tab-btn:hover { border-color: #89582f; color: #89582f; }
        .tab-btn.active { background-color: #89582f; color: #ffffff; border-color: #89582f; }
        
        .collection-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; width: 100%; max-width: 1300px; }
        .product-card { background: #ffffff; border-radius: 8px; padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05); position: relative; border: 1px solid #f0e9df; cursor: pointer; transition: transform 0.3s ease; }
        .product-card:hover { transform: translateY(-5px); }
        .card-badge { position: absolute; top: 1.5rem; right: -0.5rem; background-color: #c01b1b; color: #ffffff; font-family: 'Arpona-Semibold', serif; font-size: 11px; text-transform: uppercase; padding: 6px 12px; letter-spacing: 0.05em; z-index: 2; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        .product-img-box { width: 100%; height: 260px; display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem; }
        .product-img { 
          max-width: 100%; 
          max-height: 100%; 
          object-fit: contain; 
          mix-blend-mode: multiply;
        }
        .product-brand { font-family: 'Arpona', serif; font-size: 12px; color: #b58045; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
        .product-name { font-family: 'Arpona-Semibold', serif; font-size: 22px; color: #1c1c1c; text-align: center; margin-bottom: 1.5rem; min-height: 52px; display: flex; align-items: center; justify-content: center; }
        .desktop-specs { display: contents; }
        .mobile-wrapper-only { display: none; }
        .spec-row { display: flex; justify-content: center; gap: 0.5rem; width: 100%; margin-bottom: 0.8rem; flex-wrap: wrap; }
        .spec-item { background: #f5f2eb; padding: 6px 10px; border-radius: 4px; display: flex; align-items: center; gap: 6px; font-family: 'Arpona', serif; font-size: 13px; color: #1c1c1c; white-space: nowrap; }
        .spec-icon { width: 16px; height: 16px; fill: #89582f; }
        .intensity-dots { display: flex; gap: 3px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background-color: #d1c8bb; }
        .dot.filled { background-color: #89582f; }
        .btn-learn-more { margin-top: auto; width: 100%; background-color: #89582f; color: #ffffff; font-family: 'Arpona-Semibold', serif; font-size: 14px; text-transform: uppercase; padding: 14px 0; border: none; cursor: pointer; transition: background-color 0.3s ease; border-radius: 4px; }
        .btn-learn-more:hover { background-color: #6a4322; }

        /* PRODUCT MODAL */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; justify-content: center; align-items: center; padding: 1.5rem; box-sizing: border-box; opacity: 0; animation: pageFadeIn 0.3s forwards; }
        .modal-content { background: #ffffff; border-radius: 8px; padding: 3rem 1.5rem 2rem; width: 100%; max-width: 400px; display: flex; flex-direction: column; align-items: center; position: relative; border: 1px solid #f0e9df; }
        .modal-close { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 28px; color: #1c1c1c; cursor: pointer; }
        .modal-img-box { width: 100%; height: 300px; display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem; }
        .modal-img { max-width: 100%; max-height: 100%; object-fit: contain; }

        @media (max-width: 1024px) {
          .collection-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .collection-section { padding: 4rem 1.5rem; justify-content: flex-start; }
          .collection-title { font-size: 36px; }
          .collection-desc { font-size: 16px; margin-bottom: 2rem; }
          .collection-tabs { margin-bottom: 2rem; }
          .tab-btn { padding: 8px 16px; font-size: 14px; }
          
          /* Ubah Collection jadi Grid 2 Kolom untuk Mobile */
          .collection-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; margin: 0; padding: 0; }
          .product-card { padding: 1rem 0.5rem; min-height: 220px; justify-content: flex-start; }
          .product-img-box { height: 130px; margin-bottom: 1rem; }
          .product-name { font-size: 16px; margin-bottom: 0; min-height: auto; }
          
          /* Sembunyikan elemen detail di mode Grid Mobile */
          .desktop-specs, .product-brand, .btn-learn-more { display: none; }
          
          /* Tampilkan nama wrapper khusus di mobile */
          .mobile-wrapper-only { display: block; font-family: 'Arpona', serif; font-size: 12px; color: #89582f; text-align: center; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        }

        /* --- B2B / WHOLESALE SECTION --- */
        .wholesale-section { 
          position: relative; width: 100%; padding: 6rem 8%; box-sizing: border-box; 
          background-color: #1f1f1f; 
          background-image: repeating-linear-gradient(45deg, #1c1c1c, #1c1c1c 8px, #1a1a1a 8px, #1a1a1a 16px);
          display: flex; justify-content: center; z-index: 10;
        }
        .wholesale-content { display: flex; flex-direction: row; max-width: 1200px; width: 100%; gap: 5rem; align-items: center; }
        
        .wholesale-text { flex: 1; display: flex; flex-direction: column; }
        .ws-title { font-family: 'Arpona-Semibold', serif; font-size: 40px; color: #ffffff; margin: 0 0 1rem 0; line-height: 1.2; }
        .ws-divider { width: 64px; height: 4px; background-color: #89582f; margin-bottom: 2rem; border-radius: 4px; }
        .ws-desc { font-family: 'Arpona', serif; font-size: 16px; color: #cccccc; line-height: 1.6; margin-bottom: 1.5rem; }
        
        .ws-contact-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .ws-contact-item { display: flex; align-items: center; gap: 10px; font-family: 'Arpona', serif; font-size: 14px; color: #b58045; letter-spacing: 0.05em; text-transform: uppercase; }
        .ws-icon { width: 20px; height: 20px; fill: #b58045; }

        .wholesale-form-box { flex: 1; background: #ffffff; padding: 3rem; border-radius: 2px; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .form-title { font-family: 'Arpona-Semibold', serif; font-size: 24px; color: #1c1c1c; margin: 0 0 2rem 0; text-align: center; }
        
        .ws-input { 
          width: 100%; border: none; border-bottom: 1px solid #e0e0e0; padding: 12px 0; 
          font-family: 'Arpona', serif; font-size: 12px; color: #1c1c1c; margin-bottom: 1.5rem; 
          background: transparent; outline: none; transition: border-color 0.3s;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .ws-input::placeholder { color: #999999; }
        .ws-input:focus { border-bottom-color: #89582f; }
        .input-row { display: flex; gap: 2rem; width: 100%; }
        
        .btn-wholesale { 
          width: 100%; background-color: #2a2a2a; color: #ffffff; font-family: 'Arpona', serif; 
          font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; 
          padding: 16px 0; border: none; cursor: pointer; transition: background-color 0.3s ease; 
          margin-top: 1rem; border-radius: 2px;
        }
        .btn-wholesale:hover { background-color: #89582f; }

        @media (max-width: 768px) {
          .wholesale-section { padding: 4rem 1.5rem; }
          .wholesale-content { flex-direction: column; gap: 3rem; }
          .ws-title { font-size: 32px; }
          .wholesale-form-box { padding: 2rem 1.5rem; width: 100%; box-sizing: border-box; }
          .input-row { flex-direction: column; gap: 0; }
        }

        /* --- FOOTER --- */
        .footer { 
          width: 100%; background-color: #0a0a0a; padding: 2rem 1.5rem; 
          display: flex; flex-direction: column; align-items: center; justify-content: center; 
          text-align: center; box-sizing: border-box; z-index: 10; position: relative;
        }
        .footer-title { font-family: 'Arpona-Semibold', serif; font-size: 14px; color: #e6d5c3; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.5rem 0; }
        .footer-copy { font-family: 'Arpona', serif; font-size: 12px; color: #888888; margin: 0; }
      `}} />

      {stage !== 'home' && (
        <>
          <div className={`age-page-background ${stage === 'transition' ? 'exit-anim' : ''}`} />
          <div className="age-content-wrapper">
            <div className={`age-logo-box ${stage === 'transition' ? 'exit-anim' : ''}`}>
              <div className="base-layer"></div>
              <div className="mask-layer"><div className="light-beam"></div></div>
            </div>
            <div className={`age-bottom-content ${stage === 'transition' ? 'exit-anim' : ''}`}>
              <p className="age-text">Are You 21+ years of age?</p>
              <div className="age-button-group">
                <button onClick={handleYesClick} className="age-button">YES</button>
                <button onClick={() => window.location.href = 'https://google.com'} className="age-button">NO</button>
              </div>
            </div>
          </div>
        </>
      )}

      {stage === 'home' && (
        <div className="home-container">
          <div className="hero-bg"></div>
          <div className="smoke-wrapper"><div className="smoke-layer"></div></div>
          <div className="hero-gradient"></div>

          <div className={`content-layer ${isMenuOpen ? 'shifted' : ''}`}>
            
            {/* --- HERO SECTION --- */}
            <div className="hero-section-wrapper">
              <nav className="navbar">
                <img src="/images/hamburger.svg" alt="Menu" className="hamburger-menu" onClick={() => setIsMenuOpen(true)} />
                <div className="nav-links left"><a href="#">Collection</a><a href="#">Discover</a></div>
                <div className="nav-logo">
                  <Image src="/images/elbacan-logo-v2.svg" alt="El Bacán Logo" width={200} height={180} priority />
                </div>
                <div className="nav-links right"><a href="#">Art of Aging</a><a href="#">Wholesale</a></div>
              </nav>

              <main className="hero-content">
                <div className="text-wrapper">
                  <h1 className="hero-title">La tradición se fuma con estilo</h1>
                  <div className="hero-divider"></div>
                  <p className="hero-desc">
                    Premium handmade cigars from Nicaragua. Consistent in construction, refined in character, and made for those who expect more.
                  </p>
                </div>
                <div className="hero-buttons">
                  <button className="btn btn-primary">Collection</button>
                  <button className="btn btn-secondary">Discover</button>
                </div>
              </main>

              <div className="hero-footer">
                <p>NOT JUST A CIGAR. A STATEMENT OF PRESENCE...</p>
              </div>
            </div>

            {/* --- SHOWCASE / THE EL BACAN --- */}
            <section className="showcase-section">
              <div className="showcase-top-gradient"></div>
              
              <div className={`showcase-video-wrapper ${isVideoFinished ? 'fade-out' : ''}`}>
                <video 
                  ref={videoRef}
                  muted 
                  playsInline 
                  className="showcase-video"
                  onEnded={() => setIsVideoFinished(true)} 
                >
                  <source src="/videos/cigar-animation.webm" type="video/webm" />
                  <source src="/videos/cigar-animation.mp4" type="video/mp4" />
                </video>
              </div>
              
              <div className={`new-showcase-content ${isVideoFinished ? 'visible' : ''}`}>
                <h2 className="new-section-title">The EL BACÁN</h2>
                <div className="new-section-divider"></div>
                <p className="new-section-desc">
                  We do not just roll cigars, we engineer perfection. Every El Bacan cigar is a testament to rigorous quality control, ensuring absolute consistency, a flawless draw, and an even burn from the first light to the final ash.
                </p>
                
                <div className="features-grid" onScroll={handleSlideScroll}>
                  <div className="feature-card">
                    <img src="/images/illustration-01.png" alt="Authentic Craftmanship" className="feature-img" />
                    <h4 className="feature-title">Authentic Craftmanship</h4>
                    <p className="feature-desc">Handmade in Nicaragua using traditional techniques that prioritize construction, consistency, and draw.</p>
                  </div>
                  <div className="feature-card">
                    <img src="/images/illustration-02.png" alt="Elite Leaf Selection" className="feature-img" />
                    <h4 className="feature-title">Elite Leaf Selection</h4>
                    <p className="feature-desc">Selected and aged tobacco leaves, processed to achieve balance, smoothness, and reliable performance in every cigar.</p>
                  </div>
                  <div className="feature-card">
                    <img src="/images/illustration-03.png" alt="Distinctive Flavor Profile" className="feature-img" />
                    <h4 className="feature-title">Distinctive Flavor Profile</h4>
                    <p className="feature-desc">A balanced smoking experience with evolving notes—from the first draw to a clean, consistent finish.</p>
                  </div>
                </div>

                <div className="slider-dots">
                  <div className={`slider-dot ${activeSlide === 0 ? 'active' : 'inactive'}`}></div>
                  <div className={`slider-dot ${activeSlide === 1 ? 'active' : 'inactive'}`}></div>
                  <div className={`slider-dot ${activeSlide === 2 ? 'active' : 'inactive'}`}></div>
                </div>
              </div>
            </section>

            {/* --- THE WRAPPER --- */}
            <section className="wrapper-section">
              <div className="wrapper-header">
                <h2 className="new-section-title">The Wrapper</h2>
                <div className="new-section-divider"></div>
                <p className="wrapper-desc">
                  The wrapper is the soul of the cigar, dictating up to 70% of its final flavor profile. Explore the distinct character, textures, and complex tasting notes of our meticulously aged leaves.
                </p>
              </div>

              <div className="wrapper-content-box">
                <div className="wrapper-slider-container">
                  <div className="slider-arrow-wrapper left" onClick={() => handleWrapperArrowClick('left')}>&#10094;</div>
                  
                  <div className="wrapper-accordion" onScroll={handleWrapperScroll} ref={wrapperSliderRef}>
                    {wrapperData.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`accordion-item ${activeWrapper === idx ? 'active' : ''}`}
                        onClick={() => setActiveWrapper(idx)}
                        style={{ backgroundColor: activeWrapper === idx ? item.bgColor : '#141414' }}
                      >
                        <span className="acc-subtitle">{item.subtitle}</span>
                        <h3 className="acc-title">{item.title}</h3>
                        <div className="acc-desc">
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="slider-arrow-wrapper right" onClick={() => handleWrapperArrowClick('right')}>&#10095;</div>
                </div>

                <div className="wrapper-img-container">
                  <img src={wrapperData[0].image} className="wrapper-img placeholder" alt="Placeholder" />
                  
                  {wrapperData.map((item, idx) => (
                    <img 
                      key={idx}
                      src={item.image} 
                      alt={item.title} 
                      className={`wrapper-img ${activeWrapper === idx ? 'active' : ''}`} 
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* --- OUR COLLECTION --- */}
            <section className="collection-section">
              <h2 className="collection-title">Our Collection</h2>
              <div className="new-section-divider"></div>
              <p className="collection-desc">
                Explore our three distinct blends through this interactive dashboard.
              </p>

              <div className="collection-tabs">
                {['ORIGINAL', 'PREMIUM EDITION', 'BEST SELLER'].map((tab) => (
                  <button 
                    key={tab} 
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="collection-grid">
                {filteredCollection.map((cigar, index) => (
                  <div className="product-card" key={index} onClick={() => setSelectedProduct(cigar)}>
                    {cigar.badge && <div className="card-badge">{cigar.badge}</div>}
                    <div className="product-img-box">
                      <img src={cigar.image} alt={cigar.name} className="product-img" />
                    </div>
                    <span className="product-brand">ELBACAN</span>
                    <h3 className="product-name">{cigar.name}</h3>
                    
                    {/* Tampil Khusus Grid Mobile */}
                    <div className="mobile-wrapper-only">{cigar.wrapper}</div>

                    {/* Bungkus Spec Desktop & Button biar gampang di hide via CSS Mobile */}
                    <div className="desktop-specs">
                      <div className="spec-row">
                        <div className="spec-item">
                          <svg className="spec-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                          {cigar.ring}
                        </div>
                        <div className="spec-item">
                          <svg className="spec-icon" viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v10z"/></svg>
                          {cigar.length}
                        </div>
                        <div className="spec-item">
                          <svg className="spec-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                          {cigar.time}
                        </div>
                      </div>

                      <div className="spec-row" style={{marginBottom: '1.5rem'}}>
                        <div className="spec-item">
                          <svg className="spec-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                          <div className="intensity-dots">
                            {[1, 2, 3, 4, 5].map(num => (
                              <span key={num} className={`dot ${num <= cigar.intensity ? 'filled' : ''}`}></span>
                            ))}
                          </div>
                        </div>
                        <div className="spec-item">
                          <svg className="spec-icon" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.96.3 1.34.3c3.14 0 6.13-2.04 8.78-5.32c3.55-4.41 5.12-9.67 5.22-10.02L20.89 4C20.89 4 19.34 7.42 17 8zM10.87 15.65c-1.39-1.07-2.67-2.64-3.3-4.32l1.64-2.82c1.77 2.19 3.53 3.96 5.22 4.97c-1.01 1.05-2.28 1.83-3.56 2.17z"/></svg>
                          {cigar.wrapper}
                        </div>
                      </div>
                    </div>

                    <button className="btn-learn-more">LEARN MORE</button>
                  </div>
                ))}
              </div>
            </section>

            {/* --- B2B DISTRIBUTION / WHOLESALE SECTION --- */}
            <section className="wholesale-section">
              <div className="wholesale-content">
                
                <div className="wholesale-text">
                  <h2 className="ws-title">Elevate Your Humidor:<br/>B2B Distribution</h2>
                  <div className="ws-divider"></div>
                  <p className="ws-desc">
                    This section is dedicated to our wholesale partners. Join the ranks of the nation's most elite tobacconists. El Bacan is currently expanding its B2B distribution network to select, high-end cigar lounges and premium retailers across the USA, with a special focus on the <strong>luxury lifestyle</strong> market in Miami.
                  </p>
                  <p className="ws-desc">
                    Partnering with El Bacan means offering your clientele an exclusive, highly sought-after product backed by aggressive marketing support and uncompromising inventory consistency.
                  </p>
                  
                  <div className="ws-contact-list">
                    <div className="ws-contact-item">
                      <svg className="ws-icon" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>
                      1-800-EL-BACAN
                    </div>
                    <div className="ws-contact-item">
                      <svg className="ws-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/></svg>
                      WHOLESALE@ELBACANCIGARS.COM
                    </div>
                  </div>
                </div>

                <div className="wholesale-form-box">
                  <h3 className="form-title">Apply for a Wholesale Account</h3>
                  <input type="text" className="ws-input" placeholder="FULL NAME" />
                  <input type="text" className="ws-input" placeholder="BUSINESS NAME" />
                  
                  <div className="input-row">
                    <input type="text" className="ws-input" placeholder="TAX ID / EIN" />
                    <input type="tel" className="ws-input" placeholder="PHONE" />
                  </div>
                  
                  <input type="email" className="ws-input" placeholder="EMAIL" />
                  <button className="btn-wholesale">REQUEST WHOLESALE PRICING</button>
                </div>

              </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="footer">
              <h4 className="footer-title">EL BACAN CIGARS</h4>
              <p className="footer-copy">© 2026 El Bacan. La Tradición Se Fuma Con Estilo. All Rights Reserved.</p>
            </footer>
            
          </div>

          {/* --- MOBILE MENU OVERLAY --- */}
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>&#10005;</button>
            <div className="menu-logo">
              <Image src="/images/elbacan-logo-v2.svg" alt="El Bacán Logo" width={140} height={126} priority />
            </div>
            <nav className="menu-nav">
              <a href="#" className="menu-link active">Home</a>
              <a href="#" className="menu-link">Collection</a>
              <a href="#" className="menu-link">Discover</a>
              <a href="#" className="menu-link">Art of Aging</a>
              <a href="#" className="menu-link">Wholesale</a>
            </nav>
            <div className="menu-footer-box">
              <div className="menu-socials">
                <img src="/images/instagram.svg" alt="Instagram" />
                <img src="/images/fb.svg" alt="Facebook" />
              </div>
              <button className="btn-whatsapp">
                <img src="/images/wa.svg" alt="WhatsApp" />
                WhatsApp
              </button>
              <p className="menu-copyright">© 2026 ElBacan Cigars. All Rights Reserved.</p>
            </div>
          </div>

          {/* --- PRODUCT POP-UP MODAL --- */}
          {selectedProduct && (
            <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedProduct(null)}>&#10005;</button>
                
                <div className="modal-img-box">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-img" />
                </div>
                
                <span className="product-brand" style={{ display: 'block' }}>ELBACAN</span>
                <h3 className="product-name" style={{ minHeight: 'auto', marginBottom: '1.5rem' }}>{selectedProduct.name}</h3>
                
                <div className="spec-row">
                  <div className="spec-item">
                    <svg className="spec-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                    {selectedProduct.ring}
                  </div>
                  <div className="spec-item">
                    <svg className="spec-icon" viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v10z"/></svg>
                    {selectedProduct.length}
                  </div>
                  <div className="spec-item">
                    <svg className="spec-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                    {selectedProduct.time}
                  </div>
                </div>

                <div className="spec-row" style={{ marginBottom: '1.5rem' }}>
                  <div className="spec-item">
                    <svg className="spec-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                    <div className="intensity-dots">
                      {[1, 2, 3, 4, 5].map(num => (
                        <span key={num} className={`dot ${num <= selectedProduct.intensity ? 'filled' : ''}`}></span>
                      ))}
                    </div>
                  </div>
                  <div className="spec-item">
                    <svg className="spec-icon" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.96.3 1.34.3c3.14 0 6.13-2.04 8.78-5.32c3.55-4.41 5.12-9.67 5.22-10.02L20.89 4C20.89 4 19.34 7.42 17 8zM10.87 15.65c-1.39-1.07-2.67-2.64-3.3-4.32l1.64-2.82c1.77 2.19 3.53 3.96 5.22 4.97c-1.01 1.05-2.28 1.83-3.56 2.17z"/></svg>
                    {selectedProduct.wrapper}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}