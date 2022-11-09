import Sortbar from "./core/sortbar";
import TextPost from "./core/text-post";
import LinkPost from "./core/link-post";
import HomeSidebar from "./core/home-sidebar";
import CommunityModal from "./core/community-modal";
import { useState } from "react";
//7 margin for between elements
function HomePage() {
  const [communityModal, setCommunityModal] = useState(false);

  const closeCreateCommunity = () => {
    setCommunityModal(false);
  }
  const openCreateCommunity = () => {
    setCommunityModal(true);
  }
  return (
    <div className="min-h-screen w-full bg-[#dae0e6]">
      <div className="flex lg:p-3 h-full w-full">
        <div className="flex lg:w-auto lg:mx-auto w-full">
          <div className="w-full lg:w-[640px] flex flex-col justify-center lg:mx-7">
            <div className="mb-2 text-sm text-black font-semibold">
              Popular posts
            </div>
            <Sortbar />
            <TextPost
              subreddit={"AskReddit"}
              user={"Test"}
              numComments={10000}
              upvotes={10000}
              title={"This is a test title"}
              isFrontPage={true}
            />
            <LinkPost
              subreddit={"AskReddit"}
              user={"Test"}
              numComments={10000}
              upvotes={10000}
              title={"This is a test title"}
              isFrontPage={true}
              linksrc={"http://www.google.com"}
            />
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
