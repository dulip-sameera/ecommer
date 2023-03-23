import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import "./confirmation.styles.css";
type Props = {};

const Confirmation = (props: Props) => {
  return (
    <section className="confirmation">
      <div className="confirmation__container">
        <div className="confirmation__heading">
          <CheckBadgeIcon className="confirmation__heading--icon" />
          <h1 className="confirmation__heading--h1">Success</h1>
        </div>
        <p className="confirmation__message">
          You have successfully made an Order
          <strong> &#8212; Congrats on Making your Purchase</strong>
        </p>
      </div>
    </section>
  );
};

export default Confirmation;
