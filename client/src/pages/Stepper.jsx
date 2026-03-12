import { Children, useMemo, useState } from "react";

function Step({ children }) {
  return <>{children}</>;
}

function Stepper({
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  backButtonText = "Previous",
  nextButtonText = "Next",
  finalButtonText = "Submit",
  isNextDisabled = false,
  className = "",
  contentMinHeightClass = "min-h-[220px]",
  children,
}) {
  const steps = useMemo(() => Children.toArray(children), [children]);
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(
    Math.min(Math.max(initialStep, 1), Math.max(totalSteps, 1))
  );

  const goBack = () => {
    setCurrentStep((prev) => {
      const next = Math.max(1, prev - 1);
      onStepChange(next);
      return next;
    });
  };

  const goNext = () => {
    if (isNextDisabled) {
      return;
    }

    setCurrentStep((prev) => {
      const next = Math.min(totalSteps, prev + 1);
      onStepChange(next);
      return next;
    });
  };

  const isFinalStep = currentStep === totalSteps;

  return (
    <div className={`rounded-3xl border border-cyan-100 bg-white p-5 shadow-lg ${className}`}>
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
          <span>Doctor Flow</span>
          <span>
            Step {currentStep} / {totalSteps}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className={contentMinHeightClass}>{steps[currentStep - 1]}</div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 1}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {backButtonText}
        </button>

        {!isFinalStep && (
          <button
            type="button"
            onClick={goNext}
            disabled={isNextDisabled}
            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {nextButtonText}
          </button>
        )}

        {isFinalStep && (
          <button
            type="button"
            onClick={onFinalStepCompleted}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            {finalButtonText}
          </button>
        )}
      </div>
    </div>
  );
}

export { Step };
export default Stepper;
