import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            감정평가사
          </span>
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
            beta
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/analyze" className="transition-colors hover:text-zinc-900">
            분석하기
          </Link>
          <Link href="/history" className="transition-colors hover:text-zinc-900">
            히스토리
          </Link>
        </nav>

        <Link
          href="/analyze"
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          분석하기
        </Link>
      </div>
    </header>
  );
};

export default Header;
