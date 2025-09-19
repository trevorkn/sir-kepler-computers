/* eslint-env node */
/* eslint-disable no-undef */
const { logger } = require("firebase-functions");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.markInactiveUsers = onSchedule(
  {
    schedule: "0 0 1 * *", // 00:00 on the 1st of every month
    timeZone: "Africa/Nairobi",
  },
  async () => {
    const now = Date.now();
    const threshold = 90 * 24 * 60 * 60 * 1000;
    const batchSize = 500;

    const usersSnapshot = await db.collection("users").get();
    let batch = db.batch();
    let count = 0;
    let updatedUsers = 0;
    const batchCommits = [];

    usersSnapshot.forEach((doc) => {
      const user = doc.data();

      if (user.role === "admin") return;

      if (
        user.lastLogin instanceof admin.firestore.Timestamp &&
        now - user.lastLogin.toMillis() > threshold
      ) {
        batch.update(doc.ref, {
          isActive: false,
          cart: [],
          favorites: [],
          recentlyViewed: [],
        });
        updatedUsers++;
        count++;

        if (count === batchSize) {
          batchCommits.push(batch.commit());
          batch = db.batch();
          count = 0;
        }
      }
    });

    if (count > 0) batchCommits.push(batch.commit());
    await Promise.all(batchCommits);

    logger.info(`${updatedUsers} inactive users updated successfully`);
  }
);
