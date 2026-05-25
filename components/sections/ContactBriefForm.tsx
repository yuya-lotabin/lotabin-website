"use client";

import { FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { budgetRanges, contactSegments, projectTypes, timelineOptions } from "@/lib/siteData";

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

type SelectProps = {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
};

type TextareaProps = {
  id: string;
  label: string;
  placeholder: string;
  rows: number;
  required?: boolean;
};

export function ContactBriefForm() {
  const [submitted, setSubmitted] = useState(false);
  const statusId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Card variant="editorial" padding="lg">
      <form className="grid gap-8" aria-describedby={`contact-expectation ${statusId}`} onSubmit={handleSubmit}>
        <fieldset className="grid gap-4">
          <legend className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-champagne/76">
            Buyer segmentation
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {contactSegments.map((segment) => (
              <label
                key={segment}
                className="focus-within:border-champagne/44 flex gap-3 rounded-2xl border border-ivory/10 bg-ink/34 p-4 transition"
              >
                <input
                  type="radio"
                  name="buyerType"
                  value={segment}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-champagne"
                  required
                />
                <span>
                  <span className="block text-sm font-medium text-ivory">{segment}</span>
                  <span className="mt-2 block text-xs leading-5 text-smoke">Routes the brief to the right production path.</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField id="name" label="Name" placeholder="Your name" autoComplete="name" required />
          <FormField id="email" label="Email" placeholder="you@company.com" type="email" autoComplete="email" required />
          <FormField id="company" label="Company" placeholder="Company or brand name" autoComplete="organization" />
          <FormField id="website" label="Website" placeholder="https://" type="url" autoComplete="url" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <SelectField id="projectType" label="Project type" options={projectTypes} required />
          <SelectField id="budgetRange" label="Budget range" options={budgetRanges} />
          <SelectField id="timeline" label="Timeline" options={timelineOptions} />
        </div>

        <div className="grid gap-5">
          <TextareaField
            id="currentOffer"
            label="Current offer / product"
            placeholder="What are you selling, who is it for, and what action should the viewer take?"
            rows={5}
            required
          />
          <TextareaField
            id="message"
            label="Message"
            placeholder="Share context: current assets, campaign goals, references, ad account role, production bottlenecks, or anything we should know before a call."
            rows={6}
          />
        </div>

        <div className="rounded-[var(--radius-panel)] border border-ivory/10 bg-ink/34 p-5" id="contact-expectation">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Submission note</p>
              <p className="mt-3 text-sm leading-7 text-smoke">
                Backend functionality can be connected later. This front-end form prevents accidental reloads and is
                structured around the fields needed for a qualified creative brief.
              </p>
            </div>
            <Button type="submit" size="lg">
              Send Creative Brief
            </Button>
          </div>
          <p id={statusId} aria-live="polite" className="mt-4 text-sm leading-6 text-ivory-soft/76">
            {submitted
              ? "Preview submission confirmed. Connect a form handler, CRM, or booking workflow before using this as a live lead-capture form."
              : "Required fields: buyer type, name, email, project type, and current offer / product."}
          </p>
        </div>
      </form>
    </Card>
  );
}

function FormField({ id, label, placeholder, type = "text", autoComplete, required }: FieldProps) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
        {label} {required && <span className="text-ivory-soft/76">*</span>}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="focus-ring min-h-12 rounded-2xl border border-ivory/12 bg-ink/42 px-4 py-3 text-sm text-ivory placeholder:text-smoke/60 transition hover:border-ivory/20"
      />
    </label>
  );
}

function SelectField({ id, label, options, required }: SelectProps) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
        {label} {required && <span className="text-ivory-soft/76">*</span>}
      </span>
      <select
        id={id}
        name={id}
        defaultValue=""
        required={required}
        className="focus-ring min-h-12 rounded-2xl border border-ivory/12 bg-ink/42 px-4 py-3 text-sm text-ivory transition hover:border-ivory/20"
      >
        <option value="" disabled className="bg-ink text-smoke">
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink text-ivory">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({ id, label, placeholder, rows, required }: TextareaProps) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
        {label} {required && <span className="text-ivory-soft/76">*</span>}
      </span>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="focus-ring rounded-2xl border border-ivory/12 bg-ink/42 px-4 py-3 text-sm leading-7 text-ivory placeholder:text-smoke/60 transition hover:border-ivory/20"
      />
    </label>
  );
}
