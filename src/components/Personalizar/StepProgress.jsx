
const steps = ["Ocasión", "Flores", "Color", "Extras", "Mensaje"];

export default function StepProgress({ currentStep }) {
  return (
    <div className="flex justify-between items-center my-12 w-full max-w-4xl mx-auto px-4">
      {steps.map((step, index) => (
        <div key={index} className={`flex items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}>
          <div className="flex flex-col items-center relative min-w-fit">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm transition-all z-10
              ${index <= currentStep ? 'bg-[#e91e63] text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
              {index + 1}
            </div>
            <span className={`absolute -bottom-8 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
              ${index <= currentStep ? 'text-[#e91e63]' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-[2px] mx-2 mt-[-20px] transition-colors ${index < currentStep ? 'bg-[#e91e63]' : 'bg-gray-100'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}