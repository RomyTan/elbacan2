"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function CookiePolicy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <title>Cookie Policy - El Bacán</title>
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
        <h1 className="page-title">COOKIE POLICY</h1>
        <p className="date-text">
          Effective Date: January 1, 2026<br/>
          Last Updated: January 1, 2026
        </p>

        <h2 className="section-title">Cookie Policy</h2>
        <p>At EL BACÁN, we believe transparency is an essential part of building trust.</p>
        <p>This Cookie Policy explains how we use cookies and similar technologies when you visit www.elbacancigars.com.</p>
        <p>By continuing to browse our website, you consent to the use of cookies as described in this policy, unless you disable them through your browser settings or cookie preferences.</p>

        <h2 className="section-title">What Are Cookies?</h2>
        <p>Cookies are small text files that are stored on your computer, tablet, or mobile device when you visit a website.</p>
        <p>They help websites function properly, remember your preferences, improve performance, and provide a more personalized browsing experience.</p>
        <p>Cookies do not typically identify you personally, but they may be associated with information that identifies you when combined with other data.</p>

        <h2 className="section-title">Why We Use Cookies</h2>
        <p>EL BACÁN uses cookies to:</p>
        <ul>
          <li>Improve website functionality</li>
          <li>Remember your preferences</li>
          <li>Analyze website traffic</li>
          <li>Understand visitor behavior</li>
          <li>Enhance website performance</li>
          <li>Improve the overall user experience</li>
          <li>Support website security</li>
          <li>Measure the effectiveness of marketing campaigns</li>
        </ul>

        <h2 className="section-title">Types of Cookies We Use</h2>
        
        <p><strong>Essential Cookies</strong></p>
        <p>These cookies are necessary for the operation of our website. They enable core functionality such as:</p>
        <ul>
          <li>Security</li>
          <li>Navigation</li>
          <li>Age verification</li>
          <li>Form submissions</li>
          <li>Website accessibility</li>
        </ul>
        <p>Without these cookies, certain features may not function properly.</p>

        <p><strong>Performance & Analytics Cookies</strong></p>
        <p>These cookies help us understand how visitors interact with our website. They allow us to analyze information such as:</p>
        <ul>
          <li>Pages visited</li>
          <li>Time spent on the website</li>
          <li>Navigation patterns</li>
          <li>Device types</li>
          <li>Browser information</li>
        </ul>
        <p>This information helps us continually improve the EL BACÁN website.</p>

        <p><strong>Functionality Cookies</strong></p>
        <p>These cookies remember your preferences to provide a more personalized experience. Examples include:</p>
        <ul>
          <li>Language preferences</li>
          <li>Region selection</li>
          <li>Previously accepted cookie settings</li>
          <li>User interface preferences</li>
        </ul>

        <p><strong>Marketing Cookies</strong></p>
        <p>With your consent, we may use marketing cookies to:</p>
        <ul>
          <li>Measure advertising performance</li>
          <li>Understand campaign effectiveness</li>
          <li>Deliver relevant marketing content</li>
          <li>Improve future advertising efforts</li>
        </ul>
        <p>Marketing cookies may be placed by trusted third-party providers.</p>

        <p><strong>Third-Party Cookies</strong></p>
        <p>Certain third-party services integrated into our website may also use cookies. These may include services such as:</p>
        <ul>
          <li>Google Analytics</li>
          <li>Google Tag Manager</li>
          <li>Meta Pixel</li>
          <li>YouTube</li>
          <li>Vimeo</li>
          <li>Email marketing platforms</li>
          <li>Customer relationship management (CRM) platforms</li>
        </ul>
        <p>These third parties maintain their own privacy and cookie policies. We encourage you to review their policies for additional information.</p>

        <h2 className="section-title">Managing Your Cookie Preferences</h2>
        <p>You may manage or disable cookies at any time through your browser settings. Please note that disabling certain cookies may affect the functionality and performance of this website.</p>
        <p>Most browsers allow you to:</p>
        <ul>
          <li>View stored cookies</li>
          <li>Delete cookies</li>
          <li>Block cookies</li>
          <li>Receive notifications before cookies are stored</li>
        </ul>
        <p>Instructions for managing cookies can typically be found within your browser's Help section.</p>

        <h2 className="section-title">Do Not Track Signals</h2>
        <p>Some browsers offer a "Do Not Track" (DNT) feature.</p>
        <p>At this time, there is no universally accepted standard for responding to DNT signals. As a result, EL BACÁN does not currently respond differently to these browser settings.</p>

        <h2 className="section-title">Changes to This Cookie Policy</h2>
        <p>We may update this Cookie Policy periodically to reflect changes in technology, legal requirements, or our business practices.</p>
        <p>Any updates will become effective immediately upon publication on this website.</p>
        <p>The "Last Updated" date above indicates when this policy was most recently revised.</p>
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