import Link from "next/link";
import { PAIN_POINTS, TONE_AXES, STEPS, REFINE_STYLES } from "../model/constants";

const LandingPage = () => {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-violet-50 to-white px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-violet-100/60 via-transparent to-transparent" />
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-600">
            AI 커뮤니케이션 도구
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
            보내기 전에
            <br />
            <span className="text-violet-600">내 문장의 온도</span>를 확인하세요
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-zinc-500">
            내 글이 상대방에게 차갑게 들릴지, 너무 격식 차린 건지 —
            <br className="hidden sm:block" />
            컨텍스트에 맞게 분석하고 3가지 버전으로 다듬어드립니다
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/analyze"
              className="rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700"
            >
              지금 바로 분석하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-zinc-400">
            이런 고민, 해본 적 있나요?
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PAIN_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm leading-relaxed text-zinc-600 shadow-sm"
              >
                <span className="mt-0.5 shrink-0 text-zinc-300">&ldquo;</span>
                {point}
                <span className="mt-0.5 shrink-0 self-end text-zinc-300">&rdquo;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-zinc-900">
            3단계로 끝납니다
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col gap-3">
                <span className="text-3xl font-bold text-violet-200">{step}</span>
                <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tone axes */}
      <section className="bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center text-2xl font-bold tracking-tight">
            4가지 축으로 분석합니다
          </h2>
          <p className="mb-12 text-center text-sm text-zinc-400">
            단순한 맞춤법 교정이 아닌 커뮤니케이션 의도를 파악합니다
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {TONE_AXES.map(({ label, description, icon }) => (
              <div
                key={label}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-semibold text-zinc-100">{label}</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-3/5 rounded-full bg-linear-to-r from-violet-500 to-violet-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refine styles */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-zinc-900">
            3가지 버전으로 다듬어드립니다
          </h2>
          <p className="mb-12 text-center text-sm text-zinc-500">
            원하는 스타일을 골라서 바로 복사하세요
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {REFINE_STYLES.map(({ label, example, color, badge }) => (
              <div key={label} className={`rounded-xl border p-5 ${color}`}>
                <span
                  className={`mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}
                >
                  {label}
                </span>
                <p className="text-sm leading-relaxed text-zinc-700">
                  &ldquo;{example}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-violet-600 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            지금 바로 내 문장을 분석해보세요
          </h2>
          <p className="mb-8 text-violet-200">
            분석부터 다듬기까지 30초면 끝납니다.
          </p>
          <Link
            href="/analyze"
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-violet-700 shadow-sm transition-colors hover:bg-violet-50"
          >
            분석하기 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-6 py-8 text-center text-xs text-zinc-400">
        © 2026 감정평가사. AI 커뮤니케이션 도구.
      </footer>
    </main>
  );
};

export default LandingPage;
