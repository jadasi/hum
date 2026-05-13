import {
  createEmptyRelationshipDraft,
  setRelationshipDraftBody,
  toggleRelationshipDraftTag,
} from '@/pages/driver-ride';
import { getSupabase } from '@/shared/api';

jest.mock('@/shared/api', () => ({
  getSupabase: jest.fn(),
}));

describe('local relationship draft', () => {
  it('updates draft text without touching Supabase', () => {
    const draft = createEmptyRelationshipDraft();
    const next = setRelationshipDraftBody(draft, 'Remember water');
    expect(next.body).toBe('Remember water');
    expect(getSupabase).not.toHaveBeenCalled();
  });

  it('toggles tags immutably without touching Supabase', () => {
    let draft = createEmptyRelationshipDraft();
    draft = toggleRelationshipDraftTag(draft, 'VIP');
    expect(draft.tags).toEqual(['VIP']);
    draft = toggleRelationshipDraftTag(draft, 'VIP');
    expect(draft.tags).toEqual([]);
    expect(getSupabase).not.toHaveBeenCalled();
  });
});
