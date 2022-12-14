import Sortbar from "./Sidebar/sortbar";
import HomeSidebar from "./Sidebar/home-sidebar";
import CommunityModal from "./CreateCommunity/community-modal";
import { useState, useEffect } from "react";
import { getPostsForHomepage } from "../firebase";
import { postsToJSXArray } from "../Shared/utils/renderPost";
import Spinner from "../Shared/components/Spinner";
//7 margin for between elements

function HomePage() {
  const [communityModal, setCommunityModal] = useState(false);
  const [globalPosts, setGlobalPosts] = useState<object[]>([]);
  
  const closeCreateCommunity = () => {
    setCommunityModal(false);
  }
  const openCreateCommunity = () => {
    setCommunityModal(true);
  }
  useEffect(() => {
    async function initialize() {
      const posts = await getPostsForHomepage();
      setGlobalPosts(posts);
    }
    initialize();
  }, [])
  return (
    <div className="min-h-screen w-full bg-[#dae0e6]">
      <div className="flex lg:p-3 h-full w-full">
        <div className="flex lg:w-auto lg:mx-auto w-full">
          <div className="w-full lg:w-[640px] flex flex-col justify-center lg:mx-7">
            <div className="mb-2 text-sm text-black font-semibold">
              Popular posts
            </div>
            <Sortbar posts={globalPosts} setPosts={setGlobalPosts} />
            {globalPosts.length === 0 && <Spinner size={64} className="mx-auto mt-10"/>}
            {postsToJSXArray(globalPosts, true)}
          </div>
          <div className="hidden lg:block flex flex-col mt-7">
            <HomeSidebar openCommunityModal={openCreateCommunity}/>
          </div>
        </div>
      </div>
      <CommunityModal closeModal={closeCreateCommunity} show={communityModal} />
    </div>
  );
}

export default HomePage;
