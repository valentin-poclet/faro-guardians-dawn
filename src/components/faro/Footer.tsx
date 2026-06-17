import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/i18n/LanguageContext";
import { BRAND, FOOTER, LINKS, NAV } from "@/content/i18n";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background/60">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">{t(FOOTER.about)}</p>
          <p className="font-display text-sm italic text-accent">"{t(BRAND.slogan)}"</p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t(FOOTER.navTitle)}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">{t(NAV.home)}</Link></li>
            <li><Link to="/projet" className="hover:text-accent">{t(NAV.project)}</Link></li>
            <li><Link to="/architecture" className="hover:text-accent">{t(NAV.architecture)}</Link></li>
            <li><Link to="/equipe" className="hover:text-accent">{t(NAV.team)}</Link></li>
            <li><Link to="/ressources" className="hover:text-accent">{t(NAV.resources)}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t(FOOTER.resourcesTitle)}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={LINKS.drive}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <ExternalLink className="h-4 w-4" /> Google Drive
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} FARO — {t(BRAND.school)}. {t(FOOTER.rights)}</p>
          <p className="font-mono uppercase tracking-widest">Fire Area Risk Observatory</p>
        </div>
      </div>
    </footer>
  );
}