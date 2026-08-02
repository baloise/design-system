export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between bg-background px-6">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Design System" className="size-8" />
        <span className="font-heading text-lg font-semibold">Token Editor</span>
      </div>
      <div className="flex items-center gap-3">{/* user goes here */}</div>
    </header>
  )
}
