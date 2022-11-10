import {useState, useEffect} from 'react';
import { getCommunityNames } from '../firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
function Submit() {
    const [value, setValue] = useState("");
    const [names, setNames] = useState<any>([]);
    const [selected, setSelected] = useState(false);
    const [community, setCommunity] = useState("");
    function filterFunction() {
        let input, filter, ul, li, a, i, div;
        input = document.getElementById("SubmitDropdown");
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
    }
    const setHide = () => {
        setSelected(false);
    }
    useEffect(() => {
        async function findNames() {
            const data = await getCommunityNames();
            setNames(data);
            console.log(data);
        }
        findNames();
    }, [])
    return (
        <div className="min-h-screen w-full bg-[#dae0e6]">
            <div className="flex p-3 h-full">
                <div className="w-[640px] flex flex-col justify-center mx-auto">
                    <div className="mb-2 text-lg text-black font-semibold">
                        Create a post
                    </div>
                    <div className="border-b border-white my-3"/>
                    <div className='relative'>
                        <div className='flex border rounded bg-white p-2 max-w-[50%]'>
                            <FontAwesomeIcon className="my-auto text-gray-400 mr-4" icon={faSearch} />
                            <input className="border-none w-full focus:outline-none text-gray-500" placeholder="Choose a community" id="SubmitDropdown" onKeyUp={filterFunction} onChange={(e) => {setValue(e.target.value)}} onClick={setShow} onBlur={setHide} />
                            <FontAwesomeIcon className="my-auto text-gray-400 cursor-pointer" icon={faChevronDown} />
                        </div>
                        <div className={`${selected ? "visible" : "hidden"}`}>
                            {names.map((name: string) => {
                                return <a key={name} href={`#` + name}>{name}</a>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Submit;