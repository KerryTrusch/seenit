interface CommunityFormTitleDetails {
    setTitleCharacter: any;
    setTitle: any;
    title: any;
    titleCharacters: any;
}
const CommunityFormTitle = ({setTitleCharacter, setTitle, title, titleCharacters}: CommunityFormTitleDetails) => {
  return (
    <div className="rounded flex border border-gray-300 my-3">
      <input
        className="w-full rounded p-2 border-none focus:outline-none"
        placeholder="Title"
        onChange={(e) => {
          setTitleCharacter(e.target.value.length);
          setTitle(e.target.value);
        }}
        value={title || ""}
      />
      <span className="text-xs font-semibold text-gray-500 my-auto pr-2">
        {titleCharacters}/300
      </span>
    </div>
  );
};

export default CommunityFormTitle;
