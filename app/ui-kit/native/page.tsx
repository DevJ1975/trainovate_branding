"use client";

import { useState } from "react";
import { TCard, TBadge, TButton, TTabs } from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";

type Platform = "react-native" | "swiftui" | "uikit";

const SAMPLES: Record<Platform, { install: string; usage: string; notes: string }> = {
  "react-native": {
    install: `# expo / RN
npm install @trainovate/ui-native

# import once at app root for fonts
import "@trainovate/ui-native/fonts";`,
    usage: `import { TButton, TCard, TBadge } from "@trainovate/ui-native";

export default function Screen() {
  return (
    <TCard elevated>
      <TBadge tone="info">In progress</TBadge>
      <TButton variant="primary" onPress={() => {}}>
        Save
      </TButton>
    </TCard>
  );
}`,
    notes: "StyleSheet-based, zero runtime CSS. Tokens live in tokens.js — themed via ThemeProvider.",
  },
  swiftui: {
    install: `// Package.swift
.package(url: "https://github.com/trainovate/ui-swift", from: "1.0.0")

// .target deps
.product(name: "TrainovateUI", package: "ui-swift")`,
    usage: `import TrainovateUI

struct OnboardingView: View {
  var body: some View {
    TCard(elevated: true) {
      TBadge("In progress", tone: .info)
      TButton("Save", variant: .primary) { /* ... */ }
    }
  }
}`,
    notes: "Pure SwiftUI. Uses SF Symbols. Theme switches via @Environment(\\.tTheme).",
  },
  uikit: {
    install: `// Package.swift
.package(url: "https://github.com/trainovate/ui-uikit", from: "1.0.0")

// or CocoaPods
pod 'TrainovateUIKit', '~> 1.0'`,
    usage: `import TrainovateUIKit

let button = TButton(title: "Save", variant: .primary)
button.addTarget(self, action: #selector(save), for: .touchUpInside)

let card = TCard()
card.addArrangedSubview(button)`,
    notes: "Token-bridged from the same JSON. UIView subclasses, Auto Layout-friendly.",
  },
};

const PLATFORM_TABS = [
  { value: "react-native", label: "React Native" },
  { value: "swiftui",      label: "SwiftUI" },
  { value: "uikit",        label: "UIKit" },
];

export default function NativeKitPage() {
  const [platform, setPlatform] = useState<Platform>("react-native");
  const s = SAMPLES[platform];
  return (
    <PageShell
      eyebrow="04 · UI Kit · Native"
      title={<>The same kit, on every platform.</>}
      lede="React Native, SwiftUI, and UIKit ports — same tokens, same component names, same behavior."
    >
      <div className="mt-4 mb-8">
        <TTabs options={PLATFORM_TABS as any} value={platform} onChange={(v) => setPlatform(v as Platform)} />
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        <TCard elevated>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-3">Install</p>
          <pre className="font-mono text-[12px] leading-relaxed bg-[var(--t-bg-inset)] text-[var(--t-fg)] p-4 rounded-md overflow-x-auto whitespace-pre">{s.install}</pre>
          <p className="text-sm text-[var(--t-fg-muted)] mt-4 leading-relaxed">{s.notes}</p>
        </TCard>
        <TCard elevated>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-3">Usage</p>
          <pre className="font-mono text-[12px] leading-relaxed bg-[var(--t-bg-inset)] text-[var(--t-fg)] p-4 rounded-md overflow-x-auto whitespace-pre">{s.usage}</pre>
        </TCard>
      </div>

      <SectionHead title="Component matrix" count="20 PER PLATFORM" />
      <TCard elevated className="!p-0 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[var(--t-bg-inset)] text-[10px] uppercase tracking-[0.14em] font-mono text-ink/55">
              <th className="text-left py-3 px-4 font-medium">Component</th>
              <th className="text-left py-3 px-4 font-medium">Web</th>
              <th className="text-left py-3 px-4 font-medium">React Native</th>
              <th className="text-left py-3 px-4 font-medium">SwiftUI</th>
              <th className="text-left py-3 px-4 font-medium">UIKit</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Button","Card","Badge","Alert","Input","Textarea","Select","Field",
              "Switch","Checkbox","Radio","Slider","Stepper","Segmented","Tabs",
              "ListRow","Avatar","Progress","Modal","Toast",
            ].map((c) => (
              <tr key={c} className="border-t border-[rgba(10,10,10,0.06)]">
                <td className="py-2.5 px-4 font-semibold">{c}</td>
                <td className="py-2.5 px-4 font-mono text-xs text-cobalt">T{c}</td>
                <td className="py-2.5 px-4 font-mono text-xs text-cobalt">T{c}</td>
                <td className="py-2.5 px-4 font-mono text-xs text-cobalt">T{c}</td>
                <td className="py-2.5 px-4 font-mono text-xs text-cobalt">T{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TCard>
    </PageShell>
  );
}
