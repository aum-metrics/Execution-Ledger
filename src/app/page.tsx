import Link from "next/link";
import { navigation } from "@/lib/navigation";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <div className="space-y-16 py-12">
      <div className="space-y-4 max-w-2xl">

        <p className="text-xl leading-8 text-black font-medium">
          This is not a theory blog. It is a reality-first platform explaining how software is actually built, fails, recovers, and scales.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-600 bg-indigo-50 p-8 sm:p-12 hover:border-indigo-700 transition-colors">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl font-bold text-black mb-4">
            <span className="text-indigo-700">New Feature:</span> The Architect Simulator
          </h2>
          <p className="text-lg text-zinc-800 mb-8 font-medium">
            Test your decision-making skills against high-stakes scenarios.
            Experience the trade-offs of AI adoption, Vendor selection, and Tech Debt management in a gamified environment.
          </p>
          <Link
            href="/consultant"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg transition-colors shadow-sm"
          >
            Start Simulation <ArrowRightIcon className="w-5 h-5 text-white" />
          </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-200/50 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {navigation.map((section) => (
          <div key={section.title} className="relative group p-6 border-2 border-zinc-200 bg-white rounded-lg hover:border-black transition-colors shadow-sm">
            <h3 className="text-lg font-bold leading-6 text-black group-hover:text-indigo-700 transition-colors">
              <Link href={section.href} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {section.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-zinc-600 font-medium">
              {section.items?.length || 0} Topics
            </p>
            <div className="mt-4 flex items-center text-sm font-bold text-zinc-900 group-hover:text-indigo-700">
              Explore <ArrowRightIcon className="ml-1 h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-red-200 bg-red-50 p-8 rounded-lg mt-12">
        <h3 className="text-red-700 font-bold text-sm uppercase tracking-wider mb-4">
          Platform Rules
        </h3>
        <ul className="list-disc list-inside space-y-2 text-zinc-900 font-medium">
          <li>No motivational fluff.</li>
          <li>No textbook definitions.</li>
          <li>No consulting jargon without explanation.</li>
          <li>Every decision has consequences.</li>
        </ul>
      </div>
    </div>
  );
}
