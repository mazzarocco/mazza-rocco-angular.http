import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Apod } from '../modelli/apod';
import { NasaService } from '../services/nasa-service';

@Component({ selector: 'app-nasa', templateUrl: './nasa.html', styleUrl: './nasa.css' })
export class Nasa implements OnInit {
  private readonly nasaService = inject(NasaService);
  readonly apod = signal<Apod | null>(null);
  readonly loading = signal(false);
  readonly errore = signal<string | null>(null);
  ngOnInit(): void { this.carica(); }
  carica(data = ''): void { this.loading.set(true); this.errore.set(null); const richiesta = data ? this.nasaService.getApodDel(data) : this.nasaService.getApod(); richiesta.subscribe({ next: dati => { this.apod.set(dati); this.loading.set(false); }, error: (err: HttpErrorResponse) => { this.errore.set(this.messaggio(err.status)); this.loading.set(false); } }); }
  private messaggio(status: number): string { if (status === 403) return 'Chiave API mancante o non valida: controlla i file in src/environments.'; if (status === 429) return 'Troppe richieste con questa chiave: riprova più tardi.'; if (status === 0) return 'Il server non è raggiungibile: controlla la connessione.'; return `Errore ${status} dal server della NASA.`; }
}