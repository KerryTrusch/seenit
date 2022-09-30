import Sortbar from "./core/sortbar";
import TextPost from "./core/text-post";
function HomePage() {
    return (
        <div className="min-h-screen w-full bg-[#dae0e6]">
            <div className="flex p-3 h-full">
                <div className="w-[640px] flex flex-col justify-center mx-auto">
                    <div className="mb-2 text-sm text-black font-semibold">
                        Popular posts
                    </div>
                    <Sortbar />
                    <TextPost subreddit={"AskReddit"} user={"Test"} numComments={10000} upvotes={10000} title={"This is a test title"} isFrontPage={true}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;