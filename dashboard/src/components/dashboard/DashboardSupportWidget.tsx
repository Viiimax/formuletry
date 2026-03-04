import React from 'react';

const DashboardSupportWidget: React.FC = () => {
	return (
		<div className="border-t border-white/10 py-6 text-center">
			<p className="text-white text-lg font-semibold">Ayúdanos a mantenernos online ⚡</p>
			<div className="flex justify-center gap-4 mt-4">
				<a
					href="https://www.buymeacoffee.com/formuletry"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2 border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-4 py-2 rounded-md"
				>
					<span>Buy Me a Coffee</span>
				</a>
			</div>
		</div>
	);
};

export default DashboardSupportWidget;