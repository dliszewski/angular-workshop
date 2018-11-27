export interface Video {
    kind: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: {
        thumbnails: {
            medium: Thumbnail;
            default: Thumbnail;
            high: Thumbnail;
        };
        channelTitle: string;
        title: string;
        description: string;
    };
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface FavouriteVideo {
    id: string;
    video: Video;
}
