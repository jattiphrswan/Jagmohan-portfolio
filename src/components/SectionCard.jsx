export default function SectionCard({
  title,
  subtitle,
  action,
  id,
  className = "",
  bodyClassName = "p-5",
  children,
}) {
  return (
    <section
      id={id}
      className={`rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

