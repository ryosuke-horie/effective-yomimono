"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("エラーが発生しました:", error);
	}, [error]);

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg
							className="h-5 w-5 text-red-400"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="ml-3">
						<h3 className="text-sm font-medium text-red-800">
							エラーが発生しました
						</h3>
						<div className="mt-2 text-sm text-red-700">
							<p>申し訳ありません。予期せぬエラーが発生しました。</p>
						</div>
						<div className="mt-4">
							<button
								type="button"
								onClick={reset}
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								再試行
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
