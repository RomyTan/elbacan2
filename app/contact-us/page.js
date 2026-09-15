"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ContactUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <title>Contact Us - El Bacán</title>
      <style dangerouslySetInnerHTML={{ __html: `
        /* --- BASE & FONTS --- */
        @font-face { font-family: 'Arpona'; src: url('/fonts/Arpona-Regular.otf') format('truetype'); font-weight: normal; font-style: normal; }
        @font-face { font-family: 'Arpona-Semibold'; src: url('/fonts/Arpona-SemiBold.otf') format('truetype'); font-weight: bold; font-style: normal; }
        
        body { margin: 0; padding: 0; background-color: #000000; color: #e6d5c3; font-family: 'Arpona', serif; line-height: 1.6; overflow-x: hidden; }
        
        /* --- NAVBAR --- */
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 2rem 4rem; width: 100%; box-sizing: border-box; border-bottom: 1px solid #1a1a1a; }
        .nav-links { display: flex; gap: 7rem; font-size: 20px; font-weight: normal; letter-spacing: 0.1em; text-transform: uppercase; flex: 1; }
        .nav-links.left { justify-content: flex-end; }
        .nav-links.right { justify-content: flex-start; }
        .nav-links a { color: #e6d5c3; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #89582F; }
        .nav-logo { flex: 0 0 auto; margin: 0 5rem; display: flex; justify-content: center; }
        .hamburger-menu { display: none; }

        @media (max-width: 768px) {
          .navbar { padding: 1.5rem; justify-content: flex-start; }
          .nav-links { display: none; }
          .hamburger-menu { display: block; width: 30px; height: auto; cursor: pointer; position: absolute; left: 1.5rem; z-index: 20; }
          .nav-logo { margin: 0 auto; }
          .nav-logo img { width: 140px !important; height: auto !important; }
        }

        /* --- MOBILE MENU --- */
        .mobile-menu { position: fixed; top: 0; right: 0; width: 100%; height: 100%; z-index: 100; background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); display: flex; flex-direction: column; align-items: center; padding: 1.5rem 2rem 2rem; transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .mobile-menu.open { transform: translateX(0); }
        .menu-close-btn { align-self: flex-end; background: none; border: none; color: #fff; font-size: 28px; cursor: pointer; padding: 0; }
        .menu-logo { margin: 1rem 0 3rem; }
        .menu-nav { display: flex; flex-direction: column; width: 100%; max-width: 280px; gap: 0.5rem; }
        .menu-link { color: #fff; text-decoration: none; font-size: 18px; padding: 14px 24px; box-sizing: border-box; width: 100%; text-align: center; }
        .menu-footer-box { margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; width: 100%; }
        .menu-socials { display: flex; gap: 1.5rem; }
        .menu-socials img { width: 28px; height: 28px; }
        .btn-whatsapp { display: flex; align-items: center; justify-content: center; gap: 10px; background-color: #89582F; color: #fff; text-decoration: none; border-radius: 30px; width: 100%; max-width: 280px; padding: 14px; font-size: 16px; border: none; cursor: pointer; }
        .btn-whatsapp img { width: 24px; height: 24px; }
        .menu-copyright { color: #fff; font-size: 12px; margin-top: 0.5rem; }

        /* --- CONTACT US CONTENT --- */
        .contact-container { max-width: 700px; margin: 0 auto; padding: 6rem 2rem 8rem; text-align: center; }
        .page-title { font-family: 'Arpona-Semibold', serif; font-size: 36px; margin-bottom: 2rem; letter-spacing: 0.1em; }
        .contact-intro { font-size: 16px; color: #cccccc; margin-bottom: 4rem; }
        
        .contact-card { background: #0a0a0a; border: 1px solid #1a1a1a; padding: 4rem 2rem; border-radius: 4px; margin-bottom: 5rem; }
        .brand-name { font-family: 'Arpona-Semibold', serif; font-size: 24px; color: #b58045; margin-bottom: 2rem; letter-spacing: 0.1em; }
        .info-group { margin-bottom: 1.5rem; }
        .info-title { font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.2rem; display: block; }
        .info-detail { font-size: 16px; color: #e6d5c3; }
        .contact-link { color: #b58045; text-decoration: none; transition: color 0.3s; }
        .contact-link:hover { color: #e6d5c3; }

        .trust-section { margin-top: 4rem; }
        .trust-title { font-family: 'Arpona-Semibold', serif; font-size: 28px; color: #ffffff; margin-bottom: 1.5rem; }
        .trust-text { font-size: 16px; color: #cccccc; margin-bottom: 2rem; }
        .trust-closing { font-family: 'Arpona-Semibold', serif; font-size: 18px; color: #b58045; font-style: italic; }

        /* --- FOOTER --- */
        .footer { width: 100%; background-color: #0a0a0a; padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-sizing: border-box; border-top: 1px solid #1a1a1a; }
        .footer-title { font-family: 'Arpona-Semibold', serif; font-size: 14px; color: #e6d5c3; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.5rem 0; }
        .footer-copy { font-family: 'Arpona', serif; font-size: 12px; color: #888888; margin: 0; }
        .footer-links { display: flex; gap: 1.5rem; margin-bottom: 1rem; font-family: 'Arpona', serif; font-size: 12px; text-transform: uppercase; }
        .footer-links a { color: #888888; text-decoration: none; }
        .footer-links a:hover { color: #b58045; }
      `}} />

      {/* --- HEADER / NAVBAR --- */}
      <nav className="navbar">
        <img src="/images/hamburger.svg" alt="Menu" className="hamburger-menu" onClick={() => setIsMenuOpen(true)} />
        <div className="nav-links left">
          <a href="/#collection-tabs-anchor">Collection</a>
          <a href="/#story-section">The Story</a>
        </div>
        <div className="nav-logo">
          <a href="/">
            <Image src="/images/elbacan-logo-v2.svg" alt="El Bacán Logo" width={200} height={180} priority />
          </a>
        </div>
        <div className="nav-links right">
          <a href="/#craft-section">The Craft</a>
          <a href="/#trade-partners-section">Trade Partners</a>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>&#10005;</button>
        <div className="menu-logo">
          <Image src="/images/elbacan-logo-v2.svg" alt="El Bacán Logo" width={140} height={126} priority />
        </div>
        <nav className="menu-nav">
          <a href="/" className="menu-link">Home</a>
          <a href="/#collection-tabs-anchor" className="menu-link">Collection</a>
          <a href="/#story-section" className="menu-link">The Story</a>
          <a href="/#craft-section" className="menu-link">The Craft</a>
          <a href="/#trade-partners-section" className="menu-link">Trade Partners</a>
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

      {/* --- MAIN CONTENT --- */}
      <main className="contact-container">
        <h1 className="page-title">CONTACT US</h1>
        <p className="contact-intro">
          If you have any questions regarding this Cookie Policy or our use of cookies, please contact us.
        </p>

        <div className="contact-card">
          <div className="brand-name">EL BACÁN</div>
          
          <div className="info-group">
            <span className="info-title">Commercial Operations</span>
            <a href="https://www.latinamericancigars.com" className="info-detail contact-link">Latin American Cigars Corp.</a>
          </div>

          <div className="info-group">
            <span className="info-title">Email</span>
            <a href="mailto:privacy@elbacancigars.com" className="info-detail contact-link">privacy@elbacancigars.com</a>
          </div>

          <div className="info-group" style={{ marginBottom: 0 }}>
            <span className="info-title">Website</span>
            <a href="https://www.elbacancigars.com" className="info-detail contact-link">www.elbacancigars.com</a>
          </div>
        </div>

        <div className="trust-section">
          <h2 className="trust-title">Your Trust Matters</h2>
          <p className="trust-text">
            At EL BACÁN, every detail matters.<br />
            From the craftsmanship of every cigar to the way we protect your privacy, our commitment remains the same—transparency, integrity, and respect.
          </p>
          <p className="trust-closing">Thank you for trusting EL BACÁN.</p>
        </div>
      </main>

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
    </>
  );
}