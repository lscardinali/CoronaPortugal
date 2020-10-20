export interface DgsNews {
    items: DgsNewsItem[];
}

export interface DgsNewsItem {
    title: string;
    pubDate: Date;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
}


export interface ArcgisResponse {
    features: ArcgisFeature[];
}

export interface ArcgisFeature {
    attributes: ArcgisAttributes;
}

export interface ArcgisAttributes {
    [key: string]: any;
}

export interface Reading {
    date: number,
    confirmed: number | null,
    newConfirmed: number | null,
    deaths: number | null,
    newDeaths: number | null,
    recovered: number | null,
    newRecovered: number | null,
    active: number | null,
    newActive: number | null,
    letality: number | null,
    onWatchCase: number | null,
    internedCases: number | null,
    uciInternedCases: number | null,
}
