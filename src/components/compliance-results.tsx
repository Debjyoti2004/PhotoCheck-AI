"use client";

import {
  CheckCircle,
  AlertCircle,
  XCircle,
  RotateCcw,
  Info,
  Flag,
  Printer,
  Lightbulb,
} from "lucide-react";
import type { ComplianceResult } from "@/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CheckItem = ({ check }: { check: ComplianceResult['checks'][0] }) => {
  const statusConfig = {
    pass: {
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
      suggestionBox: (
        <div className="mt-3 flex items-center gap-2 rounded-md bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
          <CheckCircle className="h-4 w-4" />
          <p className="font-medium">No issues detected. Meets requirements.</p>
        </div>
      ),
    },
    warning: {
      icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
      suggestionBox: (
        <div className="mt-3 flex items-start gap-3 rounded-md bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
          <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Suggestion:</p>
            <p className="text-amber-400">{check.suggestion}</p>
          </div>
        </div>
      ),
    },
    fail: {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      suggestionBox: (
        <div className="mt-3 flex items-start gap-3 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">
          <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Suggestion:</p>
            <p className="text-red-400">{check.suggestion}</p>
          </div>
        </div>
      ),
    },
  };

  const currentStatus = statusConfig[check.status];
  const message = check.status === "fail" ? (check.failMessage || check.message) :
    check.status === "warning" ? (check.warningMessage || check.message) :
      check.message;

  return (
    <div className="flex items-start gap-4 rounded-lg bg-zinc-800 p-4 border border-zinc-700">
      <div className="shrink-0">{currentStatus.icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-white">
          {check.category}
        </h4>
        <p className="mt-1 text-gray-400 text-sm">
          <span className="font-medium text-gray-300">Finding: </span>{message}
        </p>

        {currentStatus.suggestionBox}
      </div>
    </div>
  );
};


export default function ComplianceResults({
  result,
  country,
  onReset,
}: ComplianceResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const scoreDefs = {
    pass: { stop1: "#34d399", stop2: "#059669" },
    warning: { stop1: "#fbbF24", stop2: "#d97706" },
    fail: { stop1: "#f87171", stop2: "#dc2626" },
  };

  const scoreColors = result.overallScore >= 80 ? scoreDefs.pass : result.overallScore >= 60 ? scoreDefs.warning : scoreDefs.fail;
  const passedChecks = result.checks.filter((c) => c.status === "pass").length;
  const warningChecks = result.checks.filter(c => c.status === 'warning').length;
  const failedChecks = result.checks.filter(c => c.status === 'fail').length;
  const totalChecks = result.checks.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative p-[1px] bg-gradient-to-br from-blue-500/30 to-zinc-500/30 rounded-2xl overflow-hidden"
    >
      <div className="bg-zinc-900 rounded-[15px] p-6 space-y-8">
        <motion.section variants={itemVariants} className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Compliance Report
          </h2>
          <p className="text-gray-400 mb-6">
            For Passport Photo in <span className="font-semibold">{country.name} {country.flag}</span>
          </p>
          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={scoreColors.stop1} />
                  <stop offset="100%" stopColor={scoreColors.stop2} />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="54" strokeWidth="10" fill="none" className="stroke-zinc-700" />
              <motion.circle
                cx="60" cy="60" r="54" strokeWidth="10" fill="none"
                stroke="url(#scoreGradient)"
                strokeLinecap="round"
                strokeDasharray={339.29}
                initial={{ strokeDashoffset: 339.29 }}
                animate={{ strokeDashoffset: 339.29 * (1 - result.overallScore / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(result.overallScore)}`}>
                {Math.round(result.overallScore)}<span className="text-2xl opacity-75">%</span>
              </span>
              <span className="text-sm font-medium text-gray-400">Score</span>
            </div>
          </div>
          <p className="text-lg text-gray-300">
            {result.overallScore >= 80 ? "Excellent compliance!" : result.overallScore >= 60 ? "Good, with minor issues" : "Needs improvement"}
          </p>
          <div className="mt-6 flex justify-center items-center gap-4 text-sm flex-wrap">
            <div className="bg-emerald-500/10 text-emerald-400 font-semibold px-3 py-1 rounded-full">{passedChecks} Passed</div>
            <div className="bg-amber-500/10 text-amber-400 font-semibold px-3 py-1 rounded-full">{warningChecks} Warnings</div>
            <div className="bg-red-500/10 text-red-400 font-semibold px-3 py-1 rounded-full">{failedChecks} Failed</div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white mb-4">
            Detailed Analysis ({passedChecks}/{totalChecks} Passed)
          </h3>
          <div className="space-y-3">
            {result.checks.map((check, index) => (
              <CheckItem key={index} check={check} />
            ))}
          </div>
        </motion.section>

        {(result.recommendations?.length > 0 || result.countrySpecificNotes?.length > 0) && (
          <motion.section variants={itemVariants} className="space-y-6">
            {result.recommendations?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-3 text-blue-400" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-blue-200">
                      <span className="mr-2 mt-1 text-blue-400">&bull;</span>{rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.countrySpecificNotes?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Flag className="w-5 h-5 mr-3 text-blue-400" />
                  {country.name} Specific Notes
                </h3>
                <ul className="space-y-2">
                  {result.countrySpecificNotes.map((note, index) => (
                    <li key={index} className="flex items-start text-sm text-blue-200">
                      <span className="mr-2 mt-1 text-blue-400">&bull;</span>{note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.section>
        )}

        <motion.section variants={itemVariants}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={onReset} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Check Another
            </Button>
            <Button onClick={() => window.print()} variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Printer className="w-4 h-4 mr-2" />
              Save or Print Report
            </Button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}