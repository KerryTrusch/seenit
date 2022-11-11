import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faChartSimple, faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
interface SortDetails {
  posts: object[];
  setPosts: any;
}
function Sortbar({posts, setPosts}: SortDetails) {
  const [selected, setSelected] = useState(0);
  function sortTop() {
    const res = [...posts].sort((a: any, b: any) => {
      if (a.upvotes === b.upvotes) {
        return b.timestamp - a.timestamp;
      } else {
        return b.upvotes - a.upvotes;
      }
    });
    setPosts(res);
  }
  function sortNew() {
    const res = [...posts].sort((a: any, b: any) => {
      return b.timestamp - a.timestamp;
    });
    setPosts(res);
  }
  function sortHot() {
    const res = [...posts].sort((a: any, b: any) => {
      return (1/(Date.now() - b.timestamp) * b.upvotes) - (1/(Date.now() - a.timestamp) * a.upvotes);
    });
    setPosts(res);
  }
  return (
    <div className="w-full mb-5">
      <div className="flex p-2 bg-white rounded shadow">
        <div className="flex flex-col justify-center">
          <div className="flex px-2">
            <div className={`${selected === 1 ? "bg-gray-300" : ""} flex mr-2 rounded-2xl hover:bg-gray-200 py-2 px-2.5 cursor-pointer`} onClick={(e) => {setSelected(1); sortHot();}}>
              <FontAwesomeIcon className="my-auto" icon={faFire} />
              <span className="text-gray-500 text-sm font-bold ml-1.5 my-auto">
                Hot
              </span>
            </div>
            <div className={`${selected === 2 ? "bg-gray-300" : ""} flex mr-2 rounded-2xl hover:bg-gray-200 py-2 px-2.5 cursor-pointer`} onClick={(e) => {setSelected(2); sortNew();}}>
              <FontAwesomeIcon className="my-auto" icon={faArrowDownShortWide} />
              <span className="text-gray-500 text-sm font-bold ml-1.5 my-auto">
                New
              </span>
            </div>
            <div className={`${selected === 3 ? "bg-gray-300" : ""} flex mr-2 rounded-2xl hover:bg-gray-200 py-2 px-2.5 cursor-pointer`} onClick={(e) => {setSelected(3); sortTop();}}>
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

export default Sortbar;
