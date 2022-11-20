import { useRef, Fragment } from "react";
import Textarea from "../../../../Shared/components/Textarea";
import Button from "../../../../Shared/components/Button";
interface BodyFormDetails {
  value: string;
  onChange: any;
  isWorking: boolean;
  onSubmit: () => void;
  onCancel: any;
  disabled: boolean;
}
const BodyForm = ({
  value,
  onChange,
  isWorking,
  onSubmit,
  onCancel,
  disabled,
}: BodyFormDetails) => {
  const $textarearef: any = useRef();

  const handleSubmit = () => {
    if ($textarearef.current.value.trim()) {
      onSubmit();
    }
  };
  return (
    <Fragment>
      <Textarea
        autoFocus
        placeholder="What are your thoughts?"
        value={value}
        onChange={onChange}
        ref={$textarearef}
      />
      <div className="bg-gray-300 p-1">
        <div className="flex">
          <div className="ml-auto">
            <Button
              className="ml-auto text-sm font-semibold text-red-500 px-5 py-0.5"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
          <Button
            onClick={handleSubmit}
            className={`${
              disabled
                ? "bg-gray-700/[0.4] hover:cursor-not-allowed"
                : "bg-gray-700"
            } rounded-2xl text-sm font-semibold text-white px-5 py-0.5`}
            disabled={disabled}
          >
            Reply
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default BodyForm;
