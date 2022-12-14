import React from "react";
interface CreationFormBodyDetails {
  postType: number;
  setBody: any;
  setImagesrc: any;
  setLink: any;
}
const CreationFormBody = ({
  postType,
  setBody,
  setImagesrc,
  setLink
}: CreationFormBodyDetails) => {
  return (
    <React.Fragment>
      {postType === 1 && (
        <textarea
          className="resize-y rounded border border-gray-300 w-full p-2 mb-4"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Text (optional)"
        />
      )}
      {postType === 2 && (
        <div className="h-64 w-full flex flex-col justify-center border border-dashed ">
            <input className="mx-auto" type="file" onChange={setImagesrc}/>
        </div>
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
