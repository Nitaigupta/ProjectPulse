import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Project Pulse
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            The heartbeat of your company's projects. Streamline workflows,
            track progress, and keep everyone in sync.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="border-2 border-blue-500/60 rounded-3xl p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                Task Management
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Create, assign, and track tasks effortlessly. Keep your team
                aligned with intuitive task boards and real-time updates.
              </p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="border-2 border-blue-500/60 rounded-3xl p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                Progress Tracking
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Monitor project milestones with powerful analytics. Visualize
                progress and make data-driven decisions instantly.
              </p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="border-2 border-blue-500/60 rounded-3xl p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                Team Collaboration
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Foster seamless communication across teams. Share files,
                comments, and updates in one centralized hub.
              </p>
            </div>
          </div>
        </div>

        <div className="border-2 border-blue-500/60 rounded-3xl p-12 bg-linear-to-br from-white/70 to-green-50/70 dark:from-slate-800/70 dark:to-emerald-900/30 backdrop-blur-sm shadow-2xl max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Join hundreds of companies already managing their projects with
              Project Pulse. Experience the difference today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page; page;
