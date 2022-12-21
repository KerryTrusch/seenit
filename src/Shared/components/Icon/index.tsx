import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconDetails {
  className?: string;
  icon: any;
  onClick?: any;
}

const Icon = ({ icon, className, onClick }: IconDetails) => {
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default Icon;
