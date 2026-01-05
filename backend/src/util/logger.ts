/**
 * 简单的日志工具
 */

export class Logger {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    const prefixStr = this.prefix ? `[${this.prefix}]` : '';
    return `[${timestamp}] [${level}] ${prefixStr} ${message}`;
  }

  info(message: string, ...args: any[]): void {
    console.log(this.formatMessage('INFO', message), ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage('WARN', message), ...args);
  }

  error(message: string, ...args: any[]): void {
    console.error(this.formatMessage('ERROR', message), ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('DEBUG', message), ...args);
    }
  }
}

export const logger = new Logger('FilezDemo');

