import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Post } from '../modelli/post';
import { PostService } from '../services/post-service';

@Component({ imports: [CommonModule], selector: 'app-posts', templateUrl: './posts.html', styleUrl: './posts.css' })
export class Posts {
  private readonly postService = inject(PostService);
  readonly post = signal<Post | null>(null);
  readonly posts = signal<Post[]>([]);
  readonly pagina = signal(1);
  readonly loading = signal(false);
  readonly errore = signal<string | null>(null);
  caricaUno(numero: string): void { this.inizia(); this.postService.getPost(Number(numero)).subscribe({ next: dato => { this.post.set(dato); this.loading.set(false); }, error: (err: HttpErrorResponse) => this.gestisciErrore(err) }); }
  caricaTutti(): void { this.inizia(); this.postService.getPosts().subscribe({ next: dati => { this.posts.set(dati); this.loading.set(false); }, error: (err: HttpErrorResponse) => this.gestisciErrore(err) }); }
  invia(): void { this.inizia(); this.postService.addPost({ userId: 1, title: 'Primo post da Angular', body: 'Inviato con HttpClient' }).subscribe({ next: risposta => { this.post.set(risposta); this.loading.set(false); }, error: (err: HttpErrorResponse) => this.gestisciErrore(err) }); }
  caricaPagina(numero: number): void { this.inizia(); this.postService.getPagina(numero).subscribe({ next: dati => { this.posts.set(dati); this.pagina.set(numero); this.loading.set(false); }, error: (err: HttpErrorResponse) => this.gestisciErrore(err) }); }
  private inizia(): void { this.loading.set(true); this.errore.set(null); }
  private gestisciErrore(err: HttpErrorResponse): void { this.errore.set(`Errore ${err.status}: ${err.message}`); this.loading.set(false); }
}