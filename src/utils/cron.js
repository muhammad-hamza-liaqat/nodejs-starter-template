const cron = require("node-cron");

function formatPKTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
    hour12: false,
  }).format(date);
}

function startCronJobs() {
  // runs every 5 minute
  cron
    .schedule("*/5 * * * *", async () => {
      const runStart = new Date();
      console.log(`Run started at ${formatPKTime(runStart)}`);

      let didError = false;
      try {
        // place your cron logic here
        // e.g., await someAsyncWork();
      } catch (err) {
        didError = true;
        console.error(
          `[Cron Job] Error occurred: ${
            err instanceof Error ? err.stack : String(err)
          }`
        );
      } finally {
        const runEnd = new Date();
        const durationMs = runEnd - runStart;
        const status = didError ? "failed" : "succeeded";
        console.log(
          `Run ended at ${formatPKTime(
            runEnd
          )} (duration: ${durationMs}ms) - ${status}`
        );
      }
    })
    .start();
}

module.exports = { startCronJobs };
