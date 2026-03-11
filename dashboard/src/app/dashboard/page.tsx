"use client";

import LeaderBoard from "@/components/dashboard/LeaderBoard";
import RaceControl from "@/components/dashboard/RaceControl";
import TeamRadios from "@/components/dashboard/TeamRadios";
import TrackViolations from "@/components/dashboard/TrackViolations";
import Map from "@/components/dashboard/Map";
import DashboardSupportWidget from "@/components/dashboard/DashboardSupportWidget";
import StickyBanner from "@/components/dashboard/StickyBanner";

export default function Page() {
	return (
		<div className="flex w-full flex-col gap-2 bg-[#111827] p-4 pb-24">
			<div className="flex w-full flex-col gap-2 lg:flex-row lg:items-start">
				<div className="w-full lg:w-auto lg:flex-shrink-0">
					<div className="overflow-x-auto md:overflow-x-visible">
						<LeaderBoard />
					</div>
					<DashboardSupportWidget />
				</div>

				<div className="flex-1 w-full h-[35rem] lg:h-auto lg:min-h-[35rem]">
					<Map />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="h-[30rem] overflow-y-auto rounded-xl bg-[#1F2937] border border-white/10 p-6 shadow-lg">
					<h2 className="text-lg font-semibold text-white mb-4">Race Control</h2>
					<RaceControl />
				</div>

				<div className="h-[30rem] overflow-y-auto rounded-xl bg-[#1F2937] border border-white/10 p-6 shadow-lg">
					<h2 className="text-lg font-semibold text-white mb-4">Team Radio</h2>
					<TeamRadios />
				</div>

				<div className="h-[30rem] overflow-y-auto rounded-xl bg-[#1F2937] border border-white/10 p-6 shadow-lg">
					<h2 className="text-lg font-semibold text-white mb-4">Track Violations</h2>
					<TrackViolations />
				</div>
			</div>

			<StickyBanner />
		</div>
	);
}
