export const CONTEXT_OPTIONS = [
  { id: 'boss', label: '상사 · 임원에게' },
  { id: 'client', label: '고객 · 클라이언트에게' },
  { id: 'teammate', label: '팀원 · 동료에게' },
  { id: 'partner', label: '외부 파트너에게' },
] as const;

export type ContextId = (typeof CONTEXT_OPTIONS)[number]['id'];

export const CONTEXT_LABELS: Record<ContextId, string> = {
  boss: '상사나 임원',
  client: '고객이나 클라이언트',
  teammate: '팀원이나 동료',
  partner: '외부 파트너',
};

export const CONTEXT_SHORT_LABELS: Record<ContextId, string> = {
  boss: '상사·임원',
  client: '고객·클라이언트',
  teammate: '팀원·동료',
  partner: '외부 파트너',
};

export const TONE_AXIS_LABELS = [
  { key: 'warmth', label: '따뜻함', opposite: '차가움' },
  { key: 'formality', label: '격식', opposite: '캐주얼' },
  { key: 'directness', label: '직접적', opposite: '우회적' },
  { key: 'confidence', label: '자신감', opposite: '소극적' },
] as const;
