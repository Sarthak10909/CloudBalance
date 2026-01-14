import { toast } from "react-toastify";

const CopyBlock = ({ text, inline }) => {
  const copy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <div className={`relative ${inline ? "max-w-md" : ""}`}>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {text}
      </pre>

      <button
        onClick={copy}
        className="absolute top-2 right-2 text-sm px-2 py-1 border rounded hover:bg-gray-200"
      >
        Copy
      </button>
    </div>
  );
};

export default CopyBlock;
