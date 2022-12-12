interface CreationFormSubmitDetails {
  disabled: boolean;
}
const CreationFormSubmit = ({ disabled }: CreationFormSubmitDetails) => {
  return (
    <button
      className={`${
        disabled ? "bg-gray-600/[0.5] hover:cursor-not-allowed" : "bg-gray-600"
      } mb-2 ml-auto rounded-2xl py-1 px-4 text-white font-semibold`}
      type="submit"
      disabled={disabled}
    >
      Post
    </button>
  );
};

export default CreationFormSubmit;
