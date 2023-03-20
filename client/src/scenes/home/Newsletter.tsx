import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import "./newsletter.styles.css";

type Props = {};

const Newsletter = (props: Props) => {
  return (
    <section className="newsletter">
      <div className="newsletter__image">
        <EnvelopeOpenIcon className="newsletter__image--icon" />
      </div>
      <h4 className="newsletter__heading">SUBSCRIBE TO OUR NEWSLETTER</h4>
      <p className="newsletter__description">
        and receive $20 coupon for your first order when your checkout
      </p>
      <div className="newsletter__email">
        <input
          className="newsletter__email--input"
          type="text"
          placeholder="Enter email"
        />
        {/* <span className="newsletter__email--divider"></span> */}
        <button className="newsletter__email--button">Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;
