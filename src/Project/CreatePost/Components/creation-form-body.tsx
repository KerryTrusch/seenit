import React from "react";
interface CreationFormBodyDetails {
  postType: number;
  setBody: any;
  setTitle: any;
  setTitleCharacter: any;
  titleCharacters: number;
  setImagesrc: any;
  setLink: any;
}
const CreationFormBody = ({
  postType,
  setBody,
  setTitle,
  setTitleCharacter,
  titleCharacters,
  setImagesrc,
  setLink,
}: CreationFormBodyDetails) => {
  const FormTitle = () => {
    return (
      <div className="rounded flex border border-gray-300 my-3">
        <input
          className="w-full rounded p-2 border-none focus:outline-none"
          placeholder="Title"
          onChange={(e) => {
            setTitleCharacter(e.target.value.length);
            setTitle(e.target.value);
          }}
        />
        <span className="text-xs font-semibold text-gray-500 my-auto pr-2">
          {titleCharacters}/300
        </span>
      </div>
    );
  };
  return (
    <React.Fragment>
      <FormTitle />
      {postType === 1 && (
        <textarea
          className="resize-y rounded border border-gray-300 w-full p-2 mb-4"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Text (optional)"
        />
      )}
      {postType === 3 && (
        <textarea
          className="rounded border border-gray-300 w-full p-2 mb-4"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          placeholder="Url"
        />
      )}
    </React.Fragment>
  );
};

export default CreationFormBody;
