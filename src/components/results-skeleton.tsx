"use client";

const Shimmer = () => (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
);

export default function ResultsSkeleton() {
    return (
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-1 space-y-6">
                <div className="sticky top-8 bg-zinc-800 border border-zinc-700 rounded-2xl p-6 overflow-hidden relative">
                    <div className="h-6 w-1/3 bg-zinc-700 rounded-md mb-4" />
                    <div className="aspect-square w-full bg-zinc-700 rounded-lg mb-4" />
                    <div className="h-4 w-1/2 mx-auto bg-zinc-700 rounded-md mb-6" />
                    <div className="h-10 w-full bg-zinc-700 rounded-lg" />
                    <Shimmer />
                </div>
            </div>

            <div className="lg:col-span-2 relative bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-6 overflow-hidden">
                <div className="text-center">
                    <div className="h-8 w-1/2 mx-auto bg-zinc-700 rounded-md" />
                    <div className="h-4 w-1/3 mx-auto bg-zinc-700 rounded-md mt-2 mb-6" />
                    <div className="w-36 h-36 mx-auto bg-zinc-700 rounded-full mb-4" />
                    <div className="h-6 w-1/4 mx-auto bg-zinc-700 rounded-md" />
                </div>

                <div>
                    <div className="h-7 w-2/5 bg-zinc-700 rounded-md mb-4" />
                    <div className="space-y-3">
                        <div className="h-20 w-full bg-zinc-700 rounded-lg" />
                        <div className="h-20 w-full bg-zinc-700 rounded-lg" />
                        <div className="h-20 w-full bg-zinc-700 rounded-lg" />
                    </div>
                </div>
                <Shimmer />
            </div>
        </div>
    );
}