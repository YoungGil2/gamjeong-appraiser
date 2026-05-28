import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import { createSupabaseServer } from '@/shared/lib/supabase/server';
import { CONTEXT_LABELS } from '@/entities/analysis/config/constants';

export const POST = async (request: NextRequest) => {
  console.log('[env] OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY, '/ prefix:', process.env.OPENAI_API_KEY?.slice(0, 10));
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { context, text } = await request.json();

  if (!context || !text?.trim()) {
    return Response.json({ error: 'context와 text는 필수입니다.' }, { status: 400 });
  }

  const contextLabel = CONTEXT_LABELS[context as keyof typeof CONTEXT_LABELS] ?? context;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: '당신은 한국어 비즈니스 커뮤니케이션 전문가입니다. 요청된 JSON 형식으로만 응답합니다.',
        },
        {
          role: 'user',
          content: `아래 메시지를 분석해주세요.
- 보내는 대상: ${contextLabel}
- 원문: "${text}"

다음 JSON 형식으로 응답해주세요.

{
  "scores": {
    "warmth": <0~100, 높을수록 따뜻함>,
    "formality": <0~100, 높을수록 격식체>,
    "directness": <0~100, 높을수록 직접적>,
    "confidence": <0~100, 높을수록 자신감 있음>
  },
  "summary": "<2~3문장으로 톤 전반 평가. 상대방이 어떻게 느낄지 포함>",
  "professional": "<프로페셔널하게 다듬은 버전>",
  "warm": "<따뜻하고 친근하게 다듬은 버전>",
  "concise": "<간결하고 직접적으로 다듬은 버전>"
}`,
        },
      ],
    });
    console.log('check log 1', completion);

    const raw = completion.choices[0].message.content ?? '';
    console.log('[analyze] raw response:', raw);
    if (!raw) throw new Error('OpenAI returned empty response');
    const result = JSON.parse(raw);

    // 로그인 사용자만 내역 저장
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log('check log 2 ', user);
    const { error: dbError } = await supabase.from('analyses').insert({
      user_id: user?.id ?? null,
      context,
      original_text: text,
      summary: result.summary,
      warmth_score: result.scores?.warmth,
      formality_score: result.scores?.formality,
      directness_score: result.scores?.directness,
      confidence_score: result.scores?.confidence,
      result_professional: result.professional,
      result_warm: result.warm,
      result_concise: result.concise,
    });
    console.log('check log 3', dbError);
    if (dbError) console.error('[supabase insert]', dbError);

    return Response.json(result);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    const message =
      status === 429 ? 'API 사용량 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' : '분석 중 오류가 발생했습니다.';
    return Response.json({ error: message }, { status });
  }
};
