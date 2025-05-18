import { drizzle } from "drizzle-orm/d1";
import { sql } from "drizzle-orm";
import { bookmarks } from "../src/db/schema";
import { Hono } from "hono";
import type { Env } from "../src";

/**
 * 本番環境の dummy summary を削除するワンタイムスクリプト
 * 実行後は削除すること
 */
async function clearDummySummaries(env: Env) {
	const db = drizzle(env.DB);

	try {
		console.log("Starting to clear dummy summaries...");

		// 1. 現在の summary が存在するレコード数を確認
		const [countBefore] = await db
			.select({ count: sql<number>`count(*)` })
			.from(bookmarks)
			.where(sql`${bookmarks.summary} IS NOT NULL`);

		console.log(`Records with summary before: ${countBefore.count}`);

		// 2. summary, summaryCreatedAt, summaryUpdatedAt を NULL に更新
		const result = await db
			.update(bookmarks)
			.set({
				summary: null,
				summaryCreatedAt: null,
				summaryUpdatedAt: null,
			})
			.where(sql`${bookmarks.summary} IS NOT NULL`);

		console.log("Update completed.");

		// 3. 更新後の確認
		const [countAfter] = await db
			.select({ count: sql<number>`count(*)` })
			.from(bookmarks)
			.where(sql`${bookmarks.summary} IS NOT NULL`);

		console.log(`Records with summary after: ${countAfter.count}`);
		console.log("Successfully cleared all dummy summaries!");

		return {
			before: countBefore.count,
			after: countAfter.count,
			cleared: countBefore.count - countAfter.count,
		};
	} catch (error) {
		console.error("Error clearing summaries:", error);
		throw error;
	}
}

// Cloudflare Workers のエンドポイントとして実行
const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
	try {
		const result = await clearDummySummaries(c.env);
		return c.json({
			success: true,
			message: "Dummy summaries cleared successfully",
			result,
		});
	} catch (error) {
		return c.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			500,
		);
	}
});

export default app;