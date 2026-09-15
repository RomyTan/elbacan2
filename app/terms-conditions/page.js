"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function TermsConditions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <title>Terms & Conditions - El Bacán</title>
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

        /* --- POLICY CONTENT --- */
        .policy-container { max-width: 800px; margin: 0 auto; padding: 4rem 2rem 6rem; }
        .page-title { font-family: 'Arpona-Semibold', serif; font-size: 36px; text-align: center; margin-bottom: 0.5rem; }
        .date-text { text-align: center; color: #888888; font-size: 14px; margin-bottom: 4rem; letter-spacing: 0.05em; }
        .section-title { font-family: 'Arpona-Semibold', serif; font-size: 20px; color: #b58045; margin-top: 3rem; margin-bottom: 1rem; border-bottom: 1px solid #1a1a1a; padding-bottom: 0.5rem; }
        p { font-size: 16px; margin-bottom: 1rem; color: #cccccc; }
        ul { margin-bottom: 1.5rem; padding-left: 1.5rem; color: #cccccc; }
        li { margin-bottom: 0.5rem; font-size: 16px; }
        strong { color: #e6d5c3; }

        /* --- FOOTER --- */
        .footer { width: 100%; background-color: #0a0a0a; padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-sizing: border-box; }
        .footer-title { font-family: 'Arpona-Semibold', serif; font-size: 14px; color: #e6d5c3; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.5rem 0; }
        .footer-copy { font-family: 'Arpona', serif; font-size: 12px; color: #888888; margin: 0; }
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
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontFamily: "'Arpona', serif", fontSize: '12px', textTransform: 'uppercase', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/privacy-policy" style={{ color: '#888888', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms-conditions" style={{ color: '#888888', textDecoration: 'none' }}>Terms & Conditions</a>
            <a href="/cookie-policy" style={{ color: '#888888', textDecoration: 'none' }}>Cookie Policy</a>
            <a href="/contact-us" style={{ color: '#888888', textDecoration: 'none' }}>Contact Us</a>
          </div>
          <p className="menu-copyright">© 2026 ElBacan Cigars. All Rights Reserved.</p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="policy-container">
        <h1 className="page-title">TERMS & CONDITIONS</h1>
        <p className="date-text">
          Effective Date: January 1, 2026<br/>
          Last Updated: January 1, 2026
        </p>

        <h2 className="section-title">Welcome to EL BACÁN</h2>
        <p>Welcome to the official EL BACÁN website.</p>
        <p>These Terms & Conditions ("Terms") govern your access to and use of this website, including all information, content, services, and features made available through www.elbacancigars.com.</p>
        <p>By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
        <p>If you do not agree with these Terms, please discontinue use of this website.</p>

        <h2 className="section-title">Brand Ownership</h2>
        <p>EL BACÁN® is a registered premium cigar brand owned by Forleah Investments LLC.</p>
        <p>Commercial operations, customer support, marketing activities, and wholesale distribution may be conducted by Latin American Cigars Corp., acting on behalf of the EL BACÁN brand.</p>
        <p>Throughout these Terms, the terms "EL BACÁN," "we," "our," and "us" refer collectively to Forleah Investments LLC and, where applicable, Latin American Cigars Corp.</p>

        <h2 className="section-title">Age Requirement</h2>
        <p>This website is intended exclusively for individuals who are at least 21 years of age or the minimum legal age required to purchase tobacco products in their jurisdiction.</p>
        <p>By entering this website, you confirm that you meet the applicable legal age requirement.</p>

        <h2 className="section-title">Intellectual Property</h2>
        <p>All content available on this website, including but not limited to:</p>
        <ul>
          <li>Logos</li>
          <li>Trademarks</li>
          <li>Product names</li>
          <li>Images</li>
          <li>Photography</li>
          <li>Videos</li>
          <li>Artwork</li>
          <li>Graphics</li>
          <li>Written content</li>
          <li>Website design</li>
          <li>Layout</li>
          <li>Product descriptions</li>
        </ul>
        <p>is the exclusive property of Forleah Investments LLC or is used under appropriate authorization.</p>
        <p>No content may be copied, reproduced, distributed, modified, or used without prior written permission.</p>

        <h2 className="section-title">Website Use</h2>
        <p>You agree to use this website only for lawful purposes. You may not:</p>
        <ul>
          <li>Attempt to gain unauthorized access to our systems.</li>
          <li>Interfere with website functionality.</li>
          <li>Upload malicious software.</li>
          <li>Misrepresent your identity.</li>
          <li>Submit false information.</li>
          <li>Use this website for unlawful or fraudulent purposes.</li>
        </ul>

        <h2 className="section-title">Product Information</h2>
        <p>EL BACÁN strives to ensure that all product descriptions, images, and specifications are accurate.</p>
        <p>However, product availability, packaging, blends, artwork, pricing, and specifications may change without prior notice.</p>
        <p>Images shown on this website are for illustrative purposes and may differ slightly from the final product.</p>

        <h2 className="section-title">Trade Partner Inquiries</h2>
        <p>Submitting a Trade Partner inquiry does not create a business relationship or guarantee approval.</p>
        <p>EL BACÁN reserves the right to approve or decline partnership requests at its sole discretion.</p>

        <h2 className="section-title">Third-Party Links</h2>
        <p>This website may contain links to third-party websites.</p>
        <p>EL BACÁN does not control or endorse external websites and is not responsible for their content, policies, or practices. Visitors access third-party websites at their own risk.</p>

        <h2 className="section-title">Disclaimer</h2>
        <p>This website and its contents are provided on an "as is" and "as available" basis.</p>
        <p>While we strive to maintain accurate and current information, EL BACÁN makes no warranties, express or implied, regarding:</p>
        <ul>
          <li>Accuracy</li>
          <li>Completeness</li>
          <li>Reliability</li>
          <li>Availability</li>
          <li>Fitness for a particular purpose</li>
        </ul>

        <h2 className="section-title">Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, EL BACÁN, Forleah Investments LLC, Latin American Cigars Corp., and their respective officers, employees, affiliates, representatives, and partners shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from your use of this website.</p>

        <h2 className="section-title">Privacy</h2>
        <p>Your use of this website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.</p>

        <h2 className="section-title">Governing Law</h2>
        <p>These Terms & Conditions shall be governed by and interpreted in accordance with the laws of the State of Florida, without regard to its conflict of law principles.</p>
        <p>Any disputes arising from these Terms or your use of this website shall be subject to the exclusive jurisdiction of the state or federal courts located in Florida.</p>

        <h2 className="section-title">Changes to These Terms</h2>
        <p>EL BACÁN reserves the right to update or modify these Terms & Conditions at any time without prior notice.</p>
        <p>Any changes become effective immediately upon publication on this website.</p>
        <p>Your continued use of the website following any updates constitutes acceptance of the revised Terms.</p>
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