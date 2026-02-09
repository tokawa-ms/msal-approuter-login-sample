import { ResourceKey } from "@/lib/i18n/resources";

type FooterProps = {
  dictionary: Record<ResourceKey, string>;
};

export default function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="border-t border-black/5 bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-ink/70">
        <span>{dictionary.footerNote}</span>
        <span className="text-xs">{dictionary.footerCopyright}</span>
      </div>
    </footer>
  );
}
