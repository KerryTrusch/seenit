import Icon from "../../../Shared/components/Icon";
interface CreationFormHeaderButtonDetails {
    name: string;
    icon: any;
    id: number;
    onClick: any;
    currentPostID: number;
}
const CreationFormHeaderButton = ({name, icon, id, onClick, currentPostID}: CreationFormHeaderButtonDetails) => {
    return (
        <div
            className={`${
              currentPostID === id
                ? "text-blue-600 border-b-blue-600"
                : "text-gray-500"
            } flex basis-1/3 py-2 border-b border-r hover:cursor-pointer hover:bg-blue-100`}
            onClick={(e) => {
              onClick(id);
            }}
          >
            <div className="flex my-auto mx-auto font-semibold">
              <Icon className="mr-2" icon={icon} />
              <span>{name}</span>
            </div>
          </div>
    )
}

export default CreationFormHeaderButton;

