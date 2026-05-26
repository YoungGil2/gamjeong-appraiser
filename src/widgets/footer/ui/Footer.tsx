const Footer = () => {
  return (
    <footer className="mt-auto border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="mb-4 text-xs text-zinc-400">© 2026 감정평가사. AI 커뮤니케이션 도구.</p>
        <p className="mb-1 text-xs font-medium text-zinc-500">고객센터</p>
        <p className="mb-2 text-xs text-zinc-400">개발자가 직접 확인하고 최대한 빠르게 답변드리겠습니다.</p>
        <div className="flex flex-col gap-1 text-sm text-zinc-400 sm:flex-row sm:gap-4">
          <a href="tel:010-3974-2853" className="transition-colors hover:text-zinc-700">
            010-3974-2853
          </a>
          <a href="mailto:shfjrk1868@gmail.com" className="transition-colors hover:text-zinc-700">
            shfjrk1868@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
