import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { bookmarks } from "../db/schema";
import type { Bookmark, InsertBookmark } from "../db/schema";

export interface BookmarkRepository {
	createMany(bookmarks: InsertBookmark[]): Promise<void>;
	findUnread(): Promise<Bookmark[]>;
	findByUrls(urls: string[]): Promise<Bookmark[]>;
	markAsRead(id: number): Promise<boolean>;
	countUnread(): Promise<number>;
}

export class DrizzleBookmarkRepository implements BookmarkRepository {
	constructor(private readonly db: DrizzleD1Database) {}

	async findByUrls(urls: string[]): Promise<Bookmark[]> {
		try {
			if (urls.length === 0) {
				return [];
			}
			return await this.db
				.select()
				.from(bookmarks)
				.where(inArray(bookmarks.url, urls))
				.all();
		} catch (error) {
			console.error("Failed to find bookmarks by URLs:", error);
			throw error;
		}
	}

	async countUnread(): Promise<number> {
		try {
			const result = await this.db
				.select({ count: count() })
				.from(bookmarks)
				.where(eq(bookmarks.isRead, false))
				.get();

			return result?.count || 0;
		} catch (error) {
			console.error("Failed to count unread bookmarks:", error);
			throw error;
		}
	}

	async findUnread(): Promise<Bookmark[]> {
		try {
			return await this.db
				.select()
				.from(bookmarks)
				.where(eq(bookmarks.isRead, false))
				.all();
		} catch (error) {
			console.error("Failed to fetch unread bookmarks:", error);
			throw error;
		}
	}

	async createMany(newBookmarks: InsertBookmark[]): Promise<void> {
		try {
			if (newBookmarks.length === 0) {
				return;
			}

			// 順次処理に変更
			await Promise.all(
				newBookmarks.map((bookmark) =>
					this.db.insert(bookmarks).values(bookmark),
				),
			);
		} catch (error) {
			console.error("Failed to create bookmarks:", error);
			throw error;
		}
	}

	async markAsRead(id: number): Promise<boolean> {
		try {
			// 存在確認
			const bookmark = await this.db
				.select()
				.from(bookmarks)
				.where(eq(bookmarks.id, id))
				.get();

			if (!bookmark) {
				return false;
			}

			const result = await this.db
				.update(bookmarks)
				.set({
					isRead: true,
					updatedAt: new Date(),
				})
				.where(eq(bookmarks.id, id))
				.run();

			return true;
		} catch (error) {
			console.error("Failed to mark bookmark as read:", error);
			throw error;
		}
	}
}
