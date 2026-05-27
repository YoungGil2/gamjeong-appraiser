'use client';

import { useState } from 'react';
import { CONTEXT_OPTIONS, TONE_AXIS_LABELS, type ContextId } from '@/entities/analysis/config/constants';

type AnalysisResult = {
  summary: string;
  scores: Record<string, number>;
  professional: string;
  warm: string;
  concise: string;
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-700"
    >
      {copied ? '복사됨 ✓' : '복사'}
    </button>
  );
};

const AnalyzePage = () => {
  const [selectedContext, setSelectedContext] = useState<ContextId | null>(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const canAnalyze = selectedContext !== null && inputText.trim().length > 0;

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setIsLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: selectedContext, text: inputText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '분석에 실패했습니다.');
      setResult(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="mb-10">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900">내 문장 분석하기</h1>
        <p className="text-sm text-zinc-500">보내는 대상을 선택하고 문장을 입력하면 톤을 분석해드려요</p>
      </div>

      {/* Context selector */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-zinc-700">누구에게 보내는 메시지인가요?</p>
        <div className="flex flex-wrap gap-2">
          {CONTEXT_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedContext(id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selectedContext === id
                  ? 'border-violet-600 bg-violet-600 text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Text input */}
      <div className="mb-4">
        <p className="mb-3 text-sm font-medium text-zinc-700">보내려는 문장을 입력하세요</p>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="예) 혹시 이 부분 다시 확인해주실 수 있나요? 제가 놓친 게 있는 것 같아서요."
          rows={5}
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
        <p className="mt-1.5 text-right text-xs text-zinc-400">{inputText.length}자</p>
      </div>

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={!canAnalyze || isLoading}
        className="w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? '분석 중…' : '분석하기'}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-10 space-y-8">
          <hr className="border-zinc-100" />

          {/* Tone scores */}
          <div>
            <h2 className="mb-5 text-base font-semibold text-zinc-900">톤 분석</h2>
            <div className="space-y-4">
              {TONE_AXIS_LABELS.map(({ key, label, opposite }) => (
                <div key={key}>
                  <div className="mb-1.5 flex justify-between text-xs text-zinc-500">
                    <span className="font-medium text-zinc-700">{label}</span>
                    <span>{opposite}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all duration-700"
                      style={{ width: `${result.scores[key]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl bg-zinc-50 px-5 py-4 text-sm leading-relaxed text-zinc-600">{result.summary}</div>

          {/* Refined versions */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-zinc-900">다듬은 버전</h2>
            <div className="space-y-3">
              {[
                {
                  label: '프로페셔널하게',
                  text: result.professional,
                  badge: 'bg-blue-100 text-blue-700',
                  border: 'border-blue-100',
                },
                {
                  label: '따뜻하고 친근하게',
                  text: result.warm,
                  badge: 'bg-orange-100 text-orange-700',
                  border: 'border-orange-100',
                },
                {
                  label: '간결하고 직접적으로',
                  text: result.concise,
                  badge: 'bg-zinc-100 text-zinc-600',
                  border: 'border-zinc-200',
                },
              ].map(({ label, text, badge, border }) => (
                <div key={label} className={`rounded-xl border ${border} bg-white p-4`}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}>{label}</span>
                    <CopyButton text={text} />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AnalyzePage;
