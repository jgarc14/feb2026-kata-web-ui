export interface MigrateResponse {
  translatedCode: string;
  report: {
    rulesApplied: string[];
    warnings: string[];
  };
}