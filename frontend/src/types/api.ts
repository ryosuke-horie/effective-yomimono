import type { Bookmark } from "./bookmark";

interface ApiError {
	code: string;
	message: string;
}

interface ApiResponse<T> {
	success: boolean;
	bookmarks?: T[];
	message?: string;
	error?: ApiError;
}

export type ApiBookmarkResponse = ApiResponse<Bookmark>;
