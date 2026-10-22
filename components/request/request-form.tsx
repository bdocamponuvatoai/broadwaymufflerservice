"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";

import { ArrowLeftIcon, CheckIcon, MailIcon } from "@/components/icons";
import { buttonClass, cx } from "@/components/ui";
import { services } from "@/lib/content";
import {
  buildMailto,
  buildMessage,
  buildSubject,
  emptyRequest,
  localDateString,
  reviewGroups,
  stepFields,
  validateField,
  validateStep,
  type ContactPreference,
  type FieldName,
  type RequestData,
  type RequestErrors,
} from "@/lib/request";
import { site } from "@/lib/site";

const serviceOptions = [
  ...services.map((service) => ({ value: service.slug as string, label: service.short, full: service.title })),
  { value: "help-me-decide", label: "Help me decide", full: "Help me decide" },
];

const stepTitles = ["Your vehicle", "Your details", "Review & email"] as const;
const contactOptions: ContactPreference[] = ["Email", "Phone", "Either"];

const noop = () => () => {};
/** Today's date on the client only, so the server-rendered HTML never disagrees with it. */
function useToday() {
  return useSyncExternalStore(
    noop,
    () => localDateString(new Date()),
    () => undefined,
  );
}

const inputClass =
  "mt-2 block min-h-12 w-full rounded-[3px] border border-steel/60 bg-white px-4 py-3 text-ink placeholder:text-steel aria-invalid:border-signal aria-invalid:ring-2 aria-invalid:ring-signal/30 focus-visible:border-ink focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-signal";

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`request-${name}`} className="font-display text-lg font-semibold tracking-[0.03em] uppercase">
        {label}
      </label>
      {hint && (
        <p id={`request-${name}-hint`} className="mt-1 text-sm text-steel">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`request-${name}-error`} className="mt-2 text-sm font-medium text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

export function RequestForm({ initialService = "" }: { initialService?: string }) {
  const validService = serviceOptions.some((option) => option.value === initialService) ? initialService : "";
  const [data, setData] = useState<RequestData>({ ...emptyRequest, service: validService });
  const [errors, setErrors] = useState<RequestErrors>({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const today = useToday();

  const serviceLabel = serviceOptions.find((option) => option.value === data.service)?.full ?? data.service;
  const subject = buildSubject(data);
  const message = buildMessage(data, serviceLabel, site.name);
  const mailto = buildMailto(site.email, subject, message);

  const update = (field: FieldName, value: string) => {
    setData((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
    setStatus("");
  };

  const goTo = (next: number) => {
    setStep(next);
    setStatus("");
    // Move focus to the new step's heading once it renders.
    requestAnimationFrame(() => {
      const heading = headingRefs.current[next];
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({
        block: "nearest",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step >= 2) return;
    const stepErrors = validateStep(step, data);
    setErrors(stepErrors);
    const firstInvalid = stepFields[step]?.find((field) => stepErrors[field]);
    if (firstInvalid) {
      const target =
        firstInvalid === "service"
          ? formRef.current?.querySelector<HTMLInputElement>('input[name="service"]')
          : formRef.current?.querySelector<HTMLElement>(`#request-${firstInvalid}`);
      target?.focus();
      return;
    }
    goTo(step + 1);
  };

  const onBlur = (field: FieldName) => {
    if (!data[field]) return;
    const message = validateField(field, data);
    setErrors((previous) => ({ ...previous, [field]: message }));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${message}`);
      setStatus(`Request copied. Paste it into an email to ${site.email}.`);
    } catch {
      setStatus(
        "Copying isn’t available in this browser. Use “Open email draft”, or select the text above to copy it.",
      );
    }
  };

  const describedBy = (field: FieldName, hint = false) =>
    [hint && `request-${field}-hint`, errors[field] && `request-${field}-error`].filter(Boolean).join(" ") || undefined;

  const textInput = (
    field: FieldName,
    props: { autoComplete?: string; inputMode?: "numeric" | "email" | "tel" | "text"; type?: string },
  ) => (
    <input
      id={`request-${field}`}
      name={field}
      type={props.type ?? "text"}
      autoComplete={props.autoComplete}
      inputMode={props.inputMode}
      value={data[field]}
      onChange={(event) => update(field, event.target.value)}
      onBlur={() => onBlur(field)}
      aria-invalid={errors[field] ? true : undefined}
      aria-describedby={describedBy(field)}
      aria-required="true"
      className={inputClass}
    />
  );

  return (
    <div>
      <ol aria-label="Request steps" className="grid grid-cols-3 gap-2 sm:gap-4">
        {stepTitles.map((title, index) => (
          <li
            key={title}
            aria-current={index === step ? "step" : undefined}
            className={cx(
              "border-t-[3px] pt-3 font-display text-sm font-semibold tracking-[0.06em] uppercase sm:text-base",
              index === step
                ? "border-signal text-ink"
                : index < step
                  ? "border-ink text-ink"
                  : "border-line text-steel",
            )}
          >
            <span className="flex items-start gap-2">
              {index < step ? (
                <CheckIcon className="size-4 shrink-0" />
              ) : (
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              )}
              <span>{title}</span>
              {index < step && <span className="sr-only">(complete)</span>}
            </span>
          </li>
        ))}
      </ol>

      <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-10" aria-label="Service request">
        {step === 0 && (
          <section aria-labelledby="step-vehicle" className="space-y-7">
            <h2
              id="step-vehicle"
              ref={(node) => {
                headingRefs.current[0] = node;
              }}
              tabIndex={-1}
              className="text-display text-4xl uppercase outline-none sm:text-5xl"
            >
              What’s bringing you in?
            </h2>

            <fieldset aria-describedby={describedBy("service")} aria-invalid={errors.service ? true : undefined}>
              <legend className="font-display text-lg font-semibold tracking-[0.03em] uppercase">
                Choose a service
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {serviceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={cx(
                      "flex min-h-14 cursor-pointer items-center gap-3 rounded-[3px] border bg-white px-4 py-3 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal",
                      data.service === option.value ? "border-ink ring-1 ring-ink" : "border-steel/60 hover:border-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={option.value}
                      checked={data.service === option.value}
                      onChange={() => update("service", option.value)}
                      className="size-5 accent-signal focus-visible:outline-none"
                    />
                    <span className="font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.service && (
                <p id="request-service-error" className="mt-2 text-sm font-medium text-signal">
                  {errors.service}
                </p>
              )}
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-[8rem_1fr_1fr]">
              <Field name="year" label="Year" error={errors.year}>
                {textInput("year", { inputMode: "numeric" })}
              </Field>
              <Field name="make" label="Make" error={errors.make}>
                {textInput("make", {})}
              </Field>
              <Field name="model" label="Model" error={errors.model}>
                {textInput("model", {})}
              </Field>
            </div>

            <Field
              name="concern"
              label="What would you like the shop to know?"
              hint="What you hear or see, when it started, and anything recently changed. You can attach photos in your email app."
              error={errors.concern}
            >
              <textarea
                id="request-concern"
                name="concern"
                rows={5}
                value={data.concern}
                onChange={(event) => update("concern", event.target.value)}
                onBlur={() => onBlur("concern")}
                aria-invalid={errors.concern ? true : undefined}
                aria-describedby={describedBy("concern", true)}
                aria-required="true"
                className={inputClass}
              />
            </Field>
          </section>
        )}

        {step === 1 && (
          <section aria-labelledby="step-details" className="space-y-7">
            <h2
              id="step-details"
              ref={(node) => {
                headingRefs.current[1] = node;
              }}
              tabIndex={-1}
              className="text-display text-4xl uppercase outline-none sm:text-5xl"
            >
              How can the shop reach you?
            </h2>
            <Field name="name" label="Your name" error={errors.name}>
              {textInput("name", { autoComplete: "name" })}
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field name="email" label="Email" error={errors.email}>
                {textInput("email", { autoComplete: "email", inputMode: "email", type: "email" })}
              </Field>
              <Field name="phone" label="Phone" error={errors.phone}>
                {textInput("phone", { autoComplete: "tel", inputMode: "tel", type: "tel" })}
              </Field>
            </div>
            <fieldset>
              <legend className="font-display text-lg font-semibold tracking-[0.03em] uppercase">
                Best way to reach you
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {contactOptions.map((option) => (
                  <label
                    key={option}
                    className={cx(
                      "flex min-h-12 cursor-pointer items-center gap-3 rounded-[3px] border bg-white px-4 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal",
                      data.contact === option ? "border-ink ring-1 ring-ink" : "border-steel/60 hover:border-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name="contact"
                      value={option}
                      checked={data.contact === option}
                      onChange={() => update("contact", option)}
                      className="size-5 accent-signal focus-visible:outline-none"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field
              name="date"
              label="Preferred day (optional)"
              hint="A preferred day is a request. The shop confirms the actual time."
              error={errors.date}
            >
              <input
                id="request-date"
                name="date"
                type="date"
                min={today}
                value={data.date}
                onChange={(event) => update("date", event.target.value)}
                onBlur={() => onBlur("date")}
                aria-invalid={errors.date ? true : undefined}
                aria-describedby={describedBy("date", true)}
                className={cx(inputClass, "sm:max-w-xs")}
              />
            </Field>
          </section>
        )}

        {step === 2 && (
          <section aria-labelledby="step-review" className="space-y-7">
            <h2
              id="step-review"
              ref={(node) => {
                headingRefs.current[2] = node;
              }}
              tabIndex={-1}
              className="text-display text-4xl uppercase outline-none sm:text-5xl"
            >
              Check, then email.
            </h2>
            <p className="text-lg text-steel">
              Review your request, then open an email draft addressed to the shop. You can add photos and send it from
              your own email app.
            </p>
            <div className="grid gap-6 md:grid-cols-2" data-testid="request-review">
              {reviewGroups(data, serviceLabel).map((group) => (
                <section key={group.title} aria-label={group.title} className="rounded-[3px] bg-paper-deep p-6">
                  <h3 className="tag-label text-steel">{group.title}</h3>
                  <dl className="mt-4 space-y-3">
                    {group.rows.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-sm text-steel">{label}</dt>
                        <dd className="font-medium break-words whitespace-pre-line">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
            <p className="rounded-[3px] border-l-[3px] border-signal bg-white px-5 py-4 font-medium">
              Nothing has been sent yet. Opening the draft doesn’t confirm an appointment: the shop will reply to
              confirm availability.
            </p>
          </section>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          {step > 0 && (
            <button type="button" onClick={() => goTo(step - 1)} className={buttonClass("outline-dark")}>
              <ArrowLeftIcon className="size-[18px]" />
              Back
            </button>
          )}
          <div className="flex flex-col gap-3 sm:ml-auto sm:flex-row">
            {step < 2 ? (
              <button key="continue" type="submit" className={buttonClass("primary", "lg")}>
                Continue
              </button>
            ) : (
              <>
                <button key="copy" type="button" onClick={copy} className={buttonClass("outline-dark", "lg")}>
                  Copy request
                </button>
                <a
                  href={mailto}
                  onClick={() => setStatus("Your email app should open a draft. Review it and send when you’re ready.")}
                  className={buttonClass("primary", "lg")}
                  data-testid="open-email-draft"
                >
                  <MailIcon className="size-5" />
                  Open email draft
                </a>
              </>
            )}
          </div>
        </div>
        <p role="status" aria-live="polite" className="mt-4 min-h-6 text-steel">
          {status}
        </p>
      </form>
    </div>
  );
}
