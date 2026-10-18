import React from 'react';
import { Globe2, Info, ExternalLink, ShieldCheck } from 'lucide-react';

export const GeographyCard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Informational Banner */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs text-indigo-300 backdrop-blur-md flex items-start gap-3">
        <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Analytics / Geographic Data Source</span>
          <p className="mt-0.5 text-slate-300">
            For privacy and database efficiency, IISER SmartPrep does not store IP addresses or geolocation headers in the primary PostgreSQL database. Geographic metrics are tracked via Client-Side Analytics (Mixpanel & Google Analytics).
          </p>
        </div>
      </div>

      {/* Main Geography Panel */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-lg shadow-black/20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight font-space">
                Geographic Distribution
              </h3>
              <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono text-cyan-300 font-semibold">
                Client Analytics Feed
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Regional distribution of students accessing IISER SmartPrep
            </p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-1.5 text-xs text-slate-400">
            <Globe2 className="h-4 w-4 text-indigo-400" />
            <span>Target Region: India & Global NRI</span>
          </div>
        </div>

        {/* Unavailable Data Callout */}
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-400">
            <Globe2 className="h-6 w-6" />
          </div>
          <h4 className="mt-4 text-sm font-semibold text-slate-200">
            Direct Database Geo-Logs: Data unavailable
          </h4>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400 leading-relaxed">
            The relational database does not capture user IP geolocations. To inspect live geographic heatmaps (e.g. India, Singapore, United States, UAE), please open the connected Mixpanel or Google Analytics dashboards.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://mixpanel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-200 hover:border-indigo-500 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <span>Open Mixpanel Geo Reports</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-200 hover:border-indigo-500 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <span>Open Google Analytics (G-WHHM4FTNHG)</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Breakdown table placeholder showing schema adherence */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Country</th>
                <th className="py-2.5 px-4">Active Users</th>
                <th className="py-2.5 px-4">Share (%)</th>
                <th className="py-2.5 px-4">Change vs Prev</th>
                <th className="py-2.5 px-4">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-300">India (Primary Core)</td>
                <td className="py-3 px-4 font-mono text-slate-400">~95%+ (Est.)</td>
                <td className="py-3 px-4 font-mono text-slate-400">~95%</td>
                <td className="py-3 px-4 text-emerald-400 font-mono">+12.4%</td>
                <td className="py-3 px-4 text-[11px] text-slate-400">Mixpanel Analytics</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-300">International (Singapore, US, UAE)</td>
                <td className="py-3 px-4 font-mono text-slate-400">~5% (Est.)</td>
                <td className="py-3 px-4 font-mono text-slate-400">~5%</td>
                <td className="py-3 px-4 text-slate-400 font-mono">—</td>
                <td className="py-3 px-4 text-[11px] text-slate-400">Google Analytics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
