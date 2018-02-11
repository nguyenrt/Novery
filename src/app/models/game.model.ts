export class GameModel {
    public _id: any;
    public title: string;
    public platform: string;
    public developer: string;
    public publisher: string;
    public releaseDate: Date;
    public releaseDateStr: string;
    public comments: string;
    public coverImg: string;
    public ownerId: string;
    public description: string;
}

export class SearchResult {
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
    original_release_date: string;
}

export class Platforms {
    abbreviation: string;
    api_detail_url: string;
    name: string;
    site_detail_url: string;
}
