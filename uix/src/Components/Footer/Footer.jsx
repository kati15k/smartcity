import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { LuReceiptJapaneseYen } from "react-icons/lu";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open and close modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="footer">
      <div className="footerContainer container grid">
        {/* First Line: Logo */}
        <div data-aos="fade-up" data-aos-duration="2000" className="footerDiv">
          <div data-aos="fade-up" data-aos-duration="2000" className="footerLogo">
            <a href="" className="logo flex">
              <h1>
                <LuReceiptJapaneseYen className="icon" />
                <div style={{color:"black"}}>Kyotokeen</div>
              </h1>
            </a>
          </div>
        </div>

        {/* Second Line: Page Links */}
        <div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
          <Link to='/login'>Login</Link>
          <Link to='/companies'>Businesses & Companies</Link>
          <Link to='/academic'>Academic</Link>
          <Link to='/job'>Jobs</Link>
        </div>

        <div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
          <Link to='/amusement'>Tourist Attractions</Link>
          <Link to='/about'>About Us</Link>
          <Link to='/text'>Communication</Link>
          <Link to='/manners'>Manners</Link>
        </div>

        {/* Third Line: Contact and Copyright */}
        <div  className="footerLinks">
          <span className="contactInfo">
            <span className="phone">+212 621696597</span>
            <span className="email">Ktech@gmail.com</span>
          </span>
          <div className="copyright">
            <p>&copy; 2025 Kyotokeen. All Rights Reserved.
              <div className="linkies" onClick={openModal}>Learn Our Policies</div>
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Policies */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{color:'black'}}>Our Data Collection and Privacy Policy</h2>
            <p>At Kyotokeen, we value the privacy and safety of your personal information. We collect data only when necessary to enhance your experience with us. Here’s how we handle it:</p>

            <h3>1. How We Use Your Data</h3>
            <ul>
              <li>Provide you with personalized content and services.</li>
              <li>Improve the user experience on our website and mobile apps.</li>
              <li>Communicate with you regarding our services and promotions.</li>
              <li>Ensure security and prevent fraud.</li>
            </ul>

            <h3>2. Data Protection</h3>
            <p>Your data is stored securely, and we implement strict access controls to prevent unauthorized access. We use encryption and other security measures to protect your personal information.</p>

            <h3>3. Sharing Your Data</h3>
            <p>We do not sell your data to third parties. We may share your information with trusted service providers to assist with business operations (e.g., payment processing, email services) under strict contractual obligations to protect your privacy.</p>

            <div className="modal-actions">
              <button onClick={closeModal} className="close-btnss">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
