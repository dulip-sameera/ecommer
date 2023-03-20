import "./footer.styles.css";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4 className="footer__heading footer__brand--logo">ECOMMER</h4>
          <div className="footer__brand--description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">ABOUT US</h4>
          <ul className="footer__list">
            <li className="footer__list--item">Careers</li>
            <li className="footer__list--item">Our Stores</li>
            <li className="footer__list--item">Terms & Conditions</li>
            <li className="footer__list--item">Privacy Policy</li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">CUSTOMER CARE</h4>
          <ul className="footer__list">
            <li className="footer__list--item">Help Center</li>
            <li className="footer__list--item">Track Your Order</li>
            <li className="footer__list--item">Corporate & Bulk Purchasing</li>
            <li className="footer__list--item">Returns & Refunds</li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">CONTACT US</h4>
          <ul className="footer__list">
            <li className="footer__list--item">
              50 North Whatever Blvd, Washington, DC 10501
            </li>
            <li className="footer__list--item">Email: mrdulip@gmail.com</li>
            <li className="footer__list--item">(222)333-4444</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
