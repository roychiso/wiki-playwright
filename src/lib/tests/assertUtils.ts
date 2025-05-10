
export class AssertUtils {

  static assertEqual(actual: any, expected: any, message: string): void {
    if (actual !== expected) {
      throw new Error(`${message}\nExpected: ${expected}\nReceived: ${actual}`);
    }
  }

  static assertLessThan(actual: number, limit: number, message: string): void {
    if (actual >= limit) {
      throw new Error(`${message}\nExpected less than: ${limit}\nReceived: ${actual}`);
    }
  }

  static assertGreaterThan(actual: number, threshold: number, message: string): void {
    if (actual <= threshold) {
      throw new Error(`${message}\nExpected greater than: ${threshold}\nReceived: ${actual}`);
    }
  }

}