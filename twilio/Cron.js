const cron = require("node-cron");
const moment = require("moment");
const { sendMessage } = require("./Send_sms");
const db = require("../data/dbConfig");

const smsWorker = cron.schedule(
  "00 * * * * *",
  () => {
    console.log("scheduler running");
    db("notifications as n")
      .join("plants as p", "n.plantId", "p.id")
      .join("users as u", "u.id", "p.userId")
      .where({ smsDelivered: false })
      .andWhereBetween("notificationTime", [
        moment().format(),
        moment()
          .add(59, "seconds")
          .format()
      ])
      .select(
        "n.id",
        "u.firstName",
        "p.name",
        "p.location",
        "n.notificationTime",
        "u.phoneNumber"
      )
      .then(notifications => {
        console.log("\n NOTIFICATIONS", notifications);
        if (notifications.length > 0) {
          notifications.forEach(notification => {
            sendMessage(notification);
            db("notifications")
              .where({ id: notification.id })
              .update({ smsDelivered: true })
              .then(updated => console.log("\nUPDATED", updated));
          });
        }
      });
  },
  {
    scheduled: false
  }
);

module.exports = smsWorker;
