const StepIndicator = ({ num, children }) => (
  <div className="flex gap-3 items-start">
    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
      {num}
    </div>
    <p className="leading-relaxed">{children}</p>
  </div>
);

export default StepIndicator;
