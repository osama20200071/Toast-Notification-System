import { useAppDispatch } from "../../store/hooks";
import { addToast } from "../../store/toast/toastsSlice";
import RadioInput from "./RadioInput";
import { ToastItemProps } from "./ToastItem";
const CreateToast = () => {
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (!formData.get("title") || !formData.get("message")) {
      return;
    }
    const toast = {
      title: formData.get("title") as string,
      message: formData.get("message") as string,
      type: formData.get("type") as ToastItemProps["type"],
      position: formData.get("position") as ToastItemProps["position"],
      delay: 1000 * Number(formData.get("delay")), // convert to ms
      duration: 1000 * Number(formData.get("duration")), // convert to ms
      showProgressBar: formData.get("showProgressBar") === "on",
    };
    dispatch(addToast(toast));
    form.reset();
  };

  return (
    <div className="mt-6 p-6 bg-slate-300 mx-auto w-1/2 rounded-md">
      <form className="flex flex-col gap-5" onSubmit={submitHandler}>
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <label className="text-red-600 text-xl -mb-2">*</label>
            <input
              className="px-2 py-1 rounded-md w-full focus:outline-slate-300 "
              type="text"
              name="title"
              placeholder="Title"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-red-600 text-xl -mb-2">*</label>
            <input
              className="px-2 py-1 rounded-md w-full focus:outline-slate-300"
              type="text"
              name="message"
              placeholder="Message"
            />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <RadioInput name="type" value="success" defaultChecked />
            <RadioInput name="type" value="error" />
            <RadioInput name="type" value="info" />
            <RadioInput name="type" value="warning" />
          </div>
          <div>
            <RadioInput name="position" value="top-right" />
            <RadioInput name="position" value="top-center" />
            <RadioInput name="position" value="top-left" />
          </div>
          <div>
            <RadioInput name="position" value="bottom-right" defaultChecked />
            <RadioInput name="position" value="bottom-center" />
            <RadioInput name="position" value="bottom-left" />
          </div>
        </div>
        <div className="flex  items-start justify-between">
          <div className="flex items-center gap-3">
            <label className="text-slate-500 select-none text-sm">
              Duration (in seconds){" "}
            </label>
            <input
              className="w-20 px-3 text-slate-500 rounded-md focus:outline-slate-300"
              type="number"
              name="duration"
              min={1}
              max={6}
              defaultValue={4}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-slate-500 select-none text-sm">
              Delay (in seconds){" "}
            </label>
            <input
              className="w-20 px-3 text-slate-500 rounded-md focus:outline-slate-300"
              type="number"
              name="delay"
              min={0}
              max={6}
              defaultValue={0}
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              className="text-slate-500 select-none text-sm"
              htmlFor="showProgressBar"
            >
              Show Progress Bar
            </label>
            <input
              className="text-slate-500 rounded-md focus:outline-slate-300 "
              type="checkbox"
              name="showProgressBar"
              id="showProgressBar"
              defaultChecked
            />
          </div>
        </div>

        <button
          className="px-5 py-2 mt-3 bg-slate-500 rounded-md text-slate-50 w-1/4 select-none mx-auto hover:bg-slate-700"
          type="submit"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default CreateToast;
