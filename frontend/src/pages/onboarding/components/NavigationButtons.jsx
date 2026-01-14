const NavigationButtons = ({ step, onNext, onPrev, onSubmit }) => {
  return (
    <div className="flex w-full justify-between">
      <button
        disabled={step === 1}
        onClick={onPrev}
        className={`px-6 py-2 rounded-md border transition
          ${step === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-400 hover:bg-gray-100"}
        `}
      >
        Prev
      </button>

      {step < 3 && (
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Next
        </button>
      )}

      {step === 3 && (
        <button
          onClick={onSubmit}
          className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
