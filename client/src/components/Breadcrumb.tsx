import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-0.5"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-slate-500 no-underline transition hover:text-sky-700"
        aria-label="Accueil"
      >
        <Home className="size-3.5 shrink-0" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
            <ChevronRight className="size-3 shrink-0 text-slate-300" />
            {isLast || !item.href ? (
              <span className={isLast ? "text-slate-800 font-semibold" : "text-slate-500"}>{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-500 no-underline transition hover:text-sky-700"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
