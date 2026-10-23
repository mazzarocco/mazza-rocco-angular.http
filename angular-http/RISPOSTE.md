# Risposte

1. `provideHttpClient()` registra `HttpClient` e va nei `providers` di `src/app/app.config.ts`.
2. Il costruttore riceve l'istanza come parametro; `inject()` la recupera nel contesto di injection e può essere usato nei campi. La forma con `constructor` non funziona in una classe decorata con `@Service()`; in Angular si usa `@Injectable`.
3. Un Observable rappresenta una sequenza asincrona di valori. `getPosts()` parte al momento del `subscribe()`.
4. `next` gestisce una risposta corretta, `error` un fallimento. Il post 999 chiama `error` con stato 404.
5. I signal notificano Angular quando il valore cambia; con proprietà semplici il template non avrebbe la stessa reattività.
6. Le interfacce documentano la risposta e fanno controllare i nomi: `p.titolo` è un errore perché `Post` espone `title`.
7. Il pipe `json` converte un oggetto in JSON indentato e aiuta a ispezionare la risposta durante lo sviluppo.
8. JSONPlaceholder simula sempre l'id 101 senza salvare i dati. `HttpClient` serializza già l'oggetto e imposta l'header JSON, quindi `JSON.stringify` non serve.
9. La chiave è nei file ambiente ignorati da Git; `environment.example.ts` è il modello senza segreto da copiare nei due file reali.
10. Il bundle Angular viene scaricato dal browser, quindi la chiave è leggibile. Una chiave importante va tenuta su un server e usata tramite backend.

## Richieste osservate

| Pulsante | Metodo | URL | Stato |
| --- | --- | --- | --- |
| Carica un post (1) | GET | `.../posts/1` | 200 |
| Carica un post (999) | GET | `.../posts/999` | 404 |
| Carica tutti | GET | `.../posts` | 200 |
| Invia un post | POST | `.../posts` | 201 |