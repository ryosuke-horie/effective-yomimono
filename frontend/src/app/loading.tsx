export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="animate-pulse">
				<div className="h-8 bg-gray-200 rounded-sm w-1/4 mb-6" />
				<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{[...Array(6)].map((_, index) => (
						<div
							key={`loading-placeholder-${index}`}
							className="h-32 bg-gray-200 rounded-sm"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
