import { type ReactNode, useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
	// ESCキーでモーダルを閉じる
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEsc);
			// スクロールを無効化
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEsc);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* オーバーレイ */}
			<button
				type="button"
				className="absolute inset-0 bg-black bg-opacity-50"
				onClick={onClose}
				aria-label="モーダルを閉じる"
			/>

			{/* モーダルコンテンツ */}
			<div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
				{title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

				{/* クローズボタン */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
					aria-label="閉じる"
				>
					<svg
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{children}
			</div>
		</div>
	);
}
