import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MigrationService } from './services/migration.service';
import { MigrateResponse } from './models/migrate-response';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  sourceLanguages = [
    { value: 'cobol', label: 'COBOL' },
    { value: 'Delphi', label: 'Delphi' },
  ];
  targetLanguages = [
    { value: 'node', label: 'Node' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'go', label: 'Go' }
  ];
  sourceLanguage = 'cobol';
  targetLanguage = 'node';
  legacyCode = '';
  error?: string;
  result = signal<MigrateResponse | null>(null);
  loading = signal(false);

  constructor(private migrationService: MigrationService,
    private cdr: ChangeDetectorRef) {}

  migrate() {
    this.loading.set(true);
    this.error = undefined;
    this.result.set(null);

    this.migrationService
      .migrate(this.sourceLanguage, this.targetLanguage, this.legacyCode)
      .subscribe({
        next: (res) => {
          console.log('FULL RESPONSE:', res);
          this.result.set(res);
          this.loading.set(false);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Error ejecutando migración';
        }
      });
  }

  isValidCode(): boolean {
    return !!this.legacyCode && this.legacyCode.trim().length > 0;
  }
}
