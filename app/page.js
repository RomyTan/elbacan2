"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ElBacanApp() {
  const [stage, setStage] = useState('checking');
  // Slider states
  const [activeWrapper, setActiveWrapper] = useState(0);
  const [activeWhy, setActiveWhy] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);

  const handleScroll = (e, setIndex) => {
    const el = e.target;
    if (el.children.length > 0) {
      const cardWidth = el.children[0].offsetWidth;
      const index = Math.round(el.scrollLeft / cardWidth);
      setIndex(index);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isVideoFinished, setIsVideoFinished] = useState(false); 
  const [activeSlide, setActiveSlide] = useState(0); 
  const [activeTab, setActiveTab] = useState('PREMIUM EDITION'); 

  const [selectedProduct, setSelectedProduct] = useState(null); // State untuk Pop-Up Mobile

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const videoRef = useRef(null);

  const bgImagePath = "/images/Havana-02a.jpg"; 
  const logoPath = "/images/elbacan-logo-v2.svg";

  const collectionData = [
    { name: 'CHURCHILL', ring: '48', length: '7"', time: '90-120min', intensity: 3, wrapper: 'Habano', image: '/images/eb-std-churchill.jpg', badge: null },
    { name: 'DOUBLE CORONA', ring: '52', length: '8"', time: '90-120min', intensity: 4, wrapper: 'Habano', image: '/images/eb-std-double-corona.jpg', badge: 'BEST SELLER' },
    { name: 'TORPEDO', ring: '52', length: '6 ½"', time: '75-90min', intensity: 4, wrapper: 'Habano', image: '/images/eb-std-torpedo.jpg', badge: null },
    { name: 'TORO', ring: '52', length: '6"', time: '60-75min', intensity: 2, wrapper: 'Habano', image: '/images/eb-std-toro.jpg', badge: null },
    { name: 'ROBUSTO', ring: '50', length: '5"', time: '45-60min', intensity: 2, wrapper: 'Habano', image: '/images/eb-std-robusto.jpg', badge: null },
    { name: 'FUMAS', ring: '44', length: '6⅕"', time: '60-90min', intensity: 2, wrapper: 'Habano', image: '/images/eb-std-fumas.jpg', badge: null },
    { name: 'ELEGANTES', ring: '50', length: '7"', time: '90-120min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-elegantes_connecticut.jpg', badge: 'BEST SELLER' },
    { name: 'ELEGANTES', ring: '50', length: '7"', time: '90-120min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-elegantes_habano.jpg', badge: null },
    { name: 'ELEGANTES', ring: '50', length: '7"', time: '90-120min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-elegantes_maduro.jpg', badge: null },
    { name: 'CLASICOS', ring: '52', length: '6"', time: '60-75min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-clasicos_connecticut.jpg', badge: null },
    { name: 'CLASICOS', ring: '52', length: '6"', time: '60-75min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-clasicos_habano.jpg', badge: null },
    { name: 'CLASICOS', ring: '52', length: '6"', time: '60-75min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-clasicos_maduro.jpg', badge: 'BEST SELLER' },
    { name: 'DISTINTOS', ring: '52', length: '6.5"', time: '75-90min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-distintos_connecticut.jpg', badge: null },
    { name: 'DISTINTOS', ring: '52', length: '6.5"', time: '75-90min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-distintos_habano.jpg', badge: null },
    { name: 'DISTINTOS', ring: '52', length: '6.5"', time: '75-90min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-distintos_maduro.jpg', badge: null },
    { name: 'SELECTOS', ring: '50', length: '5"', time: '45-60min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-selectos_connecticut.jpg', badge: null },
    { name: 'SELECTOS', ring: '50', length: '5"', time: '45-60min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-selectos_habano.jpg', badge: null },
    { name: 'SELECTOS', ring: '50', length: '5"', time: '45-60min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-selectos_maduro.jpg', badge: 'BEST SELLER' },
    { name: 'UNICOS', ring: '60', length: '6"', time: '90-120min', intensity: 2, wrapper: 'Connecticut', image: '/images/ebpe-unicos_connecticut.jpg', badge: null },
    { name: 'UNICOS', ring: '60', length: '6"', time: '90-120min', intensity: 3, wrapper: 'Habano', image: '/images/ebpe-unicos_habano.jpg', badge: null },
    { name: 'UNICOS', ring: '60', length: '6"', time: '90-120min', intensity: 4, wrapper: 'Maduro', image: '/images/ebpe-unicos_maduro.jpg', badge: 'BEST SELLER' },
    { name: 'FUMITAS', ring: '32', length: '4¾"', time: '20-30min', intensity: 4, wrapper: 'Connecticut', image: '/images/eb-fumitas.jpg', badge: 'BEST SELLER' },
  ];

  const wrapperData = [
    {
      subtitle: 'Smooth & Refined',
      title: 'CONNECTICUT',
      desc: 'A silky, shade-grown wrapper offering a smooth yet flavorful experience. Expect notes of toasted almond, cedar, and subtle vanilla, finishing with remarkable creaminess and elegance.',
      image: '/images/wrapper-connecticut.png', 
      bgColor: '#A67B36'
    },
    {
      subtitle: 'Balanced & Complex',
      title: 'HABANO',
      desc: 'Rich, balanced, and beautifully complex. Our Habano wrapper delivers notes of roasted coffee, cedar, earth, and refined pepper spice, creating a medium-bodied experience with exceptional depth.',
      image: '/images/wrapper-habano.png', 
      bgColor: '#5B362A'
    },
    {
      subtitle: 'Bold & Rich',
      title: 'MADURO',
      desc: 'Naturally fermented to achieve a deep, oily character. Our Maduro wrapper offers bold notes of dark chocolate, espresso, black cherry, and subtle sweetness with a rich, lingering finish.',
      image: '/images/wrapper-maduro.png', 
      bgColor: '#312921'
    }
  ];

  const handleYesClick = () => {
    sessionStorage.setItem('elbacan_verified', 'true');
    setStage('transition');
    setTimeout(() => setStage('home'), 1200);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('elbacan_verified') === 'true') {
        setStage('home');
      } else {
        setStage('verification');
      }
    }
  }, []);

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
    const cardWidth = e.target.children.length > 0 ? e.target.children[0].offsetWidth : 1;
    const index = Math.round(e.target.scrollLeft / cardWidth);
    setActiveSlide(index);
  };

  const filteredCollection = collectionData.filter((cigar) => {
    if (activeTab === 'ORIGINAL') return cigar.image.includes('eb-std');
    if (activeTab === 'PREMIUM EDITION') return cigar.image.includes('ebpe');
    if (activeTab === 'FUMITAS') return cigar.image.includes('eb-fumitas');
    if (activeTab === 'MORE') return cigar.badge === 'BEST SELLER';
    return true;
  });

  const scrollToSection = (e, targetId, offset = 120) => {
    if (e) e.preventDefault();
    const element = document.getElementById(targetId);
    
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.href = '/#' + targetId;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <>
      <title>El Bacán - Premium Cigars</title>

      <style dangerouslySetInnerHTML={{ __html: `
        /* --- FONTS & BASE --- */
        @font-face { font-family: 'Arpona'; src: url('/fonts/Arpona-Regular.otf') format('truetype'); font-weight: normal; font-style: normal; }
        @font-face { font-family: 'Arpona-Semibold'; src: url('/fonts/Arpona-SemiBold.otf') format('truetype'); font-weight: bold; font-style: normal; }
        @font-face { font-family: 'GreatVibes'; src: url('/fonts/GreatVibes-Regular.ttf') format('truetype'); font-weight: normal; font-style: normal; }
        
        html, body { margin: 0; padding: 0; overflow-x: hidden; font-family: 'Arpona', serif; background-color: #000000; width: 100%; max-width: 100vw; min-height: 100dvh; }

        /* --- INTRO & AGE VERIFICATION --- */
        @keyframes sweep { 0% { left: -100%; } 100% { left: 100%; } }

        .cinematic-wrapper { position: fixed; inset: 0; background: #000000; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 1.2s ease; }
        .cinematic-wrapper.fade-out-bg { opacity: 0; pointer-events: none; }

        .intro-video-container { position: absolute; inset: 0; z-index: 20; background: #000; transition: opacity 1.5s ease; }
        .intro-video-container.fade-out-video { opacity: 0; pointer-events: none; }
        .intro-video { width: 100%; height: 100%; object-fit: cover; }

        .age-content-wrapper { position: absolute; inset: 0; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 15vh 0 12vh 0; box-sizing: border-box; opacity: 0; transition: opacity 1.5s ease 0.5s; pointer-events: none; }
        .age-content-wrapper.show-verification { opacity: 1; pointer-events: auto; }

        .age-top-content { display: flex; flex-direction: column; align-items: center; width: 100%; }
        .age-logo-box { position: relative; width: 100%; max-width: 280px; aspect-ratio: 500 / 443; margin-bottom: 1rem; }
        @media (min-width: 768px) { .age-logo-box { max-width: 380px; } }
        
        .base-layer { position: absolute; inset: 0; background-image: url('${logoPath}'); background-size: 100% 100%; background-repeat: no-repeat; background-position: center; }
        .mask-layer { position: absolute; inset: 0; -webkit-mask-image: url('${logoPath}'); -webkit-mask-size: 100% 100%; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center; mask-image: url('${logoPath}'); mask-size: 100% 100%; mask-repeat: no-repeat; mask-position: center; overflow: hidden; z-index: 2; }
        .light-beam { position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%); transform: skewX(-25deg); animation: sweep 3s infinite ease-in-out; }

        .age-bottom-content { display: flex; flex-direction: column; align-items: center; }
        .age-text { font-family: 'Arpona-Semibold', serif; font-size: 1.5rem; margin-top: 0; margin-bottom: 0; color: rgb(230, 213, 195); letter-spacing: 0.1rem; text-align: center; }
        .age-text2 { font-family: 'Arpona', serif; font-size: 1.0rem; margin-bottom: 2rem; color: rgb(230, 213, 195); letter-spacing: 0.1rem; text-align: center; }
        @media (min-width: 768px) { .age-text { font-size: 1.9rem; } .age-text2 { font-size: 1.2rem; } }

        .age-button-group { display: flex; gap: 1.0rem; justify-content: center; }
        .age-button { background: transparent; border: 1px solid rgb(230, 213, 195); color: rgb(230, 213, 195); font-family: 'Arpona', serif; font-size: 0.9rem; font-weight: bold; text-transform: uppercase; padding: 0.8rem 2.5rem; cursor: pointer; transition: all 0.3s ease; border-radius: 2px; }
        .age-button:hover { background: rgb(230, 213, 195); color: rgb(28, 28, 28) }

        /* --- HOME PAGE HERO --- */
        @keyframes pageFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes bgFadeIn { 0% { opacity: 0; } 100% { opacity: 0.7; } }
        @keyframes navSlideDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes contentSlideUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }

        .home-container { position: relative; display: flex; flex-direction: column; background-color: #000000; animation: pageFadeIn 0.5s forwards; }
        .hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100dvh; background-image: url('${bgImagePath}'); background-size: cover; background-position: center top; z-index: 0; opacity: 0; animation: bgFadeIn 1.5s ease-out 0.2s forwards; }
        
        .hero-gradient { position: absolute; top: 0; left: 0; width: 100%; height: 100dvh; background: linear-gradient( to bottom, rgba(0, 0, 0, 0.9) 0%, transparent 55%, transparent 65%, #000000 100% ); z-index: 2; pointer-events: none; }
        
        .content-layer { position: relative; z-index: 10; display: flex; flex-direction: column; min-height: 100dvh; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease; }
        .content-layer.shifted { transform: translateX(-60%); opacity: 0; }
        
        .hero-section-wrapper { min-height: 100dvh; display: flex; flex-direction: column; }
        
        .navbar { position: fixed; top: 0; left: 0; width: 100%; z-index: 90; display: flex; justify-content: space-between; align-items: center; padding: 2rem 4rem; box-sizing: border-box; background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .navbar.hidden { transform: translateY(-100%); }
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
        .hero-desc { font-family: 'Arpona', serif; font-size: 24px; font-weight: normal; color: rgba(230, 213, 195, 0.9); line-height: 1.4; width: 100%; margin-bottom: 2.5rem; text-align: center; opacity: 0; animation: contentSlideUp 0.8s ease-out 1.2s forwards; text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.55);}
        .hero-buttons { display: flex; gap: 1.5rem; opacity: 0; animation: contentSlideUp 0.8s ease-out 1.4s forwards; }
        .btn { font-family: 'Arpona', serif; font-weight: bold; letter-spacing: 0.0em; text-transform: uppercase; font-size: 20px; width: 220px; padding: 12px 36px; box-sizing: border-box; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: all 0.3s; }
        .btn-primary { background-color: #e6d5c3; color: #1c1c1c; border: 1px solid #89582F; }
        .btn-primary:hover { background-color: #89582F; color: #FFFFFF;}
        .btn-secondary { background-color: transparent; color: #e6d5c3; border: 1px solid rgba(181, 128, 69, 0.6); }
        .btn-secondary:hover { background-color: rgba(181, 128, 69, 0.2); }
        .hero-footer { text-align: center; padding: 1rem 0 2rem 0; opacity: 0; animation: contentSlideUp 0.8s ease-out 1.6s forwards; }
        .hero-footer p { color: #b58045; font-style: italic; letter-spacing: 0.15em; font-size: 12px; margin: 0; }

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

        /* --- SHOWCASE SECTION --- */
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

        /* --- THE CRAFT SECTION --- */
        .craft-hero { position: relative; width: 100%; min-height: 120vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: url('/images/craft-hero.jpg'); background-size: cover; background-position: center; background-attachment: fixed; text-align: center; z-index: 10; }
        .craft-hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%); }
        .craft-hero-content { position: relative; z-index: 2; }
        .craft-hero-title { font-family: 'GreatVibes', cursive; font-size: 72px; color: #e6d5c3; margin: 0 0 1rem 0; letter-spacing: 0.05em; text-shadow: 0 4px 12px rgba(0,0,0,0.5); }
        .craft-hero-subtitle { font-family: 'Arpona-Semibold', serif; font-size: 16px; color: #ffffff; text-transform: uppercase; letter-spacing: 0.2em; margin: 0; }

        .craft-intro { width: 100%; padding: 8rem 2rem; background-color: #0a0a0a; text-align: center; box-sizing: border-box; z-index: 10; position: relative; }
        .craft-intro-container { max-width: 800px; margin: 0 auto; }
        .craft-intro p { font-family: 'Arpona', serif; font-size: 16px; color: #cccccc; line-height: 1.8; margin-bottom: 2rem; }

        .craft-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5rem; max-width: 1200px; margin: 0 auto; padding: 0 4rem 8rem; background-color: #0a0a0a; box-sizing: border-box; z-index: 10; position: relative; }
        .pillar-card { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .pillar-icon { width: 56px; height: 56px; fill: #b58045; margin-bottom: 2rem; }
        .pillar-title { font-family: 'Arpona-Semibold', serif; font-size: 22px; color: #e6d5c3; margin-bottom: 1.5rem; }
        .pillar-desc { font-family: 'Arpona', serif; font-size: 15px; color: #999999; line-height: 1.7; margin: 0; }

        .craft-transition { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('/images/craft-transition.jpg'); background-size: cover; background-position: center; background-attachment: fixed; text-align: center; padding: 2rem; box-sizing: border-box; z-index: 10; }
        .craft-transition::before { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.7); }
        .transition-content { position: relative; z-index: 2; max-width: 900px; }
        .transition-label { font-family: 'Arpona-Semibold', serif; font-size: 14px; color: #b58045; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 3rem; display: block; }
        .transition-quote { font-family: 'Arpona', serif; font-size: 32px; color: #ffffff; line-height: 1.6; margin-bottom: 2rem; }

        /* --- THE WRAPPER SHOWCASE --- */
        .wrapper-showcase-section { width: 100%; padding: 4rem 2rem 8rem; background-color: #000000; display: flex; justify-content: center; z-index: 10; position: relative; }
        .wrapper-container { display: flex; flex-direction: row; max-width: 1200px; width: 100%; align-items: center; gap: 4rem; }
        .wrapper-accordion { flex: 1; display: flex; flex-direction: column; width: 100%; }
        .accordion-item { padding: 2rem 2.5rem; cursor: pointer; transition: background-color 0.4s ease; border-bottom: 1px solid #222; text-align: left; }
        .accordion-item:last-child { border-bottom: none; }
        .accordion-subtitle { font-family: 'Arpona-Semibold', serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; color: #aaaaaa; transition: color 0.3s; }
        .accordion-item.active .accordion-subtitle { color: #ffffff; }
        .accordion-title { font-family: 'Arpona-Semibold', serif; font-size: 26px; color: #ffffff; margin: 0; transition: color 0.3s; }
        .accordion-desc { font-family: 'Arpona', serif; font-size: 15px; color: #ffffff; line-height: 1.6; margin-top: 1.5rem; margin-bottom: 0; animation: pageFadeIn 0.5s forwards; }
        
        .wrapper-image-col { flex: 1.2; display: flex; justify-content: center; align-items: center; height: 600px; }
        .wrapper-image-display { width: 100%; height: 100%; object-fit: contain; animation: pageFadeIn 0.5s forwards; }
        
        .craft-conclusion { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('/images/craft-conclusion.jpg'); background-size: cover; background-position: center; background-attachment: fixed; text-align: center; padding: 2rem; box-sizing: border-box; z-index: 10; }
        .craft-conclusion::before { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%); }

        /* --- OUR COLLECTION SECTION --- */
        .collection-section { position: relative; width: 100%; min-height: 100vh; background-color: #fdfaf6; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6rem 5%; box-sizing: border-box; z-index: 10; }
        .collection-section::before { content: ""; position: absolute; inset: 0; background-image: url('/images/texture.png'); background-size: cover; background-position: center; opacity: 0.05; z-index: -1; }
        .collection-title { font-family: 'Arpona-Semibold', serif; font-size: 48px; color: #1c1c1c; margin-bottom: 1.5rem; text-align: center; }
        .collection-desc { font-family: 'Arpona', serif; font-size: 16px; color: #1c1c1c; text-align: center; max-width: 1200px; line-height: 1.6; margin-bottom: 3rem; }
        .collection-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 3rem; }
        .tab-btn { font-family: 'Arpona-Semibold', serif; font-size: 18px; padding: 10px 28px; cursor: pointer; background-color: #ffffff; color: #1c1c1c; border: 2px solid #d1c8bb; transition: all 0.3s ease; border-radius: 6px; }
        .tab-btn:hover { border-color: #89582f; color: #89582f; }
        .tab-btn.active { background-color: #89582f; color: #ffffff; border-color: #89582f; }
        
        .collection-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; width: 100%; max-width: 1300px; }
        .product-card { background: #ffffff; border-radius: 8px; padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05); position: relative; border: 1px solid #f0e9df; cursor: pointer; transition: transform 0.3s ease; }
        .product-card:hover { transform: translateY(-5px); }
        .card-badge { position: absolute; top: 1.5rem; right: -0.5rem; background-color: #c01b1b; color: #ffffff; font-family: 'Arpona-Semibold', serif; font-size: 11px; text-transform: uppercase; padding: 6px 12px; letter-spacing: 0.05em; z-index: 2; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        .product-img-box { width: 100%; height: 260px; display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem; }
        .product-img { max-width: 100%; max-height: 100%; object-fit: contain; mix-blend-mode: multiply; }
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
        .modal-content { background: #ffffff; border-radius: 8px; padding: 3rem 2rem 2rem; width: 90%; max-width: 800px; display: flex; flex-direction: column; align-items: center; position: relative; border: 1px solid #f0e9df; }
        .modal-close { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 28px; color: #1c1c1c; cursor: pointer; }
        .modal-img-box { width: 100%; height: 65vh; min-height: 350px; display: flex; justify-content: center; align-items: center; margin-bottom: 2rem; }
        .modal-img { max-width: 100%; max-height: 100%; object-fit: contain; }

        /* --- THE STORY SECTION --- */
        .story-hero { position: relative; width: 100%; min-height: 120vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: url('/images/story-hero.jpg'); background-size: cover; background-position: 65% center; background-attachment: fixed; text-align: center; z-index: 10; }
        .story-hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%); }
        .story-hero-content { position: relative; z-index: 2; }
        .story-hero-title { font-family: 'GreatVibes', cursive; font-size: 72px; color: #e6d5c3; margin: 0 0 1rem 0; letter-spacing: 0.05em; text-shadow: 0 4px 12px rgba(0,0,0,0.5); }
        .story-hero-subtitle { font-family: 'Arpona-Semibold', serif; font-size: 16px; color: #ffffff; text-transform: uppercase; letter-spacing: 0.2em; margin: 0; }

        .story-content-wrapper { position: relative; width: 100%; padding: 6rem 8%; background-color: #0a0a0a; display: flex; flex-direction: column; align-items: center; z-index: 10; box-sizing: border-box; }
        .story-grid { display: flex; flex-direction: column; gap: 6rem; max-width: 1200px; width: 100%; }
        .story-block { display: flex; align-items: center; gap: 4rem; justify-content: space-between; }
        .story-block.reverse { flex-direction: row-reverse; }
        
        .story-text { flex: 1; display: flex; flex-direction: column; }
        .story-text p { font-family: 'Arpona', serif; font-size: 15px; color: #cccccc; line-height: 1.6; margin-bottom: 1rem; }
        .story-text p:last-child { margin-bottom: 0; }
        
        .story-img-box { flex: 1; width: 100%; height: 450px; position: relative; overflow: hidden; border-radius: 4px; }
        .story-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .story-img:hover { transform: scale(1.05); }

        .story-conclusion { text-align: center; max-width: 800px; margin: 6rem auto 0; }
        .story-conclusion p { font-family: 'Arpona', serif; font-size: 20px; color: #cccccc; line-height: 1.8; margin-bottom: 1.5rem; }
        .story-closing { font-family: 'Arpona-Semibold', serif; font-size: 22px; color: #e6d5c3; margin-top: 3rem; letter-spacing: 0.05em; }
        .story-closing strong { display: block; font-size: 32px; margin-bottom: 0.5rem; color: #b58045; }

        /* --- TRADE PARTNERS SECTION --- */
        .trade-section { position: relative; width: 100%; padding: 6rem 8%; background-color: #141414; background-image: repeating-linear-gradient(45deg, #181818, #181818 8px, #141414 8px, #141414 16px); display: flex; flex-direction: column; align-items: center; z-index: 10; box-sizing: border-box; }
        .trade-container { max-width: 1200px; width: 100%; display: flex; flex-direction: column; align-items: center; }
        
        .trade-intro { text-align: center; max-width: 900px; margin-bottom: 5rem; }
        .trade-intro p { font-family: 'Arpona', serif; font-size: 16px; color: #cccccc; line-height: 1.8; margin-bottom: 1.5rem; }
        .btn-trade-main { background-color: #89582f; color: #ffffff; font-family: 'Arpona-Semibold', serif; font-size: 16px; text-transform: uppercase; padding: 16px 36px; border: none; cursor: pointer; transition: background-color 0.3s ease; border-radius: 2px; margin-top: 1rem; letter-spacing: 0.05em; }
        .btn-trade-main:hover { background-color: #6a4322; }

        .trade-subheading { font-family: 'Arpona-Semibold', serif; font-size: 32px; color: #ffffff; text-align: center; margin-bottom: 4rem; }
        
        /* Why Partner Grid */
        .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; width: 100%; margin-bottom: 6rem; }
        .why-card { background: #1c1c1c; border: 1px solid #2a2a2a; padding: 2.5rem; border-radius: 4px; }
        .why-title { font-family: 'Arpona-Semibold', serif; font-size: 22px; color: #e6d5c3; margin-bottom: 1rem; }
        .why-desc { font-family: 'Arpona', serif; font-size: 15px; color: #aaaaaa; line-height: 1.6; margin: 0; }

        /* Who We Partner With */
        .who-box { width: 100%; background: #191919; border: 1px solid #2a2a2a; padding: 4rem 3rem; border-radius: 4px; margin-bottom: 6rem; text-align: center; }
        .who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2.5rem; text-align: left; max-width: 900px; margin-left: auto; margin-right: auto; }
        .who-item { font-family: 'Arpona', serif; font-size: 16px; color: #e6d5c3; display: flex; align-items: center; gap: 10px; }
        .who-item::before { content: "•"; color: #89582f; font-size: 20px; }

        /* Advantage */
        .advantage-box { text-align: center; max-width: 900px; margin-bottom: 6rem; }
        .advantage-box h3 { font-family: 'Arpona-Semibold', serif; font-size: 26px; color: #FFFFFF; margin-bottom: 1.5rem; font-style: italic; }
        .advantage-box p { font-family: 'Arpona', serif; font-size: 18px; color: #cccccc; line-height: 1.8; margin-bottom: 1.5rem; }

        /* Process Steps */
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; width: 100%; margin-bottom: 6rem; text-align: center; }
        .process-card { background: #1c1c1c; border: 1px solid #2a2a2a; padding: 2rem 1.5rem; border-radius: 4px; display: flex; flex-direction: column; align-items: center; }
        .process-num { font-family: 'Arpona-Semibold', serif; font-size: 36px; color: #89582f; margin-bottom: 1rem; }
        .process-title { font-family: 'Arpona-Semibold', serif; font-size: 18px; color: #ffffff; }

        /* Form Section */
        .trade-form-box { width: 100%; max-width: 800px; background: #ffffff; padding: 4rem; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-bottom: 6rem; box-sizing: border-box; }
        .trade-form-title { font-family: 'Arpona-Semibold', serif; font-size: 28px; color: #1c1c1c; text-align: center; margin-bottom: 2.5rem; }
        .trade-input { width: 100%; border: none; border-bottom: 1px solid #e0e0e0; padding: 12px 0; font-family: 'Arpona', serif; font-size: 14px; color: #1c1c1c; margin-bottom: 1.8rem; background: transparent; outline: none; transition: border-color 0.3s; }
        .trade-input::placeholder { color: #999999; }
        .trade-input:focus { border-bottom-color: #89582f; }
        .trade-input-row { display: flex; gap: 2rem; width: 100%; }

        /* Trust Closing */
        .trust-box { text-align: center; max-width: 800px; }
        .trust-box p { font-family: 'Arpona', serif; font-size: 18px; color: #cccccc; line-height: 1.8; margin-bottom: 1.5rem; }
        .trust-box h4 { font-family: 'Arpona-Semibold', serif; font-size: 22px; color: #e6d5c3; margin-top: 2rem; }

        /* --- FOOTER --- */
        .footer { width: 100%; background-color: #0a0a0a; padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-sizing: border-box; z-index: 10; position: relative; }
        .footer-title { font-family: 'Arpona-Semibold', serif; font-size: 14px; color: #e6d5c3; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.5rem 0; }
        .footer-copy { font-family: 'Arpona', serif; font-size: 12px; color: #888888; margin: 0; }
        
        .mobile-dots { display: none; } 

        /* =========================================================================
           ALL MOBILE OVERRIDES (HARUS PALING BAWAH SUPAYA TIDAK KETIMPA DESKTOP) 
           ========================================================================= */
        @media (max-width: 1024px) {
          .collection-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .craft-hero, .story-hero { background-attachment: scroll !important; }
          .hero-bg, .smoke-layer { background-position: 57% center; background-size: 400% auto; background-repeat: no-repeat; }
          .navbar { padding: 1.5rem; justify-content: flex-start; }
          .nav-links { display: none; }
          .hamburger-menu { display: block; width: 30px; height: auto; cursor: pointer; position: absolute; left: 1.5rem; opacity: 0; animation: navSlideDown 0.8s ease-out 0.5s forwards; z-index: 20;}
          .nav-logo { margin: 0 auto; }
          .nav-logo img { width: 140px !important; height: auto !important; }
          .hero-title { font-size: 48px; white-space: normal; margin-bottom: 0.2rem; }
          .hero-divider { width: 80%; margin-top: 0.5rem; margin-bottom: 1rem;}
          .hero-desc { font-size: 14px; }
          .hero-buttons { flex-direction: row; gap: 15px; width: 100%; justify-content: center; margin-top: -0.75rem; margin-bottom: 0.1rem; }
          .btn { width: 156px; padding: 12px 0; font-size: 16px; margin-bottom: -1rem; }

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

          .craft-hero-title { font-size: 56px; }
          .craft-hero-subtitle { font-size: 12px; }
          .craft-intro, .craft-wrappers { padding: 5rem 1.5rem; }
          .craft-pillars { grid-template-columns: 1fr; gap: 4rem; padding: 0 1.5rem 5rem; }
          .transition-quote { font-size: 24px; }
          
          /* SLIDER DOTS & CONTAINER UTAMA MOBILE */
          .mobile-dots { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            gap: 8px; 
            margin-top: 1rem; 
            margin-bottom: 4rem; 
            width: 100%; 
          }
          .slider-dot { width: 8px; height: 8px; border-radius: 8px; background-color: #333333; transition: all 0.3s ease; }
          .slider-dot.active { width: 28px; background-color: #b58045; }

          .wrapper-showcase-section { padding: 2rem 1.5rem 4rem; }
          .wrapper-container { flex-direction: column-reverse; gap: 2rem; }
          .wrapper-image-col { height: 400px; width: 100%; }
          .accordion-item { padding: 1.5rem; }
          .accordion-title { font-size: 20px; }

          .why-grid, .process-grid {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            gap: 1rem;
            padding-bottom: 1rem;
            width: 100%;
            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .why-grid::-webkit-scrollbar, .process-grid::-webkit-scrollbar { display: none; }
          
          .why-card, .process-card {
            flex: 0 0 85%;
            scroll-snap-align: center;
          }

          .why-card:first-child, .process-card:first-child {
            margin-left: 7.5%;
          }
          .why-card:last-child, .process-card:last-child {
            margin-right: 7.5%;
          }

          .collection-section { padding: 4rem 1.5rem; justify-content: flex-start; }
          .collection-title { font-size: 36px; }
          .collection-desc { font-size: 16px; margin-bottom: 2rem; }
          .collection-tabs { margin-bottom: 2rem; }
          .tab-btn { padding: 8px 16px; font-size: 14px; }
          .collection-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; margin: 0; padding: 0; }
          .product-card { padding: 1rem 0.5rem; min-height: 220px; justify-content: flex-start; }
          .product-img-box { height: 130px; margin-bottom: 1rem; }
          .product-name { font-size: 16px; margin-bottom: 0; min-height: auto; }
          .desktop-specs, .product-brand, .btn-learn-more { display: none; }
          .mobile-wrapper-only { display: block; font-family: 'Arpona', serif; font-size: 12px; color: #89582f; text-align: center; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }

          .modal-content { padding: 2.5rem 1rem 1.5rem; max-height: 90vh; overflow-y: auto; }
          .modal-img-box { height: 250px; min-height: 0; margin-bottom: 3.5rem; }
          .modal-img { transform: scale(1.4); }

          .story-hero { background-position: 70% center !important; }
          .story-hero-title { font-size: 56px; }
          .story-hero-subtitle { font-size: 12px; }
          .story-content-wrapper { padding: 4rem 1.5rem; }
          .story-block, .story-block.reverse { flex-direction: column; gap: 2rem; }
          .story-img-box { height: 300px; }
          .story-text p { font-size: 14px; margin-bottom: 1rem; }
          .story-conclusion p { font-size: 16px; }
          .story-closing { font-size: 18px; }
          .story-closing strong { font-size: 26px; }

          .trade-section { padding: 4rem 1.5rem; }
          .who-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .trade-form-box { padding: 2rem 1.5rem; }
          .trade-input-row { flex-direction: column; gap: 0; }
          .trade-subheading { font-size: 26px; }
          .who-box { padding: 2.5rem 1.5rem; }
        }
      `}} />

      {stage === 'checking' && (
        <div style={{ backgroundColor: '#000000', width: '100vw', height: '100vh', position: 'fixed', zIndex: 9999 }}></div>
      )}

      {stage !== 'home' && stage !== 'checking' && (
        <div className={`cinematic-wrapper ${stage === 'transition' ? 'fade-out-bg' : ''}`}>

          {/* LAYER 1: VIDEO INTRO */}
          <div className={`intro-video-container ${stage !== 'intro-video' ? 'fade-out-video' : ''}`}>
            <video
              src="/videos/web-intro.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => setStage('verification')}
              className="intro-video"
            />
          </div>

          {/* LAYER 2: LOGO KILAU & TEKS UMUR (Muncul setelah video selesai) */}
          <div className={`age-content-wrapper ${stage === 'verification' ? 'show-verification' : ''}`}>
            <div className="age-top-content">
              <div className="age-logo-box">
                <div className="base-layer"></div>
                <div className="mask-layer"><div className="light-beam"></div></div>
              </div>
              <p className="age-text">Welcome to EL BACÁN</p>
            </div>

            <div className="age-bottom-content">
              <p className="age-text2">Please confirm that you are<br/> 21 years of age or older to continue</p>
              <div className="age-button-group">
                <button onClick={handleYesClick} className="age-button">ENTER</button>
                <button onClick={() => window.location.href = 'https://google.com'} className="age-button">EXIT</button>
              </div>
            </div>
          </div>

        </div>
      )}

      {stage === 'home' && (
        <div className="home-container">
          <div className="hero-bg"></div>
          <div className="smoke-wrapper"><div className="smoke-layer"></div></div>
          <div className="hero-gradient"></div>

          <div className={`content-layer ${isMenuOpen ? 'shifted' : ''}`}>
            
            {/* --- HERO SECTION --- */}
            <div className="hero-section-wrapper">
              <nav className={`navbar ${!isNavVisible ? 'hidden' : ''}`}>
                <img src="/images/hamburger.svg" alt="Menu" className="hamburger-menu" onClick={() => setIsMenuOpen(true)} />
                <div className="nav-links left">
                  <a href="#collection" onClick={(e) => scrollToSection(e, 'collection-tabs-anchor', 40)}>Collection</a>
                  <a href="#the-story" onClick={(e) => scrollToSection(e, 'story-section', 0)}>The Story</a>
                </div>
                <div className="nav-logo">
                  <a href="/">
                    <Image src="/images/elbacan-logo-v2.svg" alt="El Bacán Logo" width={200} height={180} priority />
                  </a>
                </div>
                <div className="nav-links right">
                  <a href="#the-craft" onClick={(e) => scrollToSection(e, 'craft-section', -50)}>The Craft</a>
                  <a href="#trade-partners" onClick={(e) => scrollToSection(e, 'trade-partners-section', 0)}>Trade Partners</a>
                </div>
              </nav>

              <main className="hero-content">
                <div className="text-wrapper">
                  <h1 className="hero-title">La tradición se fuma con estilo</h1>
                  <div className="hero-divider"></div>
                  <p className="hero-desc">
                    Handcrafted in Nicaragua. Defined by character. Enjoyed with timeless style.
                  </p>
                </div>
                <div className="hero-buttons">
                  <button className="btn btn-primary" onClick={(e) => scrollToSection(e, 'collection-tabs-anchor')}>Collection</button>
                  <button className="btn btn-secondary" onClick={(e) => scrollToSection(e, 'story-section', 0)}>THE STORY</button>
                </div>
              </main>

              <div className="hero-footer">
                <p>NOT JUST A CIGAR. A STATEMENT OF PRESENCE.</p>
              </div>
            </div>

            {/* --- SHOWCASE / THE EL BACAN --- */}
            <section id="showcase-section" className="showcase-section">
              <div className="showcase-top-gradient"></div>
              
              <div className={`showcase-video-wrapper ${isVideoFinished ? 'fade-out' : ''}`}>
                <video 
                  ref={videoRef}
                  muted 
                  playsInline 
                  className="showcase-video"
                  onEnded={() => {
                    setIsVideoFinished(true);
                    // Otomatis scroll ke The Craft setelah animasi selesai
                    const element = document.getElementById('craft-section');
                    if (element) {
                      const y = element.getBoundingClientRect().top + window.scrollY - 50;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }} 
                >
                  <source src="/videos/cigar-animation.webm" type="video/webm" />
                  <source src="/videos/cigar-animation.mp4" type="video/mp4" />
                </video>
              </div>
            </section>

            {/* --- THE CRAFT SECTION --- */}
            <div id="craft-section">
              {/* Hero The Craft */}
              <section className="craft-hero">
                <div className="craft-hero-content">
                  <h1 className="craft-hero-title">The Craft</h1>
                  <p className="craft-hero-subtitle">Where Patience Becomes Perfection</p>
                </div>
              </section>

              {/* Introduction */}
              <section className="craft-intro">
                <div className="craft-intro-container">
                  <p>Craftsmanship is more than a process - it is a PHILOSOPHY .</p>
                  <p>Every EL BACÁN cigar is the result of patience, precision, and generations of traditional craftsmanship.</p>
                  <p>From the careful selection of every tobacco leaf to the final inspection, every step is guided by one commitment: creating an exceptional smoking experience that remains consistent from the first draw to the last.</p>
                </div>
              </section>

              {/* Three Pillars */}
              <section className="craft-pillars">
                <div className="pillar-card">
                  <svg className="pillar-icon" viewBox="0 0 24 24"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                  <h3 className="pillar-title">Handcrafted Excellence</h3>
                  <p className="pillar-desc">Every EL BACÁN cigar is handcrafted by skilled artisans using traditional techniques that prioritize flawless construction, consistency, and an effortless draw.</p>
                </div>
                <div className="pillar-card">
                  <svg className="pillar-icon" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.96.3 1.34.3c3.14 0 6.13-2.04 8.78-5.32c3.55-4.41 5.12-9.67 5.22-10.02L20.89 4C20.89 4 19.34 7.42 17 8zM10.87 15.65c-1.39-1.07-2.67-2.64-3.3-4.32l1.64-2.82c1.77 2.19 3.53 3.96 5.22 4.97c-1.01 1.05-2.28 1.83-3.56 2.17z"/></svg>
                  <h3 className="pillar-title">Exceptional Leaf Selection</h3>
                  <p className="pillar-desc">Only carefully selected tobacco leaves are chosen for their character, balance, texture, and quality before becoming part of an EL BACÁN blend.</p>
                </div>
                <div className="pillar-card">
                  <svg className="pillar-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                  <h3 className="pillar-title">Masterful Aging & Flavor</h3>
                  <p className="pillar-desc">Through expert fermentation and patient aging, every leaf develops the richness, balance, and complexity that define the EL BACÁN smoking experience.</p>
                </div>
              </section>

              {/* Full-Screen Transition */}
              <section className="craft-transition">
                <div className="transition-content">
                  <span className="transition-label">Patience</span>
                  <h3 className="transition-quote">
                    "Great craftsmanship is never measured by speed.<br/>
                    It is measured by the willingness to wait until every detail is exactly as it should be.<br/>
                    The finest cigars are never rushed."
                  </h3>
                </div>
              </section>

              {/* The Wrapper */}
              <div className="wrapper-showcase-section">
                <div className="wrapper-container">
                  <div className="wrapper-accordion">
                    {wrapperData.map((item, index) => (
                      <div 
                        key={index} 
                        className={`accordion-item ${activeWrapper === index ? 'active' : ''}`}
                        style={{ backgroundColor: activeWrapper === index ? item.bgColor : '#151515' }}
                        onClick={() => setActiveWrapper(index)}
                      >
                        <div className="accordion-subtitle">{item.subtitle}</div>
                        <h4 className="accordion-title">{item.title}</h4>
                        {activeWrapper === index && (
                          <p className="accordion-desc">{item.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="wrapper-image-col">
                    <img 
                      src={wrapperData[activeWrapper].image} 
                      alt={wrapperData[activeWrapper].title} 
                      className="wrapper-image-display"
                    />
                  </div>
                </div>
              </div>

              {/* Final Full-Screen Image */}
              <section className="craft-conclusion">
                <div className="transition-content">
                  <h3 className="transition-quote">
                    "Behind every exceptional cigar are hands that have mastered the art of patience."
                  </h3>
                </div>
              </section>
            </div>

            {/* --- OUR COLLECTION --- */}
            <section id="collection-section" className="collection-section">
              <h2 className="collection-title">Our Collection</h2>
              <div className="new-section-divider"></div>
              
              <div id="collection-tabs-anchor" className="collection-tabs">
                {['PREMIUM EDITION', 'ORIGINAL', 'FUMITAS', 'MORE'].map((tab) => (
                  <button 
                    key={tab} 
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <p className="collection-desc">
                Handcrafted in Nicaragua using 100% premium long-filler tobaccos, the Premium Edition delivers exceptional construction, consistency, and flavor in every cigar.
Available with Habano, Connecticut, and Maduro wrappers, and offered in Churchill, Toro, Torpedo, Robusto, and Toro Gordo vitolas, this collection reflects the craftsmanship, quality, and tradition that define EL BACÁN Cigars.
              </p>

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

            {/* --- THE STORY SECTION --- */}
            <div id="story-section">
              {/* Hero The Story */}
              <section className="story-hero">
                <div className="story-hero-content">
                  <h1 className="story-hero-title">The Story</h1>
                  <p className="story-hero-subtitle">La tradición se fuma con estilo</p>
                </div>
              </section>

              {/* Konten The Story */}
              <section className="story-content-wrapper">
                <div className="story-grid">
                  {/* --- BLOCK 1 --- */}
                  <div className="story-block">
                    <div className="story-text">
                      <p>Some brands are created to sell products.<br/>EL BACÁN was created to represent a way of living.</p>
                      <p>A belief that true elegance is never defined by wealth, but by character.<br/>A gentleman whose confidence requires no introduction.<br/>A woman whose elegance leaves a lasting impression.</p>
                      <p>People who treat others with respect, value quality over excess, and understand that style is expressed through actions as much as appearance.</p>
                      <p>That is what it means to be EL BACÁN.</p>
                    </div>
                    <div className="story-img-box">
                      <img src="/images/story-1.jpg" alt="El Bacan Lifestyle" className="story-img" />
                    </div>
                  </div>

                  {/* --- BLOCK 2 --- */}
                  <div className="story-block reverse">
                    <div className="story-text">
                      <p>Inspired by timeless sophistication and handcrafted in Nicaragua, every cigar reflects a commitment to exceptional craftsmanship, refined construction, and uncompromising consistency.</p>
                      <p>Every leaf is carefully selected.<br/>Every blend is developed with purpose.<br/>Every cigar is made to deliver a premium smoking experience from the first draw to the last.</p>
                      <p>EL BACÁN was created with one conviction:<br/>Exceptional cigars should be defined by their quality—not by an unattainable price.</p>
                      <p>Luxury is not about spending more.<br/>Luxury is about choosing something made with care, passion, and respect for tradition.</p>
                    </div>
                    <div className="story-img-box">
                      <img src="/images/story-2.jpg" alt="El Bacan Craftsmanship" className="story-img" />
                    </div>
                  </div>

                  {/* --- BLOCK 3 --- */}
                  <div className="story-block">
                    <div className="story-text">
                      <p>Every memorable journey deserves remarkable company.<br/>The greatest achievements are rarely celebrated alone. They are shared with the people who stand beside us, inspire our ambitions, and give meaning to every milestone.</p>
                      <p>Whether it's the quiet strength of a remarkable woman, the confidence of a distinguished gentleman, the loyalty of a lifelong friend, or the support of family, these are the moments that make success truly worth celebrating.</p>
                      <p>Whether enjoyed during a celebration, shared with someone special, or savored in a quiet moment of reflection, an EL BACÁN cigar is meant to elevate the occasion.</p>
                    </div>
                    <div className="story-img-box">
                      <img src="/images/story-3.jpg" alt="El Bacan Celebration" className="story-img" />
                    </div>
                  </div>
                </div>

                {/* --- CONCLUSION --- */}
                <div className="story-conclusion">
                  <p>Because true distinction is never loud.<br/>It is found in confidence. In integrity. In craftsmanship.<br/>In the appreciation of life's finest moments.</p>
                  <p>EL BACÁN is more than a premium cigar.<br/>It is a symbol of timeless style, authentic character, and the belief that elegance should always be within reach.</p>
                  <p className="story-closing">
                    <strong>EL BACÁN</strong>
                    La tradición se fuma con estilo.
                  </p>
                </div>
              </section>
            </div>
            
            {/* --- TRADE PARTNERS SECTION --- */}
            <section id="trade-partners-section" className="trade-section">
              <div className="trade-container">
                
                {/* Header & Intro */}
                <div className="trade-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 className="new-section-title">Trade Partners</h2>
                  <div className="new-section-divider"></div>
                  <h3 style={{ fontFamily: "'Arpona-Semibold', serif", fontSize: '18px', color: '#ffffff', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1.5rem' }}>Become an EL BACÁN Trade Partner</h3>
                </div>

                <div className="trade-intro">
                  <p>
                    We proudly partner with premium retailers, wholesalers, importers, distributors, cigar lounges, luxury hotels, resorts, country clubs, golf clubs, and hospitality professionals who share our commitment to exceptional craftsmanship, uncompromising quality, and timeless style.
                  </p>
                  <p>
                    Whether you operate a boutique tobacconist, manage a national distribution network, or curate luxury experiences for discerning clientele, we invite you to discover what makes EL BACÁN a distinguished addition to your portfolio.
                  </p>
                  <button className="btn-trade-main" onClick={() => document.getElementById('trade-form').scrollIntoView({ behavior: 'smooth' })}>
                    Request Partnership
                  </button>
                </div>

                {/* Why Partner With Us */}
                <h3 className="trade-subheading">Why Partner With EL BACÁN</h3>
                <div style={{ width: '100%' }}>
                  <div className="why-grid" onScroll={(e) => handleScroll(e, setActiveWhy)}>
                    <div className="why-card">
                      <h4 className="why-title">Premium Handcrafted Cigars</h4>
                      <p className="why-desc">Every EL BACÁN cigar is handcrafted in Nicaragua using carefully selected tobaccos and traditional techniques to deliver exceptional consistency and character.</p>
                    </div>
                    <div className="why-card">
                      <h4 className="why-title">Distinctive Brand Identity</h4>
                      <p className="why-desc">A refined presentation, timeless design, and memorable brand story that creates lasting impressions and builds customer loyalty.</p>
                    </div>
                    <div className="why-card">
                      <h4 className="why-title">Reliable Supply</h4>
                      <p className="why-desc">Consistent production, dependable logistics, and long-term partnerships designed to support sustainable business growth.</p>
                    </div>
                    <div className="why-card">
                      <h4 className="why-title">Marketing Support</h4>
                      <p className="why-desc">Premium displays, merchandising materials, digital assets, product photography, and ongoing sales support to strengthen your business.</p>
                    </div>
                  </div>
                  <div className="mobile-dots">
                    {[0, 1, 2, 3].map(idx => (
                      <span key={idx} className={`slider-dot ${activeWhy === idx ? 'active' : ''}`}></span>
                    ))}
                  </div>
                </div>

                {/* Who We Partner With */}
                <div className="who-box">
                  <h3 className="trade-subheading" style={{ marginBottom: '1rem' }}>Who We Partner With</h3>
                  <div className="who-grid">
                    <div className="who-item">Premium Tobacconists</div>
                    <div className="who-item">Wholesale Distributors</div>
                    <div className="who-item">International Importers</div>
                    <div className="who-item">Specialty Retailers</div>
                    <div className="who-item">Cigar Lounges</div>
                    <div className="who-item">Hotels & Resorts</div>
                    <div className="who-item">Country Clubs</div>
                    <div className="who-item">Golf Clubs</div>
                    <div className="who-item">Fine Wine & Spirits Retailers</div>
                    <div className="who-item">Duty Free Operators</div>
                    <div className="who-item">Hospitality Groups</div>
                  </div>
                </div>

                {/* The Advantage */}
                <div className="advantage-box">
                  <h3 className="new-section-title" style={{ fontSize: '32px', marginBottom: '1rem' }}>The EL BACÁN Advantage</h3>
                  <div className="new-section-divider"></div>
                  <h3 style={{ marginTop: '2rem' }}>"Premium cigars are plentiful. Memorable brands are rare."</h3>
                  <p>
                    Today's consumers seek more than exceptional tobacco—they seek authenticity, craftsmanship, and brands with a story worth sharing.
                  </p>
                  <p>
                    EL BACÁN combines premium Nicaraguan craftsmanship with timeless elegance, offering a luxury experience that creates lasting customer loyalty while delivering outstanding value for your business.
                  </p>
                </div>

                {/* The Partnership Process */}
                <h3 className="trade-subheading">The Partnership Process</h3>
                <div style={{ width: '100%' }}>
                  <div className="process-grid" onScroll={(e) => handleScroll(e, setActiveProcess)}>
                    <div className="process-card">
                      <span className="process-num">01</span>
                      <h4 className="process-title">Submit Your Inquiry</h4>
                    </div>
                    <div className="process-card">
                      <span className="process-num">02</span>
                      <h4 className="process-title">Meet With Our Team</h4>
                    </div>
                    <div className="process-card">
                      <span className="process-num">03</span>
                      <h4 className="process-title">Business Evaluation</h4>
                    </div>
                    <div className="process-card">
                      <span className="process-num">04</span>
                      <h4 className="process-title">Welcome to EL BACÁN</h4>
                    </div>
                  </div>
                  <div className="mobile-dots">
                    {[0, 1, 2, 3].map(idx => (
                      <span key={idx} className={`slider-dot ${activeProcess === idx ? 'active' : ''}`}></span>
                    ))}
                  </div>
                </div>

                {/* Request Partnership Form */}
                <form 
                  id="trade-form" 
                  className="trade-form-box" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! Your partnership request has been submitted.");
                    e.target.reset(); // Kosongkan form setelah submit
                  }}
                >
                  <h3 className="trade-form-title">Request Partnership</h3>
                  <input type="text" className="trade-input" placeholder="BUSINESS NAME" required />
                  <input type="text" className="trade-input" placeholder="CONTACT NAME" required />
                  
                  <div className="trade-input-row">
                    <input type="text" className="trade-input" placeholder="BUSINESS TYPE" required />
                    <input type="text" className="trade-input" placeholder="COUNTRY" required />
                  </div>
                  
                  <div className="trade-input-row">
                    <input type="text" className="trade-input" placeholder="STATE / PROVINCE" required />
                    <input type="text" className="trade-input" placeholder="WEBSITE" />
                  </div>

                  <div className="trade-input-row">
                    <input type="tel" className="trade-input" placeholder="PHONE NUMBER" required />
                    <input type="email" className="trade-input" placeholder="EMAIL ADDRESS" required />
                  </div>

                  <input type="text" className="trade-input" placeholder="TELL US ABOUT YOUR BUSINESS" style={{ marginBottom: '2.5rem' }} required />
                  
                  <button type="submit" className="btn-trade-main" style={{ width: '100%' }}>Submit Request</button>
                </form>

                {/* A Partnership Built on Trust */}
                <div className="trust-box">
                  <h3 className="trade-subheading">A Partnership Built on Trust</h3>
                  <p>
                    At EL BACÁN, we believe the strongest business relationships are built the same way exceptional cigars are crafted—with patience, consistency, integrity, and a shared commitment to excellence.
                  </p>
                  <h4>We look forward to building something exceptional together.</h4>
                </div>

              </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="footer">
              <h4 className="footer-title">EL BACAN CIGARS</h4>
              <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', fontFamily: "'Arpona', serif", fontSize: '12px', textTransform: 'uppercase' }}>
                <a href="/privacy-policy" style={{ color: '#888888', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="/terms-conditions" style={{ color: '#888888', textDecoration: 'none' }}>Terms & Conditions</a>
                <a href="/cookie-policy" style={{ color: '#888888', textDecoration: 'none' }}>Cookie Policy</a>
                <a href="/contact-us" style={{ color: '#888888', textDecoration: 'none' }}>Contact Us</a>
              </div>
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
              <a href="/" className="menu-link" onClick={(e) => { 
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  e.preventDefault(); 
                  window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }
                setIsMenuOpen(false); 
              }}>Home</a>
              
              <a href="#collection" className="menu-link" onClick={(e) => { 
                scrollToSection(e, 'collection-tabs-anchor', 30); 
                setIsMenuOpen(false); 
              }}>Collection</a>
              
              <a href="#the-story" className="menu-link" onClick={(e) => { 
                scrollToSection(e, 'story-section', 0); 
                setIsMenuOpen(false); 
              }}>The Story</a>
              
              <a href="#the-craft" className="menu-link" onClick={(e) => { 
                scrollToSection(e, 'craft-section'); 
                setIsMenuOpen(false); 
              }}>The Craft</a>
              
              <a href="#trade-partners" className="menu-link" onClick={(e) => { 
                scrollToSection(e, 'trade-partners-section', 0); 
                setIsMenuOpen(false); 
              }}>Trade Partners</a>
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
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontFamily: "'Arpona', serif", fontSize: '12px', textTransform: 'uppercase' }}>
                <a href="/privacy-policy" style={{ color: '#888888', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="/contact-us" style={{ color: '#888888', textDecoration: 'none' }}>Contact Us</a>
              </div>
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