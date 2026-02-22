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
})
export class App {

  // sourceLanguage = 'cobol';
  // targetLanguage = 'node';
  sourceLanguages = [
    { value: 'cobol', label: 'COBOL' },
    { value: 'pl1', label: 'PL/I' },
    { value: 'rpg', label: 'RPG' },
    { value: 'vb6', label: 'VB6' },
    { value: 'fortran', label: 'Fortran' }
  ];

  targetLanguages = [
    { value: 'node', label: 'Node.js' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'python', label: 'Python' },
    { value: 'go', label: 'Go' }
  ];
  sourceLanguage = 'cobol';
  targetLanguage = 'node';
  legacyCode = '';
  // result?: MigrateResponse;
  // loading = false;
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
          // this.result = res;
          // this.loading = false;
          this.result.set(res);
          this.loading.set(false);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Error ejecutando migración';
          // this.loading = false;
        }
      });
  }
}