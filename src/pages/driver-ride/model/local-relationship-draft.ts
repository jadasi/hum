export type LocalRelationshipDraft = {
  body: string;
  tags: string[];
};

export const SUGGESTED_RELATIONSHIP_TAGS = ['VIP', 'Referral', 'Repeat'] as const;

export function createEmptyRelationshipDraft(): LocalRelationshipDraft {
  return { body: '', tags: [] };
}

export function setRelationshipDraftBody(draft: LocalRelationshipDraft, body: string): LocalRelationshipDraft {
  return { ...draft, body };
}

export function toggleRelationshipDraftTag(draft: LocalRelationshipDraft, tag: string): LocalRelationshipDraft {
  const normalized = tag.trim();
  if (!normalized.length) {
    return draft;
  }

  const has = draft.tags.includes(normalized);
  return {
    ...draft,
    tags: has ? draft.tags.filter((existing) => existing !== normalized) : [...draft.tags, normalized],
  };
}
