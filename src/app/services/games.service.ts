import { Injectable } from '@angular/core';
// import { Response, RequestMethod } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GameModel, SearchResult } from '../models/game.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GamesService {

    constructor(public http: HttpClient) {}

    getGameCollection(): Observable<Array<GameModel>> {
        return this.http.get<Array<GameModel>>('http://localhost:5000/api/games');
    }

    addGame(sr: SearchResult): Observable<GameModel> {
        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*'
            })
          };
        return this.http.post<GameModel>('http://localhost:5000/api/games',  this.mapSearchResultsToGameModel(sr), httpOptions);
    }

    mapSearchResultsToGameModel(sr: SearchResult): GameModel {
        let game = new GameModel();
        game.title = sr.name;
        game.coverImg = sr.image['small_url'];
        game.platform = sr.all_platforms;
        game.releaseDate = new Date(sr.original_release_date);
        game.description = sr.deck;
        return game;
    }
}
