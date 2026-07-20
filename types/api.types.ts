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

export interface ParamsType {
	page?: number;
	limit?: number;
	category?: string;
	country?: string;
	year?: string;
	sort_field?: string;
	sort_type?: string;
}

export interface EpisodeServerData {
	name: string;
	slug: string;
	filename: string;
	link_embed: string;
	link_m3u8: string;
}

export interface Episode {
	server_name: string;
	is_ai: boolean;
	server_data: EpisodeServerData[];
}

export interface MovieImage {
	width: number;
	height: number;
	aspect_ratio: number;
	type: "backdrop" | "poster";
	file_path: string;
	iso_639_1?: string;
	url: string;
}

export interface MoviePeople {
	tmdb_people_id: number;
	adult: boolean;
	gender: number;
	gender_name: string;
	name: string;
	original_name: string;
	character: string;
	known_for_department: string;
	profile_path: string;
	also_known_as: string[] | null;
	profile_url: string | null;
}

export interface MovieDetail {
	_id: string;
	name: string;
	slug: string;
	origin_name: string;
	alternative_names: string[];
	content: string;
	type: string;
	status: string;
	thumb_url: string;
	poster_url: string;
	is_copyright: boolean;
	sub_docquyen: boolean;
	chieurap: boolean;
	is_published: boolean;
	trailer_url: string;
	time: string;
	episode_current: string;
	episode_total: number;
	quality: string;
	lang: string;
	lang_key: string[];
	notify: string;
	showtimes: string;
	year: number;
	view: number;
	actor: string[];
	director: string[];
	category: PhimCategory[];
	country: PhimCountry[];
	tmdb: PhimTmdb;
	imdb: PhimImdb;
	created: { time: string };
	modified: { time: string };
	episodes: Episode[];
	images: MovieImage[];
	peoples: MoviePeople[];
}
