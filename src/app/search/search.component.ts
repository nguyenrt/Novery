import { Component, Inject, Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { NgModel } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs/Observable';
import { GamesService } from '../services/games.service';
import { GameModel, SearchResult, Platforms } from '../models/game.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    providers: [GamesService]
})

@Injectable()
export class SearchComponent {
    public _searchResults: SearchResult[];
    public _jsonp: Jsonp;
    public _searchStr = '';
    position = 'above';
    private _resource = 'game';
    private _url: string;

    constructor(
        private gamesSvc: GamesService
        , private config: AppConfig
        , private jsonp: Jsonp
    ) {
        this._jsonp = jsonp;
        const baseUrl = config.getConfig('vgApiUrl');
        const apiKey = config.getConfig('vgApiKey');
        const maxResultCount = '5';

        this._url = baseUrl + '/api/search/?format=jsonp&json_callback=JSONP_CALLBACK&api_key=' +
                    apiKey + '&limit=' + maxResultCount + '&resources=' + this._resource + '&query=';
    }

    private getResults(): Observable<any> {
        return this._jsonp.get(this._url + this._searchStr)
            .map(res => res.json().results);
    }

    public getQuery(): void {
        this.getResults().subscribe((e: SearchResult[]) => {
            this._searchResults = e;
            this._searchResults.forEach((item: SearchResult) => {
                let platforms: string[] = [];

                item.platforms.forEach((platform: Platforms) => {
                    platforms.push(platform.name);
                });

                platforms.sort();
                item.all_platforms = platforms.join(', ');
                item.cover_image = item.image !== null ? item.image['thumb_url'] : '';
            });
        });
    }

    public redirectUrl(url: string): void {
        window.open(url, '_blank');
    }

    public addGame(sr: SearchResult): void {
        this.gamesSvc.addGame(sr).subscribe(res => {
            console.log(res);
        });
    }
}
