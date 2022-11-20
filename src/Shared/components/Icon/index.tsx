import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconDetails {
  className: string;
  icon: any;
}

const Icon = ({ icon, className }: IconDetails) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default Icon;
