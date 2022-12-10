import { useState, useContext } from "react";
import { UserContext } from "../../App";
import CommunityDropdown from "./Components/community-dropdown";
import CreationForm from "./Components/creation-form";
function Submit() {
  const user = useContext<any>(UserContext);
  const [community, setCommunity] = useState<string | null>(null);
  

 
  return (
    <div className="min-h-screen w-full bg-[#dae0e6]">
      <div className="flex p-3 h-full">
        <div className="w-[640px] flex flex-col justify-center mx-auto">
          <div className="mb-2 text-lg text-black font-semibold">
            Create a post
          </div>
          <div className="border-b border-white my-3" />
          <CommunityDropdown setCommunity={setCommunity} />
          <CreationForm user={user} community={community} />
        </div>
      </div>
    </div>
  );
}

export default Submit;
