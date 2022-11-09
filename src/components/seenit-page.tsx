import Sortbar from "./core/sortbar";
import TextPost from "./core/text-post";
import LinkPost from "./core/link-post"; 
import CommunitySidebar from "./core/community-sidebar";
import { getCommunityData, getTotalUsersInCommunity } from "../firebase";
import {useState, useEffect, useContext} from 'react';
import { UserContext } from "../App";
import CreatePostBar from "./core/create-post-bar";
function SeenitPage() {
    const [pageData, setPageData] = useState<any | null>({});
    const [numUsers, setNumUsers] = useState<number>(0);
    const user = useContext(UserContext);
    const url = window.location.href;
    const splitUrl = url.split("/r/");
    useEffect(() => {
        async function pullData() {
            const data = await getCommunityData(splitUrl[1]);
            setPageData(data);
            const num = await getTotalUsersInCommunity(splitUrl[1]);
            setNumUsers(num);
        }
        pullData();
    }, [])
    if (pageData === null) {
        return (
            <div>
                404
            </div>
        )
    }
    return (
        <div className="min-h-screen w-full bg-[#dae0e6]">
          <div className="bg-blue-500 h-20"/>
          <div className="bg-white h-20">
            <div className="flex w-[948px] mx-auto">
              <img className="rounded-full outline outline-white mt-[-10px] h-16" src={`/default.png`} alt="logo" />
              <div className="flex flex-col ml-4">
                <div className="flex">
                  <h2 className="font-bold text-3xl p-1 mr-7">{splitUrl[1]}</h2>
                  <button className={`${user === null ? "hidden" : "visible"} border border-blue-600 text-blue-600 rounded-2xl px-6 my-2 font-bold`}>Join</button>
                </div>
                <span className="text-sm text-gray-400 font-semibold p-1">r/{splitUrl[1]}</span>
              </div>
            </div>
          </div>
          <div className="flex lg:p-3 h-full w-full">
            <div className="flex lg:w-auto lg:mx-auto w-full">
              <div className="w-full lg:w-[640px] flex flex-col justify-center lg:mx-7">
                <CreatePostBar />
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
              <div className="hidden lg:block flex flex-col">
                <CommunitySidebar description={pageData.description} numUsers={numUsers}/>
              </div>
            </div>
          </div>
        </div>
      );
}

export default SeenitPage;