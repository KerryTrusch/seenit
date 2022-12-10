import Input from "../../../Shared/components/Input";
import Icon from "../../../Shared/components/Icon";
import { useState, useEffect } from "react";
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getCommunityNames } from "../../../firebase";

interface CommunityDropdownDetails {
  setCommunity: any;
}
const CommunityDropdown = ({ setCommunity }: CommunityDropdownDetails) => {
  //input value
  const [value, setValue] = useState("");
  //community names for dropdown
  const [names, setNames] = useState<any>([]);
  //whether input is selected or not
  const [selected, setSelected] = useState(false);

  function filterFunction() {
    let filter, a, i, div;
    filter = value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div!.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      let txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  const setShow = () => {
    setSelected(true);
  };
  const setHide = () => {
    setSelected(false);
  };
  const flipHide = () => {
    setSelected(!selected);
  };
  const selectElement = (community: string) => {
    setValue("r/" + community);
    setCommunity(community);
    setHide();
  };

  useEffect(() => {
    async function findNames() {
      const data = await getCommunityNames();
      setNames(data);
    }
    findNames();
  }, []);

  return (
    <div className="relative mb-3">
      <div className="flex border rounded bg-white p-2 max-w-[50%]">
        <Icon className={`${selected ? "hidden" : "block"} my-auto text-gray-400 mr-4`} icon={faSearch} />
        <Input onChange={setValue} onKeyUp={filterFunction} onClick={setShow} value={value} className="bg-white"/>
        <div onClick={flipHide} className="my-auto ml-4">
          <Icon
            className={`${selected ? "block" : "hidden"} text-gray-400 cursor-pointer`}
            icon={faChevronDown}
          />
        </div>
      </div>
      <div className={`${selected ? "visible" : "hidden"} absolute w-[50%]`}>
        <div className="flex flex-col rounded" id="myDropdown">
          {names.map((name: string) => {
            return (
              <a
                className="bg-white w-full flex p-2"
                key={name}
                href={`#` + name}
                onClick={(e) => {
                  selectElement(name);
                }}
              >
                <img
                  className="rounded-full h-8"
                  src={`/default.png`}
                  alt={`profile`}
                />
                <span className="my-auto mx-3">{name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommunityDropdown;
