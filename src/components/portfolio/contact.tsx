"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import { contactChannels, profile } from "./content";
import { Reveal } from "./motion";
import { Section, SectionHeading, shell } from "./ui";

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const setField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};

    if (!form.name.trim()) next.name = "Please add your name.";
    if (!form.email.trim()) next.email = "Please add your email address.";
    else if (!EMAIL_PATTERN.test(form.email.trim()))
      next.email = "That email address does not look right.";
    if (!form.message.trim()) next.message = "Please add a short message.";
    else if (form.message.trim().length < 10)
      next.message = "A little more detail would help — 10 characters or more.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      // Focus the error summary first so screen readers announce the failures.
      errorSummaryRef.current?.focus();
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the address is visible next to the button */
    }
  };

  const errorList = Object.entries(errors).filter(([, value]) => Boolean(value));

  return (
    <Section id="contact">
      <div className={shell}>
        <Reveal>
          <SectionHeading
            index="07"
            title="Contact"
            kicker="Open to new roles, research collaborations, and interesting problems"
            icon={Mail}
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Left: channels ── */}
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
                Tell me what you are building
                <span className="text-accent">.</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-2">
                I read everything that comes in and reply to anything about AI engineering work. If you
                are building with LLMs, computer vision or generative media, I would like to hear about it.
              </p>

              <ul className="mt-8 divide-y divide-line border-y border-line">
                {contactChannels.map((channel) => (
                  <li key={channel.key}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-accent"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="mono w-20 shrink-0 text-2xs uppercase tracking-[0.16em] text-ink-3">
                          {channel.label}
                        </span>
                        <span className="mono text-sm text-ink transition-colors group-hover:text-accent">
                          {channel.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.8}
                        className="shrink-0 text-ink-3 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={copyEmail}
                className="mono mt-4 inline-flex items-center gap-2 py-2 text-xs text-ink-3 transition-colors hover:text-accent"
              >
                {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                {copied ? "Copied to clipboard" : "Copy email address"}
              </button>
            </div>
          </Reveal>

          {/* ── Right: composer ── */}
          <Reveal delay={90} className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="surface p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="mono text-2xs font-medium uppercase tracking-[0.16em] text-ink-3">
                  Write a message
                </span>
                <span className="mono inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-2xs text-ink-3">
                  <Send size={11} strokeWidth={2} />
                  Opens your email client
                </span>
              </div>

              {errorList.length > 0 && (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  aria-live="assertive"
                  className="mt-5 rounded-xl border border-rose-400/30 bg-rose-500/[0.08] px-4 py-3 focus:outline-none"
                >
                  <p className="text-sm font-medium text-rose-300">
                    {errorList.length === 1
                      ? "There is 1 problem with this form"
                      : `There are ${errorList.length} problems with this form`}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {errorList.map(([field, message]) => (
                      <li key={field}>
                        <a
                          href={`#contact-${field}`}
                          className="text-xs text-rose-200/90 underline underline-offset-2 hover:text-rose-100"
                        >
                          {message}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mono mb-2 block text-2xs font-medium uppercase tracking-[0.16em] text-ink-3"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    ref={nameRef}
                    type="text"
                    value={form.name}
                    onChange={(event) => setField("name", event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="field"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-2 text-xs text-rose-300">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mono mb-2 block text-2xs font-medium uppercase tracking-[0.16em] text-ink-3"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    ref={emailRef}
                    type="email"
                    value={form.email}
                    onChange={(event) => setField("email", event.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="field"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-2 text-xs text-rose-300">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <label
                    htmlFor="contact-message"
                    className="mono block text-2xs font-medium uppercase tracking-[0.16em] text-ink-3"
                  >
                    Message
                  </label>
                  <span
                    className={`mono text-2xs ${form.message.length > 900 ? "text-amber-400" : "text-ink-3"}`}
                  >
                    {form.message.length}/1000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  ref={messageRef}
                  value={form.message}
                  onChange={(event) => setField("message", event.target.value)}
                  placeholder="What are you working on?"
                  rows={6}
                  maxLength={1000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className="field resize-y leading-relaxed"
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-2 text-xs text-rose-300">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent-2 px-6 py-3.5 text-sm font-semibold text-accent-ink shadow-[0_10px_36px_-16px_rgba(45,212,191,0.85)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_14px_44px_-14px_rgba(45,212,191,0.95)]"
              >
                <Send size={15} strokeWidth={2} />
                Send message
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-ink-3">
                The site is statically hosted, so this composes the message in your own mail client —
                nothing is stored here. Prefer plain email?{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-accent/90 underline underline-offset-2 hover:text-accent"
                >
                  {profile.email}
                </a>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
