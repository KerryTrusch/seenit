import { Link } from "react-router-dom";
interface SidebarDetails {
  description: string;
  numUsers: number;
}
function CommunitySidebar({description, numUsers}: SidebarDetails) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col rounded bg-white max-w-xs">
          <div className="rounded-t bg-blue-600">
            <h2 className="font-semibold my-auto p-3 text-white mr-40"> About community </h2>
          </div>
          <div className="p-3">
            <span className="text-sm">
              {description}
            </span>
            <div className="border-b my-4" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{numUsers}</span>
              <span className="text-xs text-gray-500">Members</span>
            </div>
            <div className="border-b my-4" />
            <Link to={`/submit`}>
            <button className="border-none bg-blue-600 text-white rounded-3xl py-1 w-full mb-2 font-bold">
              Create Post
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunitySidebar;
