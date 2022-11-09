interface SidebarDetails {
    openCommunityModal: any;
}
function HomeSidebar({openCommunityModal}: SidebarDetails) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col rounded bg-white max-w-xs">
          <img
            className="rounded-t h-10 w-full"
            src={`/space.png`}
            alt="create banner"
          />
          <div className="p-3">
            <div className="flex mb-2">
                <img className="h-16 mt-[-20px]" src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png" alt="seenitoo" />
                <h2 className="font-semibold my-auto ml-3"> Home </h2>
            </div>
            <span className="text-sm">
              Your personal Seenit homepage. Come here to check in with your
              favorite communities.
            </span>
            <div className="border-b my-4" />
            <button className="border-none bg-blue-600 text-white rounded-3xl py-1 w-full mb-2 font-bold">Create Post</button>
            <button className="bg-white text-blue-600 rounded-3xl py-1 w-full border border-blue-600 font-bold" onClick={openCommunityModal}>Create Community</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSidebar;
