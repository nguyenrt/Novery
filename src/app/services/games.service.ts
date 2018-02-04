import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GameModel } from '../models/game.model';

@Injectable()
export class GamesService {

    constructor(private http: Http) {}

    getGameCollection() {
        return this.http.get('api/games').map((res: Response) => res.json());
    }
}
