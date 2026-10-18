'use client';

import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { Check, ChevronDown, CircleAlert, MessageCircle, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import { FORMS_ENABLED, submitContact, type FormKind } from '@/lib/contact';
import { cn } from '@/lib/cn';

export type FormState = 'idle' | 'error' | 'sending' | 'success';

type FieldDef = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  required?: boolean;
  full?: boolean;
  optional?: boolean;
  autoComplete?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HEAD: Record<FormKind, [string, string, string]> = {
  A: ['headA', 'subA', 'send'],
  pkg: ['headPkg', 'subPkg', 'send'],
  B: ['headB', 'subB', 'sendB']
};

type Props = {
  kind: FormKind;
  /** Options for the "Əməkdaşlıq növü" select (form B), from content/partnership.json. */
  partnershipTypes?: string[];
  /** Shows a fixed state — only for the UI kit page. */
  demoState?: FormState;
};

/**
 * ContactForm A (doctor media package), its "pkg" variant and B (sponsorship).
 * States: empty, error (white 2px outline + icon + text, no red by design), sending, success.
 */
export function ContactForm({ kind, partnershipTypes = [], demoState }: Props) {
  const t = useTranslations('Form');
  const tc = useTranslations('Common');
  const uid = useId();
  const [state, setState] = useState<FormState>(demoState ?? 'idle');
  const [errors, setErrors] = useState<Record<string, string>>(
    demoState === 'error' ? { name: 'required', company: 'required', email: 'email', consent: 'consent' } : {}
  );
  const [interest, setInterest] = useState('p500');

  const id = (n: string) => `${uid}-${n}`;
  const [head, sub, cta] = HEAD[kind];

  const fieldsA: FieldDef[] = [
    { name: 'name', label: t('name'), placeholder: t('namePh'), required: true, autoComplete: 'name' },
    { name: 'specialty', label: t('specialty'), placeholder: t('specialtyPh'), required: true },
    { name: 'workplace', label: t('workplace'), placeholder: t('workplacePh'), autoComplete: 'organization' },
    { name: 'social', label: t('social'), placeholder: t('socialPh') },
    { name: 'topic', label: t('topic'), placeholder: t('topicPh'), full: true },
    { name: 'phone', label: t('phone'), type: 'tel', placeholder: '+994', required: true, autoComplete: 'tel' },
    { name: 'email', label: t('email'), type: 'email', placeholder: t('emailPh'), required: true, autoComplete: 'email' }
  ];
  const fieldsB: FieldDef[] = [
    { name: 'company', label: t('company'), placeholder: t('companyPh'), required: true, autoComplete: 'organization' },
    { name: 'brand', label: t('brand'), placeholder: t('brandPh') },
    { name: 'person', label: t('contactPerson'), placeholder: t('contactPersonPh'), required: true, autoComplete: 'name' },
    { name: 'position', label: t('position'), placeholder: t('positionPh'), autoComplete: 'organization-title' },
    { name: 'email', label: t('email'), type: 'email', placeholder: t('emailCompanyPh'), required: true, autoComplete: 'email' },
    { name: 'phone', label: t('phone'), type: 'tel', placeholder: '+994', required: true, autoComplete: 'tel' }
  ];
  const fields = kind === 'B' ? fieldsB : fieldsA;
  const required = fields.filter((f) => f.required);

  // Spotlight is an add-on: it cannot be chosen on its own.
  const interests = [
    { value: 'p500', label: t('interestP500') },
    { value: 'p800', label: t('interestP800') }
  ];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMS_ENABLED) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get('website')) return; // honeypot
    const next: Record<string, string> = {};
    for (const f of required) if (!String(fd.get(f.name) ?? '').trim()) next[f.name] = 'required';
    // Design shows the e-mail hint for both empty and malformed addresses.
    if (!EMAIL_RE.test(String(fd.get('email') ?? '').trim())) next.email = 'email';
    if (!fd.get('consent')) next.consent = 'consent';
    setErrors(next);
    if (Object.keys(next).length) {
      setState('error');
      const first = Object.keys(next)[0];
      requestAnimationFrame(() => document.getElementById(id(first))?.focus());
      return;
    }
    setState('sending');
    const data: Record<string, string> = {};
    fd.forEach((v, k) => (data[k] = String(v)));
    const res = await submitContact(kind, data);
    setState(res.ok ? 'success' : 'error');
  }

  const errMsg = (n: string) => {
    const e = errors[n];
    if (!e) return null;
    const text = e === 'email' ? t('emailInvalid') : e === 'consent' ? t('consentRequired') : t('required');
    return (
      <span className="err-msg" id={id(`${n}-err`)}>
        <CircleAlert className="ic sm" aria-hidden />
        {text}
      </span>
    );
  };

  const input = (f: FieldDef) => {
    const invalid = !!errors[f.name];
    const common = {
      id: id(f.name),
      name: f.name,
      placeholder: f.placeholder,
      autoComplete: f.autoComplete,
      required: f.required,
      'aria-invalid': invalid || undefined,
      'aria-describedby': invalid ? id(`${f.name}-err`) : undefined
    };
    return (
      <div key={f.name} className={cn('field', f.full && 'full', invalid && 'err')}>
        <label htmlFor={id(f.name)}>
          {f.label}
          {f.required && ' *'}
          {f.optional && <span className="opt"> {t('optional')}</span>}
        </label>
        {f.type === 'textarea' ? (
          <textarea className="textarea" {...common} />
        ) : (
          <input className="input" type={f.type ?? 'text'} {...common} />
        )}
        {errMsg(f.name)}
      </div>
    );
  };

  const select = (name: string, label: string, options: string[]) => (
    <div className="field full">
      <label htmlFor={id(name)}>{label}</label>
      <div className="select-box">
        <select id={id(name)} name={name} className="select">
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="ic sm" aria-hidden />
      </div>
    </div>
  );

  const textarea = (name: string, label: string, placeholder: string) => input({ name, label, placeholder, type: 'textarea', full: true });

  if (state === 'success') {
    return (
      <div className="card">
        <div className="success" role="status" aria-live="polite">
          <span className="badge">
            <Check className="ic lg" aria-hidden strokeWidth={2.5} />
          </span>
          <h3 className="h3">{t('successTitle')}</h3>
          <p className="body" style={{ maxWidth: 420 }}>
            {t('successText')}
          </p>
          <button
            type="button"
            className="btn btn-ghost btn-sm auto"
            onClick={() => {
              setErrors({});
              setState('idle');
            }}
          >
            {t('again')}
          </button>
        </div>
      </div>
    );
  }

  const body: ReactNode =
    kind === 'B' ? (
      <div className="form">
        {fieldsB.map(input)}
        {select('type', t('partnershipType'), partnershipTypes)}
        {input({ name: 'budget', label: t('budget'), placeholder: t('budgetPh'), full: true, optional: true })}
        {textarea('offer', t('offer'), t('offerPh'))}
      </div>
    ) : (
      <div className="form">
        {fieldsA.map(input)}
        <fieldset className="field full">
          <legend className="flabel" style={{ marginBottom: 8, padding: 0 }}>
            {t('interest')}
          </legend>
          <div className="radio-pills">
            {interests.map((o) => (
              <label key={o.value} className={cn('chip', interest === o.value && 'on')}>
                <input type="radio" name="interest" value={o.value} checked={interest === o.value} onChange={() => setInterest(o.value)} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
        {textarea('note', t('note'), t('notePh'))}
      </div>
    );

  const sending = state === 'sending';

  return (
    <div className="card">
      <form className="stack g24" noValidate onSubmit={onSubmit} aria-busy={sending}>
        <div className="stack g8">
          <h3 className="h3">{t(head)}</h3>
          <p className="small">{t(sub)}</p>
        </div>
        {state === 'error' && (
          <div className="form-alert" role="alert">
            <CircleAlert className="ic" aria-hidden />
            <span>
              <b>{t('alertTitle')}</b> {t('alertText')}
            </span>
          </div>
        )}
        <div className="hp" aria-hidden>
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {body}
        <div className="stack g8">
          <label className="consent">
            <input
              id={id('consent')}
              type="checkbox"
              name="consent"
              aria-invalid={!!errors.consent || undefined}
              aria-describedby={errors.consent ? id('consent-err') : undefined}
            />
            <span>{t('consent')}</span>
          </label>
          {errors.consent && <div style={{ paddingLeft: 34 }}>{errMsg('consent')}</div>}
        </div>
        <div className="form-actions">
          {sending ? (
            <button type="button" className="btn btn-primary" disabled aria-busy="true">
              <span className="spinner" aria-hidden />
              {t('sending')}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              {t(cta)}
              <Send className="ic sm" aria-hidden />
            </button>
          )}
          <a className="btn btn-ghost" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="ic" aria-hidden />
            {tc('whatsapp')}
          </a>
        </div>
      </form>
    </div>
  );
}
