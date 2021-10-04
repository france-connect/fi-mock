import { getErrorCode, wait, logger } from '../src/helpers';

describe('Helpers', () => {
  describe('getErrorCode', () => {
    it('Should return the last part', () => {
      // Given
      const input = 'test_123';
      // When
      const result = getErrorCode(input);
      // Then
      expect(result).toBe('123');
    });

    it('Should return input if no code found', () => {
      // Given
      const input = 'test without separator';
      // When
      const result = getErrorCode(input);
      // Then
      expect(result).toBe('test without separator');
    });
  });

  describe('wait', () => {
    it('Should eventually resolve', (done) => {
      // When
      wait(200).then(done);
    });

    it('Should delay execution', (done) => {
      // Given
      const recipient = [];
      // When
      wait(400).then(() => { recipient.push('A'); });
      wait(200).then(() => { recipient.push('B'); });
      recipient.push('C');
      // Then
      wait(500).then(() => {
        expect(recipient).toEqual(['C', 'B', 'A']);
        done();
      });
    });
  });

  describe('logger', () => {
    it('Should have a log method', () => {
      expect(typeof logger.log).toBe('function');
    });

    it('Should have an error method', () => {
      expect(typeof logger.error).toBe('function');
    });

    it('Should have an info method', () => {
      expect(typeof logger.info).toBe('function');
    });
  });
});
