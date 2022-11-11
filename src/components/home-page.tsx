import Sortbar from "./core/sortbar";
import TextPost from "./core/text-post";
import LinkPost from "./core/link-post";
import HomeSidebar from "./core/home-sidebar";
import CommunityModal from "./core/community-modal";
import { useState, useEffect } from "react";
import { getPostsForHomepage } from "../firebase";
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
            <Sortbar />
            {globalPosts.map((post: any) => {
                  if (post.type === "text") {
                    return (
                      <TextPost subreddit={post.communityName} user={post.author} upvotes={0} title={post.postTitle} numComments={0} isFrontPage={true} key={post.hash}/>
                    )
                  } else if (post.type === "link") {
                    return (
                      <LinkPost subreddit={post.communityName} user={post.author} upvotes={0} title={post.postTitle} numComments={0} isFrontPage={true} linksrc={post.linksrc} key={post.hash} />
                    )
                  } else {
                    return (
                       //Eventually turn this into an image post
                      <LinkPost subreddit={post.communityName} user={post.author} upvotes={0} title={post.postTitle} numComments={0} isFrontPage={true} linksrc={post.linksrc} key={post.hash} />
                    )
                  }
                })}
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
