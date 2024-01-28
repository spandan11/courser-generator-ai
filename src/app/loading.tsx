import { ReloadIcon } from "@radix-ui/react-icons";

const Loading = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/5">
      <ReloadIcon className="h-12 w-12 animate-spin bg-white text-black" />
    </div>
  );
};

export default Loading;
