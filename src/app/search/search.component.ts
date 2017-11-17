import { Component, Inject, Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { NgModel } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

@Injectable()
export class SearchComponent {
    public _searchResults: SearchResults[];
    public _jsonp: Jsonp;
    public _searchStr = '';
    position = 'above';
    private _resource = 'game';
    private _url: string;

    constructor(private config: AppConfig, jsonp: Jsonp) {
        this._jsonp = jsonp;
        const baseUrl = config.getConfig('vgApiUrl');
        const apiKey = config.getConfig('vgApiKey');
        const maxResultCount = '5';

        this._url = baseUrl + '/api/search/?format=jsonp&json_callback=JSONP_CALLBACK&api_key=' +
                    apiKey + '&limit=' + maxResultCount + '&resources=' + this._resource + '&query=';
    }

    private getResults() {
        return this._jsonp.get(this._url + this._searchStr)
            .map(res => res.json().results);
    }

    public getQuery() {
        this.getResults().subscribe((e: SearchResults[]) => {
            this._searchResults = e;
            for (let i of e) {
                let platforms: string[] = [];

                for (let j of i.platforms) {
                   platforms.push(j.name);
                }

                platforms.sort();
                i.all_platforms = platforms.join(', ');
                i.cover_image = i.image !== null ? i.image['thumb_url'] : '';
            }
        });
    }

    public redirectUrl(url: string) {
        window.open(url, '_blank');
    }
}

export interface SearchResults {
    name: string;
    aliases: string;
    api_detail_url: string;
    deck: string;
    description: string;
    resource_type: string;
    image: string[];
    number_of_user_reviews: number;
    platforms: Platforms[];
    all_platforms: string;
    cover_image: string;
    site_detail_url: string;
}

export interface Platforms {
    abbreviation: string;
    api_detail_url: string;
    name: string;
    site_detail_url: string;
}