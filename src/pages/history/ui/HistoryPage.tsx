import { supabase } from '@/shared/lib/supabase/client';
import type { Analysis } from '@/shared/lib/supabase/types';

const CONTEXT_LABELS: Record<string, string> = {
  boss: '상사·임원',
  client: '고객·클라이언트',
  teammate: '팀원·동료',
  partner: '외부 파트너',
};

const SCORE_KEYS: { key: keyof Analysis; label: string }[] = [
  { key: 'warmth_score', label: '따뜻함' },
  { key: 'formality_score', label: '격식' },
  { key: 'directness_score', label: '직접적' },
  { key: 'confidence_score', label: '자신감' },
];

const ScoreBar = ({ value, label }: { value: number | null; label: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-12 shrink-0 text-xs text-zinc-400">{label}</span>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
      <div className="h-full rounded-full bg-violet-400" style={{ width: `${value ?? 0}%` }} />
    </div>
    <span className="w-6 shrink-0 text-right text-xs text-zinc-400">{value ?? '-'}</span>
  </div>
);

const AnalysisCard = ({ item }: { item: Analysis }) => {
  const date = new Date(item.created_at).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
          {CONTEXT_LABELS[item.context] ?? item.context}
        </span>
        <span className="text-xs text-zinc-400">{date}</span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-zinc-800">
        &ldquo;{item.original_text.length > 80 ? item.original_text.slice(0, 80) + '…' : item.original_text}&rdquo;
      </p>

      <div className="mb-4 space-y-1.5">
        {SCORE_KEYS.map(({ key, label }) => (
          <ScoreBar key={key} value={item[key] as number | null} label={label} />
        ))}
      </div>

      {item.summary && (
        <p className="border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-500">{item.summary}</p>
      )}
    </div>
  );
};

const HistoryPage = async () => {
  const { data: analyses, error } = await supabase
    .from('analyses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900">분석 내역</h1>
        <p className="text-sm text-zinc-500">최근 분석된 문장 {analyses?.length ?? 0}건</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          데이터를 불러오는 데 실패했습니다.
        </div>
      )}

      {!error && analyses?.length === 0 && (
        <div className="py-20 text-center text-sm text-zinc-400">아직 분석 내역이 없습니다.</div>
      )}

      <div className="space-y-4">
        {analyses?.map((item) => (
          <AnalysisCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};

export default HistoryPage;
