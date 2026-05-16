export const SLUG_MAP: Record<string, Record<string, string>> = {
  pt: {
    "dicas-presente-amigo-secreto": "dicas-presente-amigo-secreto",
    "amigo-secreto-a-distancia": "amigo-secreto-a-distancia",
    "variacoes-divertidas-amigo-secreto": "variacoes-divertidas-amigo-secreto",
  },
  en: {
    "dicas-presente-amigo-secreto": "tips-secret-santa-gift",
    "amigo-secreto-a-distancia": "remote-secret-santa",
    "variacoes-divertidas-amigo-secreto": "fun-secret-santa-variations",
  },
  es: {
    "dicas-presente-amigo-secreto": "consejos-regalo-amigo-invisible",
    "amigo-secreto-a-distancia": "amigo-invisible-a-distancia",
    "variacoes-divertidas-amigo-secreto": "variaciones-divertidas-amigo-invisible",
  },
};

// Função auxiliar para descobrir a chave original do post baseado no slug da URL
export function getOriginalKeyBySlug(locale: string, slugUrl: string): string | undefined {
  const localeSlugs = SLUG_MAP[locale] || SLUG_MAP["pt"];
  return Object.keys(localeSlugs).find((key) => localeSlugs[key] === slugUrl);
}