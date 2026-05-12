import { messageFromCaughtException } from '@/features/auth';

describe('messageFromCaughtException', () => {
  it('maps network-like errors', () => {
    expect(messageFromCaughtException(new Error('Network request failed'))).toContain('connection');
    expect(messageFromCaughtException(new Error('timeout'))).toContain('connection');
  });

  it('maps unknown errors to generic copy', () => {
    expect(messageFromCaughtException(new Error('unexpected'))).toBe('Something went wrong. Please try again.');
  });
});
