import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLang } from "@/i18n/LanguageContext";
import { NAV, UI } from "@/content/i18n";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", key: "home" as const },
  { to: "/projet", key: "project" as const },
  { to: "/architecture", key: "architecture" as const },
  { to: "/equipe", key: "team" as const },
  { to: "/ressources", key: "resources" as const },
];

export function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" aria-label="FARO — home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative py-1 font-medium tracking-wide transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(NAV[l.key])}
                      <span
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 text-foreground md:hidden"
          aria-label={open ? t(UI.closeMenu) : t(UI.openMenu)}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden",
          open
            ? "visible opacity-100"
            : "invisible opacity-0",
          "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-border/60 bg-background/95 backdrop-blur-xl transition-opacity duration-300",
        )}
      >
        <ul className="container flex flex-col gap-1 py-6">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-4 py-3 text-lg font-medium",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )
                }
              >
                {t(NAV[l.key])}
              </NavLink>
            </li>
          ))}
          <li className="mt-4 px-4">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </>
  );
}
