"use client";

import { useState } from "react";
import Link from "next/link";
import { TCard, TBadge, TButton, TTabs, TAlert } from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";
import { BrandMark } from "@/components/Brand";

type Platform = "mac" | "windows";

const PLATFORM_TABS = [
  { value: "mac",     label: "macOS" },
  { value: "windows", label: "Windows" },
];

export default function ScreensaverPage() {
  const [platform, setPlatform] = useState<Platform>("mac");

  return (
    <PageShell
      eyebrow="08 · Screensaver & Zoom"
      title={<>The mark, in motion,<br/>on every idle screen.</>}
      lede="A single self-contained HTML payload that drops into the two well-maintained FOSS host apps. No unsigned binaries, no Gatekeeper warnings — five steps on each platform."
      action={
        <a href="/downloads/trainovate-screensaver.zip" download>
          <TButton variant="primary">Download screensaver (.zip)</TButton>
        </a>
      }
    >
      {/* Live preview */}
      <SectionHead title="Live preview" count="THE PAYLOAD" />
      <TCard elevated className="!p-0 overflow-hidden">
        <div className="relative bg-ink aspect-[16/9] flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />
          <BrandMark tone="bone" size={220} animated />
          <div className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/35">
            Trainovate.ai · Screensaver
          </div>
        </div>
        <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-sm">Animated nucleus · drift mode</p>
            <p className="text-xs text-ink/60 mt-1">
              Three electrons orbit at independent rates. The whole lockup drifts slowly across the panel to prevent burn-in.
            </p>
          </div>
          <a href="/downloads/atom.html?bg=ink&drift=1&meta=0" target="_blank" rel="noreferrer">
            <TButton variant="secondary">Open full-screen ↗</TButton>
          </a>
        </div>
      </TCard>

      {/* Why HTML */}
      <SectionHead title="Why an HTML payload" count="ONE FILE · TWO PLATFORMS" />
      <TAlert tone="info" title="No unsigned binaries">
        A real <code className="font-mono text-xs">.saver</code> on macOS needs an Apple Developer ID + notarization
        or Gatekeeper refuses to load it. An unsigned <code className="font-mono text-xs">.scr</code> on Windows
        triggers SmartScreen. Both host apps below are open source, signed by their authors, and let you point at
        any local HTML file. The mark stays the source of truth — re-skin the HTML and every install picks it up.
      </TAlert>

      {/* Install */}
      <SectionHead title="Install" count="5 STEPS" />
      <div className="mb-6">
        <TTabs<Platform> options={PLATFORM_TABS as any} value={platform} onChange={setPlatform} />
      </div>

      {platform === "mac"     && <MacSteps />}
      {platform === "windows" && <WindowsSteps />}

      {/* Animated Zoom background */}
      <SectionHead title="Animated Zoom background" count="THE SAME ATOM" />
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-start">
        <TCard elevated className="!p-0 overflow-hidden">
          <div className="relative bg-cobalt aspect-[16/9] flex items-center justify-center">
            <BrandMark tone="bone" surface="cobalt" size={220} animated />
          </div>
          <div className="p-5">
            <p className="font-semibold text-sm mb-1">Zoom-mode · Cobalt</p>
            <p className="text-xs text-ink/60 leading-relaxed">
              1920×1080 HTML payload. Record once with QuickTime / Xbox Game Bar to produce an MP4 you can upload to
              Zoom's "Add Video" virtual background slot. The animation has no start/end frame — every electron is
              mid-orbit at every instant — so the loop is seamless.
            </p>
          </div>
        </TCard>
        <TCard elevated>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-3">3-step record</p>
          <ol className="space-y-3 text-sm text-ink/80 leading-relaxed list-decimal pl-5">
            <li>Open the HTML at <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">/downloads/atom.html?bg=cobalt</code> in Chrome → press <strong>F11</strong>.</li>
            <li>Record the screen for ~12 seconds (QuickTime on macOS · Win+G on Windows).</li>
            <li>Drop the MP4 into Zoom → Settings → Background &amp; Effects → <strong>+</strong> → Add Video.</li>
          </ol>
          <div className="mt-5 flex gap-3 flex-wrap">
            <a href="/downloads/trainovate-zoom-background.zip" download>
              <TButton variant="primary">Download Zoom kit (.zip)</TButton>
            </a>
            <a href="/downloads/atom.html?bg=cobalt&meta=0&hideCursor=1" target="_blank" rel="noreferrer">
              <TButton variant="secondary">Open recordable HTML ↗</TButton>
            </a>
          </div>
        </TCard>
      </div>

      {/* Cross-link */}
      <div className="mt-12 flex gap-3 flex-wrap">
        <Link href="/downloads#templates"><TButton variant="ghost">All template downloads →</TButton></Link>
        <Link href="/identity"><TButton variant="ghost">Identity guidelines</TButton></Link>
      </div>
    </PageShell>
  );
}

/* ─────────── Mac install ─────────── */
function MacSteps() {
  return (
    <TCard elevated>
      <ol className="space-y-6 text-sm text-ink/80 leading-relaxed list-decimal pl-5">
        <li>
          <p className="font-semibold text-ink mb-1">Install WebViewScreenSaver</p>
          <p>Download the latest signed <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">.saver</code> from the project's releases page (it's open-source and signed by its author):</p>
          <p className="mt-2 font-mono text-xs text-cobalt break-all">github.com/liquidx/webviewscreensaver/releases</p>
          <p className="mt-1">Double-click the <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">.saver</code>. macOS will prompt to install for "this user only" — accept that.</p>
        </li>
        <li>
          <p className="font-semibold text-ink mb-1">Park the screensaver HTML somewhere stable</p>
          <pre className="mt-2 font-mono text-[12px] leading-relaxed bg-bone text-ink p-3 rounded-md overflow-x-auto whitespace-pre">{`mkdir -p ~/Library/Application\\ Support/Trainovate
cp screensaver.html ~/Library/Application\\ Support/Trainovate/`}</pre>
        </li>
        <li>
          <p className="font-semibold text-ink mb-1">Point WebViewScreenSaver at it</p>
          <p>System Settings → Screen Saver → choose <strong>WebViewScreenSaver</strong> → <strong>Screen Saver Options…</strong></p>
          <p className="mt-2">Paste this URL (replace <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">YOURNAME</code> with your macOS short name):</p>
          <pre className="mt-2 font-mono text-[12px] leading-relaxed bg-bone text-ink p-3 rounded-md overflow-x-auto whitespace-pre">{`file:///Users/YOURNAME/Library/Application%20Support/Trainovate/screensaver.html`}</pre>
          <p className="mt-2">Set "Refresh every" to <strong>0</strong> so the page never reloads.</p>
        </li>
        <li>
          <p className="font-semibold text-ink mb-1">Test</p>
          <p>Click <strong>Test</strong> in System Settings. The nucleus should drift slowly across a dark background.</p>
        </li>
        <li>
          <p className="font-semibold text-ink mb-1">(Optional) Multi-display</p>
          <p>WebViewScreenSaver mirrors the same URL to every display. The HTML is responsive — the mark recenters wherever it lands.</p>
        </li>
      </ol>
      <p className="mt-6 text-xs text-ink/55 leading-relaxed">
        To uninstall: System Settings → Screen Saver → right-click <strong>WebViewScreenSaver</strong> → <strong>Remove</strong>.
        Delete <code className="font-mono text-[11px] bg-bone px-1 py-0.5 rounded">~/Library/Application Support/Trainovate/</code>.
      </p>
    </TCard>
  );
}

/* ─────────── Windows install ─────────── */
function WindowsSteps() {
  return (
    <div className="space-y-6">
      <TCard elevated>
        <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
          <h3 className="font-semibold text-md tracking-tight">Option A · Plash <span className="font-normal text-ink/50">(recommended)</span></h3>
          <TBadge tone="success">Signed · open source</TBadge>
        </div>
        <ol className="space-y-6 text-sm text-ink/80 leading-relaxed list-decimal pl-5">
          <li>
            <p className="font-semibold text-ink mb-1">Install Plash</p>
            <p>From the Microsoft Store or the project page:</p>
            <p className="mt-2 font-mono text-xs text-cobalt break-all">sindresorhus.com/plash</p>
          </li>
          <li>
            <p className="font-semibold text-ink mb-1">Park the screensaver HTML</p>
            <pre className="mt-2 font-mono text-[12px] leading-relaxed bg-bone text-ink p-3 rounded-md overflow-x-auto whitespace-pre">{`C:\\Users\\YOURNAME\\AppData\\Local\\Trainovate\\screensaver.html`}</pre>
          </li>
          <li>
            <p className="font-semibold text-ink mb-1">Point Plash at it</p>
            <p>Plash → <strong>Open URL…</strong> →</p>
            <pre className="mt-2 font-mono text-[12px] leading-relaxed bg-bone text-ink p-3 rounded-md overflow-x-auto whitespace-pre">{`file:///C:/Users/YOURNAME/AppData/Local/Trainovate/screensaver.html`}</pre>
          </li>
          <li>
            <p className="font-semibold text-ink mb-1">Trigger on idle</p>
            <p>Plash → Preferences → enable <strong>Show on idle</strong> (5 minutes is a good default).</p>
          </li>
          <li>
            <p className="font-semibold text-ink mb-1">Verify</p>
            <p>Lock the screen (Win+L) or wait for idle — the nucleus should drift across all monitors.</p>
          </li>
        </ol>
      </TCard>

      <TCard elevated>
        <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
          <h3 className="font-semibold text-md tracking-tight">Option B · Native <code className="font-mono text-sm">.scr</code> via InstantStorm</h3>
          <TBadge tone="warning">For managed fleets</TBadge>
        </div>
        <p className="text-sm text-ink/70 leading-relaxed mb-4">
          Need a real <code className="font-mono text-xs">.scr</code> for a managed Windows estate? Wrap the HTML
          with <strong>InstantStorm</strong> (free) and code-sign with your org cert before distribution.
        </p>
        <ol className="space-y-3 text-sm text-ink/80 leading-relaxed list-decimal pl-5">
          <li>Install InstantStorm: <span className="font-mono text-xs text-cobalt">instantstorm.com</span></li>
          <li>New Project → add <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">screensaver.html</code> as the source</li>
          <li>Output → set name <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">Trainovate.scr</code></li>
          <li>Build → produces <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">Trainovate.scr</code></li>
          <li>Sign with your org's code-signing cert, then deploy via Group Policy or Intune to <code className="font-mono text-xs bg-bone px-1.5 py-0.5 rounded">C:\Windows\System32\</code></li>
        </ol>
        <TAlert tone="warning" title="Sign before you ship">
          InstantStorm output is unsigned by default. An unsigned <code className="font-mono text-xs">.scr</code> on
          a managed fleet trips SmartScreen. Always sign with your organization's certificate before distribution.
        </TAlert>
      </TCard>
    </div>
  );
}
