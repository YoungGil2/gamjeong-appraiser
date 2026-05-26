export type Analysis = {
  id: string;
  context: string;
  original_text: string;
  summary: string | null;
  warmth_score: number | null;
  formality_score: number | null;
  directness_score: number | null;
  confidence_score: number | null;
  result_professional: string | null;
  result_warm: string | null;
  result_concise: string | null;
  created_at: string;
};
