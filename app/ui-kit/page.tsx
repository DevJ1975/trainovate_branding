"use client";

import { useState } from "react";
import {
  TButton, TBadge, TCard, TAlert,
  TSwitch, TCheckbox, TRadio,
  TField, TInput, TTextarea, TSelect,
  TSlider, TStepper, TSegmented, TTabs,
  TAvatar, TListRow, TProgress, TRing, TEmpty,
  TModal, useToast,
} from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";
import Link from "next/link";

export default function UIKitPage() {
  return (
    <PageShell
      eyebrow="04 · UI Kit"
      title={<>20 components, live.<br/>This page uses them all.</>}
      lede="Every control is a real React component you can import. Switch the theme via the top-right toggle to see all states adapt."
      action={<Link href="/ui-kit/native"><TButton variant="secondary">Native platforms →</TButton></Link>}
    >
      <Showcase />
    </PageShell>
  );
}

function Showcase() {
  const [tab, setTab] = useState<string>("buttons");
  const TABS = [
    { value: "buttons",  label: "Buttons" },
    { value: "forms",    label: "Forms" },
    { value: "controls", label: "Controls" },
    { value: "surfaces", label: "Surfaces" },
    { value: "feedback", label: "Feedback" },
    { value: "overlays", label: "Overlays" },
  ];
  return (
    <>
      <div className="mt-4 mb-8 flex">
        <TTabs options={TABS as any} value={tab} onChange={(v) => setTab(v as string)} />
      </div>
      {tab === "buttons"  && <ButtonsSection />}
      {tab === "forms"    && <FormsSection />}
      {tab === "controls" && <ControlsSection />}
      {tab === "surfaces" && <SurfacesSection />}
      {tab === "feedback" && <FeedbackSection />}
      {tab === "overlays" && <OverlaysSection />}
    </>
  );
}

/* ─────────── Buttons ─────────── */
function ButtonsSection() {
  return (
    <div className="space-y-10">
      <SubSection title="Variants" sample={`<TButton variant="primary">Save</TButton>`}>
        <TButton variant="primary">Primary</TButton>
        <TButton variant="secondary">Secondary</TButton>
        <TButton variant="ghost">Ghost</TButton>
        <TButton variant="destructive">Destructive</TButton>
      </SubSection>

      <SubSection title="Sizes" sample={`<TButton size="lg">Large</TButton>`}>
        <TButton size="sm">Small</TButton>
        <TButton size="md">Medium</TButton>
        <TButton size="lg">Large</TButton>
      </SubSection>

      <SubSection title="States" sample={`<TButton disabled>Disabled</TButton>`}>
        <TButton>Default</TButton>
        <TButton disabled>Disabled</TButton>
        <TButton variant="secondary" disabled>Disabled</TButton>
      </SubSection>
    </div>
  );
}

/* ─────────── Forms ─────────── */
function FormsSection() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("ops");
  const [agree, setAgree] = useState(false);
  const [tier, setTier] = useState("pro");
  return (
    <div className="space-y-10">
      <SubSection title="Inputs" sample={`<TField label="Name"><TInput .../></TField>`}>
        <div className="w-full grid md:grid-cols-2 gap-4">
          <TField label="Full name" help="As it appears on your roster">
            <TInput placeholder="Jane Cooper" value={name} onChange={(e) => setName(e.target.value)} />
          </TField>
          <TField label="Email" error={name === "x" ? "Invalid email" : undefined}>
            <TInput type="email" placeholder="jane@trainovate.com" />
          </TField>
          <TField label="Role">
            <TSelect value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ops">Operations</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
            </TSelect>
          </TField>
          <TField label="Crew size">
            <TInput type="number" defaultValue={12} />
          </TField>
        </div>
      </SubSection>

      <SubSection title="Textarea" sample={`<TTextarea rows={4} />`}>
        <div className="w-full">
          <TField label="Bio">
            <TTextarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A few lines about your role…" />
          </TField>
        </div>
      </SubSection>

      <SubSection title="Choice controls" sample={`<TCheckbox /> <TRadio /> <TSwitch />`}>
        <div className="w-full grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <TCheckbox label="Email digests" defaultChecked />
            <TCheckbox label="SMS alerts" />
            <TCheckbox label="Push notifications" defaultChecked />
          </div>
          <div className="space-y-2">
            <TRadio name="tier" label="Starter" value="starter" checked={tier === "starter"} onChange={() => setTier("starter")} />
            <TRadio name="tier" label="Pro"     value="pro"     checked={tier === "pro"}     onChange={() => setTier("pro")} />
            <TRadio name="tier" label="Fleet"   value="fleet"   checked={tier === "fleet"}   onChange={() => setTier("fleet")} />
          </div>
          <div className="space-y-2">
            <TSwitch label="Two-factor auth" defaultChecked />
            <TSwitch label="Auto-renew" />
            <TSwitch label="Marketing" />
          </div>
        </div>
      </SubSection>
    </div>
  );
}

/* ─────────── Controls ─────────── */
function ControlsSection() {
  const [vol, setVol] = useState(48);
  const [qty, setQty] = useState(3);
  const [view, setView] = useState<"week" | "month" | "year">("week");
  return (
    <div className="space-y-10">
      <SubSection title="Slider" sample={`<TSlider value={vol} onChange={...} />`}>
        <div className="w-full max-w-[400px]">
          <TField label={`Volume — ${vol}%`}>
            <TSlider min={0} max={100} value={vol} onChange={(e) => setVol(parseInt(e.target.value, 10))} />
          </TField>
        </div>
      </SubSection>

      <SubSection title="Stepper" sample={`<TStepper value={qty} onChange={setQty} />`}>
        <TStepper value={qty} onChange={setQty} />
      </SubSection>

      <SubSection title="Segmented" sample={`<TSegmented options={...} value={...} onChange={...} />`}>
        <TSegmented<"week" | "month" | "year">
          options={[
            { value: "week",  label: "Week" },
            { value: "month", label: "Month" },
            { value: "year",  label: "Year" },
          ]}
          value={view}
          onChange={setView}
        />
      </SubSection>

      <SubSection title="Tabs" sample={`<TTabs options={...} />`}>
        <TTabs
          options={[
            { value: "overview", label: "Overview" },
            { value: "modules",  label: "Modules" },
            { value: "people",   label: "People" },
            { value: "logs",     label: "Logs" },
          ]}
          defaultValue="overview"
        />
      </SubSection>
    </div>
  );
}

/* ─────────── Surfaces ─────────── */
function SurfacesSection() {
  return (
    <div className="space-y-10">
      <SubSection title="Cards" sample={`<TCard elevated>...</TCard>`}>
        <div className="w-full grid md:grid-cols-3 gap-4">
          <TCard>
            <p className="eyebrow mb-3">Module 04</p>
            <h4 className="font-semibold text-md mb-2">Hazard recognition</h4>
            <p className="text-sm text-[var(--t-fg-muted)] mb-4">12 lessons · 45 min</p>
            <TBadge tone="info">In progress</TBadge>
          </TCard>
          <TCard elevated>
            <p className="eyebrow mb-3">Module 05</p>
            <h4 className="font-semibold text-md mb-2">LOTO procedures</h4>
            <p className="text-sm text-[var(--t-fg-muted)] mb-4">8 lessons · 30 min</p>
            <TBadge tone="neutral">Required</TBadge>
          </TCard>
          <TCard elevated>
            <p className="eyebrow mb-3">Module 06</p>
            <h4 className="font-semibold text-md mb-2">Incident response</h4>
            <p className="text-sm text-[var(--t-fg-muted)] mb-4">15 lessons · 60 min</p>
            <TBadge tone="danger">Overdue</TBadge>
          </TCard>
        </div>
      </SubSection>

      <SubSection title="Badges" sample={`<TBadge tone="info">In progress</TBadge>`}>
        <TBadge tone="neutral">Neutral</TBadge>
        <TBadge tone="info">Info</TBadge>
        <TBadge tone="success">Success</TBadge>
        <TBadge tone="warning">Warning</TBadge>
        <TBadge tone="danger">Danger</TBadge>
        <TBadge tone="accent">Accent</TBadge>
      </SubSection>

      <SubSection title="List rows" sample={`<TListRow leading={...} title="..." />`}>
        <div className="w-full max-w-[500px] divide-y divide-[var(--t-line)] border border-[var(--t-line)] rounded-md overflow-hidden bg-[var(--t-bg-elev)]">
          <TListRow leading={<TAvatar initials="JC" color="#0046E6" />} title="Jane Cooper" sub="Operations Lead · Houston" trailing={<TBadge tone="success">Online</TBadge>} />
          <TListRow leading={<TAvatar initials="DM" color="#0036B5" />} title="Diego Morales" sub="Trainer · Mexico City" trailing={<TBadge tone="neutral">Away</TBadge>} />
          <TListRow leading={<TAvatar initials="AY" color="#003ECC" />} title="Anna Yip" sub="Admin · Toronto" trailing={<TBadge tone="info">Idle</TBadge>} />
        </div>
      </SubSection>
    </div>
  );
}

/* ─────────── Feedback ─────────── */
function FeedbackSection() {
  return (
    <div className="space-y-10">
      <SubSection title="Alerts" sample={`<TAlert tone="success" title="Saved">...</TAlert>`}>
        <div className="w-full grid md:grid-cols-2 gap-4">
          <TAlert tone="info"    title="Heads up">Your next training window opens Monday.</TAlert>
          <TAlert tone="success" title="Saved">Module 04 updated successfully.</TAlert>
          <TAlert tone="warning" title="Almost full">7 of 8 seats taken on the next session.</TAlert>
          <TAlert tone="danger"  title="Overdue">Submit incident #2241 before EOD.</TAlert>
        </div>
      </SubSection>

      <SubSection title="Progress" sample={`<TProgress value={62} label="Onboarding" />`}>
        <div className="w-full max-w-[400px] space-y-4">
          <TProgress value={28} label="Onboarding" />
          <TProgress value={62} label="Field certification" />
          <TProgress value={94} label="Annual recert" />
        </div>
      </SubSection>

      <SubSection title="Progress rings" sample={`<TRing value={72} />`}>
        <TRing value={28} />
        <TRing value={62} />
        <TRing value={94} />
      </SubSection>

      <SubSection title="Empty state" sample={`<TEmpty title="No incidents" body="..." />`}>
        <div className="w-full max-w-[420px] mx-auto">
          <TEmpty title="No incidents" body="Nothing to triage. The team's on a 12-day clean streak." action={<TButton variant="secondary">View archive</TButton>} />
        </div>
      </SubSection>
    </div>
  );
}

/* ─────────── Overlays ─────────── */
function OverlaysSection() {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <div className="space-y-10">
      <SubSection title="Modal" sample={`<TModal open={open} onClose={...} />`}>
        <TButton variant="primary" onClick={() => setOpen(true)}>Open modal</TButton>
        <TModal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm enrollment"
          footer={
            <>
              <TButton variant="ghost" onClick={() => setOpen(false)}>Cancel</TButton>
              <TButton variant="primary" onClick={() => { setOpen(false); toast.push("Enrolled — see you Monday", "success"); }}>Confirm</TButton>
            </>
          }
        >
          <p className="text-sm text-[var(--t-fg-muted)] leading-relaxed">
            You're about to enroll <strong>12 trainees</strong> into Hazard Recognition · Module 04.
            They'll receive an email within 5 minutes.
          </p>
        </TModal>
      </SubSection>

      <SubSection title="Toasts" sample={`useToast().push("Saved", "success")`}>
        <TButton variant="secondary" onClick={() => toast.push("Saved", "success")}>Push success toast</TButton>
        <TButton variant="secondary" onClick={() => toast.push("Heads up — try again", "warning")}>Push warning toast</TButton>
        <TButton variant="secondary" onClick={() => toast.push("Failed to save", "danger")}>Push danger toast</TButton>
      </SubSection>
    </div>
  );
}

/* ─────────── Helpers ─────────── */
function SubSection({ title, sample, children }: { title: string; sample: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4 flex-wrap">
        <h3 className="font-semibold text-sm tracking-tight">{title}</h3>
        <code className="font-mono text-[11px] text-[var(--t-fg-muted)] bg-[var(--t-bg-inset)] px-2 py-1 rounded">{sample}</code>
      </div>
      <TCard elevated>
        <div className="flex flex-wrap items-center gap-3">{children}</div>
      </TCard>
    </div>
  );
}
