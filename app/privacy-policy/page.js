"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function PrivacyPolicy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <title>Privacy Policy - El Bacán</title>
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

        /* --- PRIVACY POLICY CONTENT --- */
        .policy-container { max-width: 800px; margin: 0 auto; padding: 4rem 2rem 6rem; }
        .page-title { font-family: 'Arpona-Semibold', serif; font-size: 36px; text-align: center; margin-bottom: 0.5rem; }
        .date-text { text-align: center; color: #888888; font-size: 14px; margin-bottom: 4rem; letter-spacing: 0.05em; }
        .section-title { font-family: 'Arpona-Semibold', serif; font-size: 20px; color: #b58045; margin-top: 3rem; margin-bottom: 1rem; border-bottom: 1px solid #1a1a1a; padding-bottom: 0.5rem; }
        p { font-size: 16px; margin-bottom: 1rem; color: #cccccc; }
        ul { margin-bottom: 1.5rem; padding-left: 1.5rem; color: #cccccc; }
        li { margin-bottom: 0.5rem; font-size: 16px; }
        strong { color: #e6d5c3; }
        a.policy-link { color: #b58045; text-decoration: none; }
        a.policy-link:hover { text-decoration: underline; }

        /* --- FOOTER --- */
        .footer { width: 100%; background-color: #0a0a0a; padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-sizing: border-box; }
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
      <main className="policy-container">
        <h1 className="page-title">PRIVACY POLICY</h1>
        <p className="date-text">
          Effective Date: January 1, 2026<br/>
          Last Updated: January 1, 2026
        </p>

        <h2 className="section-title">Protecting Your Privacy</h2>
        <p>At EL BACÁN, we believe trust is earned through transparency, integrity, and respect.</p>
        <p>Just as every EL BACÁN cigar is handcrafted with exceptional attention to detail, we are equally committed to protecting the personal information you choose to share with us.</p>
        <p>This Privacy Policy explains how information is collected, used, disclosed, and protected when you visit www.elbacancigars.com, contact us, submit a Trade Partner application, or otherwise interact with the EL BACÁN brand.</p>

        <h2 className="section-title">Brand Ownership</h2>
        <p>EL BACÁN® is a registered premium cigar brand owned by Forleah Investments LLC.</p>
        <p>Commercial operations, customer support, wholesale distribution, marketing activities, and website administration may be managed by Latin American Cigars Corp., acting on behalf of the EL BACÁN brand.</p>
        <p>Throughout this Privacy Policy, the terms "EL BACÁN," "we," "our," and "us" refer collectively to Forleah Investments LLC and, where applicable, Latin American Cigars Corp.</p>

        <h2 className="section-title">Information We Collect</h2>
        <p>Depending on how you interact with our website or business, we may collect information including:</p>
        <ul>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Business Name</li>
          <li>Company Address</li>
          <li>Tax ID / EIN</li>
          <li>Billing Information</li>
          <li>Shipping Information</li>
          <li>IP Address</li>
          <li>Browser Information</li>
          <li>Device Information</li>
          <li>Website Usage Data</li>
          <li>Marketing Preferences</li>
        </ul>
        <p>We collect only the information reasonably necessary to provide our products, services, and customer support.</p>

        <h2 className="section-title">How We Use Your Information</h2>
        <p>We may use your information to:</p>
        <ul>
          <li>Respond to inquiries</li>
          <li>Process Trade Partner applications</li>
          <li>Manage wholesale relationships</li>
          <li>Provide customer service</li>
          <li>Improve our website</li>
          <li>Send product announcements</li>
          <li>Communicate marketing updates (only with your consent where required)</li>
          <li>Prevent fraud</li>
          <li>Maintain website security</li>
          <li>Comply with applicable laws and regulations</li>
        </ul>

        <h2 className="section-title">Cookies & Similar Technologies</h2>
        <p>Our website uses cookies and similar technologies to improve your browsing experience.</p>
        <p>Cookies help us:</p>
        <ul>
          <li>Remember user preferences</li>
          <li>Improve website functionality</li>
          <li>Analyze website performance</li>
          <li>Measure visitor engagement</li>
          <li>Improve future user experiences</li>
        </ul>
        <p>You may disable cookies through your browser settings at any time.</p>

        <h2 className="section-title">Marketing Communications</h2>
        <p>If you voluntarily subscribe to receive communications from EL BACÁN, we may send you information regarding:</p>
        <ul>
          <li>New product releases</li>
          <li>Brand news</li>
          <li>Events</li>
          <li>Trade opportunities</li>
          <li>Promotions</li>
          <li>Company updates</li>
        </ul>
        <p>You may unsubscribe from marketing communications at any time using the unsubscribe link included in our emails.</p>

        <h2 className="section-title">Information Sharing</h2>
        <p>We respect your privacy. EL BACÁN does not sell your personal information.</p>
        <p>We may share limited information only with trusted service providers who assist us in operating our business, including:</p>
        <ul>
          <li>Website hosting providers</li>
          <li>Email service providers</li>
          <li>Analytics providers</li>
          <li>Payment processors</li>
          <li>Shipping carriers</li>
          <li>Technology vendors</li>
        </ul>
        <p>These providers are contractually required to safeguard your information and may only use it to perform services on our behalf.</p>

        <h2 className="section-title">Data Security</h2>
        <p>We maintain commercially reasonable administrative, technical, and physical safeguards designed to protect your personal information against unauthorized access, disclosure, alteration, or destruction.</p>
        <p>Although no method of electronic transmission or storage is completely secure, we continuously implement industry-standard security measures to help protect your information.</p>

        <h2 className="section-title">Your Privacy Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Withdraw consent for marketing communications</li>
          <li>Request a copy of your personal information</li>
          <li>Object to certain processing activities</li>
        </ul>
        <p>To exercise any applicable privacy rights, please contact us using the information below.</p>

        <h2 className="section-title">California Privacy Rights</h2>
        <p>If you are a California resident, you may have additional rights under applicable California privacy laws, including the right to request access to, correction of, or deletion of certain personal information, subject to applicable legal exceptions.</p>
        <p>Requests will be processed in accordance with applicable law.</p>

        <h2 className="section-title">Age Restriction</h2>
        <p>EL BACÁN products are intended exclusively for adults 21 years of age or older.</p>
        <p>We do not knowingly collect personal information from individuals under the legal age required to purchase tobacco products.</p>
        <p>If we become aware that information has been collected from an individual under the applicable legal age, we will take reasonable steps to delete such information.</p>

        <h2 className="section-title">Third-Party Websites</h2>
        <p>Our website may contain links to third-party websites for your convenience.</p>
        <p>EL BACÁN is not responsible for the privacy practices or content of third-party websites.</p>
        <p>We encourage you to review the privacy policies of any external sites you visit.</p>

        <h2 className="section-title">Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time to reflect changes in our business practices, technology, or applicable laws.</p>
        <p>The revised version will become effective immediately upon publication on this website.</p>
        <p>The "Last Updated" date at the top of this page indicates when the most recent revisions were made.</p>

        <h2 className="section-title">Contact Us</h2>
        <p>If you have any questions regarding this Privacy Policy or your personal information, please contact us:</p>
        <p>
          <strong>EL BACÁN</strong><br />
          Brand Owner: Forleah Investments LLC<br />
          Commercial Operations: Latin American Cigars Corp.<br /><br />
          Email: <a href="mailto:privacy@elbacancigars.com" className="policy-link">privacy@elbacancigars.com</a><br />
          Trade Inquiries: <a href="mailto:trade@elbacancigars.com" className="policy-link">trade@elbacancigars.com</a><br />
          Website: <a href="https://www.elbacancigars.com" className="policy-link">www.elbacancigars.com</a>
        </p>
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