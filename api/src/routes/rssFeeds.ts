import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import type { RssFeedService } from "../services/rssFeed";

export const createRssFeedsRouter = (rssFeedService: RssFeedService) => {
	const app = new Hono();
	// RSSフィード一覧取得
	app.get("/feeds", async (c) => {
		try {
			const feeds = await rssFeedService.getAllFeeds();
			return c.json({
				feeds,
				total: feeds.length,
			});
		} catch (error) {
			console.error("Failed to get feeds:", error);
			throw new HTTPException(500, { message: "Failed to get feeds" });
		}
	});

	// RSSフィード詳細取得
	app.get("/feeds/:id", async (c) => {
		try {
			const id = Number.parseInt(c.req.param("id"));
			if (Number.isNaN(id)) {
				throw new HTTPException(404, { message: "Feed not found" });
			}
			const feed = await rssFeedService.getFeedById(id);

			// TODO: 統計情報を実装する場合は、ここで集計する
			const stats = {
				totalItems: 0,
				todayItems: 0,
				lastWeekItems: 0,
			};

			return c.json({
				...feed,
				stats,
			});
		} catch (error) {
			if (error instanceof HTTPException) {
				throw error;
			}
			console.error("Failed to get feed:", error);
			throw new HTTPException(500, { message: "Failed to get feed" });
		}
	});

	// RSSフィード作成
	app.post("/feeds", async (c) => {
		try {
			const data = await c.req.json();
			const newFeed = await rssFeedService.createFeed(data);
			return c.json(newFeed, 201);
		} catch (error) {
			console.error("Failed to create feed:", error);
			throw new HTTPException(500, { message: "Failed to create feed" });
		}
	});

	// RSSフィード更新
	app.put("/feeds/:id", async (c) => {
		try {
			const id = Number.parseInt(c.req.param("id"));
			if (Number.isNaN(id)) {
				throw new HTTPException(404, { message: "Feed not found" });
			}
			const data = await c.req.json();
			const updatedFeed = await rssFeedService.updateFeed(id, data);
			return c.json(updatedFeed);
		} catch (error) {
			if (error instanceof HTTPException) {
				throw error;
			}
			console.error("Failed to update feed:", error);
			throw new HTTPException(500, { message: "Failed to update feed" });
		}
	});

	// RSSフィード削除
	app.delete("/feeds/:id", async (c) => {
		try {
			const id = Number.parseInt(c.req.param("id"));
			if (Number.isNaN(id)) {
				throw new HTTPException(404, { message: "Feed not found" });
			}
			// TODO: クエリパラメータでdeleteBookmarksを確認し、関連ブックマークも削除する処理を追加
			await rssFeedService.deleteFeed(id);
			return c.body(null, 204);
		} catch (error) {
			if (error instanceof HTTPException) {
				throw error;
			}
			console.error("Failed to delete feed:", error);
			throw new HTTPException(500, { message: "Failed to delete feed" });
		}
	});

	return app;
};
