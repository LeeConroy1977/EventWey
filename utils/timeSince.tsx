export const timeSince = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);

  const time = then.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const isToday = now.toDateString() === then.toDateString();
  if (isToday) {
    return `${time}  Today`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === then.toDateString();
  if (isYesterday) {
    return `${time}  Yesterday`;
  }

  const date = then.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${time}  ${date}`;
};
