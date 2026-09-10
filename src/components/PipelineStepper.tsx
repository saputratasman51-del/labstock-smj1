import { Check } from "lucide-react";
import { PIPELINE_STEPS } from "../data/labstock";
import { cn } from "../utils/cn";

export default function PipelineStepper({ received }: { received: boolean }) {
  return (
    <div className="grid animate-rise grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-5" style={{ animationDelay: "90ms" }}>
      {PIPELINE_STEPS.map((step, i) => {
        const isFinal = step.done;
        const count = isFinal && received ? "13 PO" : step.count;
        return (
          <div
            key={step.stage}
            className={cn(
              "flex flex-col justify-between rounded p-space-base shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-panel",
              step.cardCls
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "font-sans text-caption font-semibold uppercase",
                  isFinal ? "text-primary" : "text-secondary"
                )}
              >
                {step.stage}
              </span>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full font-mono text-data-mono-sm",
                  step.badgeCls,
                  i > 0 && i < 5 && "font-bold"
                )}
              >
                {isFinal ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
            </div>
            <div className="mt-space-md">
              <div className={cn("font-sans text-headline-md font-bold", step.valueCls)}>{count}</div>
              <div className="mt-0.5 font-sans text-body-sm text-on-surface-variant">{step.label}</div>
            </div>
            <div className="mt-space-sm flex items-center justify-between pt-space-xs font-sans text-caption text-secondary">
              <span className="truncate">{step.footerLeft}</span>
              <span className={cn("font-semibold", step.footerRightCls)}>{step.footerRight}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
