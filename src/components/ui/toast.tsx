import { X, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import clsx from "clsx";

type ToastType = "info" | "warning" | "error";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, type = "info", duration = 5000, onClose }: ToastProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const iconMap = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    error: <X className="w-5 h-5 text-red-500" />,
  };

  const borderClass = {
    info: "border-blue-300 dark:border-blue-700",
    warning: "border-yellow-300 dark:border-yellow-700",
    error: "border-red-300 dark:border-red-700",
  };

  const bgClass = {
    info: "bg-blue-50 dark:bg-blue-900/20",
    warning: "bg-yellow-50 dark:bg-yellow-900/20",
    error: "bg-red-50 dark:bg-red-900/20",
  };

  const textClass = {
    info: "text-blue-800 dark:text-blue-200",
    warning: "text-yellow-800 dark:text-yellow-200",
    error: "text-red-800 dark:text-red-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }} // Changed initial y to -50 for top entry
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }} // Changed exit y to -50 for top exit
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={clsx(
        "flex items-center p-4 rounded-lg shadow-lg max-w-sm w-full",
        "border",
        borderClass[type],
        bgClass[type]
      )}
    >
      <div className="flex-shrink-0 mr-3">{iconMap[type]}</div>
      <div className={clsx("flex-grow text-sm font-medium", textClass[type])}>
        {message}
      </div>
      <button onClick={onClose} className="ml-4 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
        <X className={clsx("w-4 h-4", textClass[type])} />
      </button>
    </motion.div>
  );
};

export default Toast;