import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faChartSimple, faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
function sortbar() {
  return (
    <div className="w-full mb-5">
      <div className="flex p-2 bg-white rounded shadow">
        <div className="flex flex-col justify-center">
          <div className="flex px-2">
            <div className="flex mr-2 rounded-2xl hover:bg-gray-200 py-2 px-2.5 cursor-pointer">
              <FontAwesomeIcon className="my-auto" icon={faFire} />
              <span className="text-gray-500 text-sm font-bold ml-1.5 my-auto">
                Hot
              </span>
            </div>
            <div className="flex mr-2 rounded-2xl hover:bg-gray-200 py-2 px-2.5 cursor-pointer">
              <FontAwesomeIcon className="my-auto" icon={faArrowDownShortWide} />
              <span className="text-gray-500 text-sm font-bold ml-1.5 my-auto">
                New
              </span>
            </div>
            <div className="flex mr-2 rounded-2xl hover:bg-gray-200 py-2 px-2.5 cursor-pointer">
              <FontAwesomeIcon className="my-auto" icon={faChartSimple} />
              <span className="text-gray-500 text-sm font-bold ml-1.5 my-auto">
                Top
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sortbar;
