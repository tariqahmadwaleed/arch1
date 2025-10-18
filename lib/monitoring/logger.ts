type LogLevel = "info" | "warn" | "error" | "debug"

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private formatLog(entry: LogEntry): string {
    return JSON.stringify({
      ...entry,
      timestamp: new Date().toISOString(),
    })
  }

  info(message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = { level: "info", message, timestamp: new Date().toISOString(), context }
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, context || "")
    } else {
      console.log(this.formatLog(entry))
    }
  }

  warn(message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = { level: "warn", message, timestamp: new Date().toISOString(), context }
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context || "")
    } else {
      console.warn(this.formatLog(entry))
    }
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      context: {
        ...context,
        error: error?.message,
        stack: error?.stack,
      },
    }
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error, context || "")
    } else {
      console.error(this.formatLog(entry))
    }
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (this.isDevelopment) {
      const entry: LogEntry = {
        level: "debug",
        message,
        timestamp: new Date().toISOString(),
        context,
      }
      console.debug(`[DEBUG] ${message}`, context || "")
    }
  }
}

export const logger = new Logger()
