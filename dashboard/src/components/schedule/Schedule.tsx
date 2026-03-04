import Round from "@/components/schedule/Round";
import type { Round as RoundType } from "@/types/schedule.type";
import { getScheduleStatic } from "@/data/f1-calendar";

// Magia pura: Vercel cacheará esto por 24 horas (86400 segundos)
export const revalidate = 86400;

export const getSchedule = async () => {
    try {
        const schedule: RoundType[] = getScheduleStatic();

        schedule.forEach((event) => {
            if (event.name.includes("PRE-SEASON TESTING")) {
                event.name = event.name.replace("PRE-SEASON TESTING", "Preseason Testing Day");
            }
        });

        return schedule;
    } catch (e) {
        console.error("error fetching schedule", e);
        return null;
    }
};

export default async function Schedule() {
    const schedule = await getSchedule();

    if (!schedule) {
        return (
            <div className="flex h-44 flex-col items-center justify-center">
                <p>Schedule not found</p>
            </div>
        );
    }

    const next = schedule.filter((round) => !round.over)[0];

    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {schedule.map((round, roundI) => (
                <Round nextName={next?.name} round={round} key={`round.${roundI}`} />
            ))}
        </div>
    );
}