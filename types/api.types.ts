/** Standard API error response */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/** Standard API success response wrapper */
export interface ApiResponse<T> {
  success?: boolean;
  statusCode?: number;
  data: T;
  message?: string;
}

export interface PhimCategory {
	name: string;
	slug: string;
	id: string;
}


export interface PhimCountry {
	name: string;
	slug: string;
	id: string;
}

export interface PhimTmdb {
	id: string | null;
	type: string | null;
	season: number | null;
	vote_average: number;
	vote_count: number;
}

export interface PhimImdb {
	id: string | null;
	vote_average: number;
	vote_count: number;
}

export interface ItemFlim {
  	_id: string;
	name: string;
	slug: string;
	origin_name: string;
	alternative_names: string[];
	type: string; // "hoathinh" | "series" | "tvshows" | "single"
	poster_url: string;
	thumb_url?: string;
	sub_docquyen: boolean;
	time: string;
	episode_current: string;
	quality: string;
	lang: string;
	year: number;
	category: PhimCategory[];
	country: PhimCountry[];
	tmdb: PhimTmdb;
	imdb: PhimImdb;
	modified: {
		time: string;
	};
}

export interface SectionItemFlim {
	id: number;
	name: string;
	items: ItemFlim[];
	slug?: string;
}