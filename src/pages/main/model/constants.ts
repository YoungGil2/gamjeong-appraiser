export const PAIN_POINTS = [
  '이 문장이 너무 차갑게 들리지 않을까?',
  '너무 격식을 차린 건 아닐까? 오히려 어색하게 보이겠다',
  '거절하는 건데 상처주지 않게 쓰고 싶은데…',
  'AI한테 다듬어달라고 했는데 결과가 매번 들쭉날쭉해',
] as const;

export const TONE_AXES = [
  {
    label: '따뜻함 ↔ 차가움',
    description: '감정적 온도감을 수치로 파악합니다',
    icon: '🌡️',
  },
  {
    label: '격식 ↔ 캐주얼',
    description: '상황에 맞는 문체인지 확인합니다',
    icon: '🎩',
  },
  {
    label: '직접적 ↔ 우회적',
    description: '의도가 얼마나 명확하게 전달되는지 봅니다',
    icon: '🎯',
  },
  {
    label: '자신감 수준',
    description: '주장의 강도와 확신감을 측정합니다',
    icon: '💪',
  },
] as const;

export const STEPS = [
  {
    step: '01',
    title: '컨텍스트 설정',
    description: '상사에게, 고객에게, 팀원에게 — 보내는 대상을 먼저 선택하세요',
  },
  {
    step: '02',
    title: '문장 입력',
    description: '보내려는 메시지를 그대로 붙여넣으세요. 다듬기 전 원본으로요',
  },
  {
    step: '03',
    title: '분석 & 제안 확인',
    description: '4축 톤 분석과 함께 3가지 다듬은 버전을 바로 받아보세요',
  },
] as const;

export const REFINE_STYLES = [
  {
    label: '프로페셔널하게',
    example: '검토 부탁드립니다. 이번 주 안으로 피드백 주시면 감사하겠습니다.',
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    label: '따뜻하고 친근하게',
    example: '한 번 봐주실 수 있을까요? 이번 주 안이면 정말 좋을 것 같아요 :)',
    color: 'border-orange-200 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    label: '간결하고 직접적으로',
    example: '이번 주 안에 피드백 필요합니다.',
    color: 'border-zinc-200 bg-zinc-50',
    badge: 'bg-zinc-100 text-zinc-700',
  },
] as const;
