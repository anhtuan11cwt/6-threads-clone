import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center py-10">
      <Loader2 className="animate-spin text-neutral-400" size={28} />
    </div>
  );
};

export default Loader;
