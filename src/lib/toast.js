// Simple toast utility using inline DOM notifications
// Can be replaced with a library like react-hot-toast later

const TOAST_DURATION = 3000;

function show(message, type = "info") {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-4 z-50 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 animate-slide-in`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100px)";
    setTimeout(() => toast.remove(), 300);
  }, TOAST_DURATION);
}

export const toast = {
  success: (msg) => show(msg, "success"),
  error: (msg) => show(msg, "error"),
  info: (msg) => show(msg, "info"),
  warning: (msg) => show(msg, "warning"),
};
