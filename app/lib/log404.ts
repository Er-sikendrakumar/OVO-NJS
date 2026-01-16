import { promises as fs } from 'fs';
import path from 'path';

interface Log404Entry {
  timestamp: string;
  path: string;
  type: 'state' | 'city' | 'location';
  params: Record<string, string>;
  error?: string;
}

export async function log404(entry: Omit<Log404Entry, 'timestamp'>) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

  const logDir = path.join(process.cwd(), 'logs');
  const logFile = path.join(logDir, `404-${dateStr}.log`);

  const logEntry: Log404Entry = {
    timestamp: now.toISOString(),
    ...entry,
  };

  const logLine = JSON.stringify(logEntry) + '\n';

  try {
    // Ensure logs directory exists
    await fs.mkdir(logDir, { recursive: true });

    // Append to log file
    await fs.appendFile(logFile, logLine, 'utf8');
  } catch (error) {
    // If logging fails, at least log to console
    console.error('Failed to write to 404 log:', error);
    console.error('404 Entry:', logEntry);
  }
}
