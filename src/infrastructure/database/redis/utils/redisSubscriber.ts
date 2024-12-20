import { count } from "console";
import { RedisClient } from "..";
import { AppError } from "../../../../shared";

export const bootstrapRedisSubscription = () => {
  const redisSubscriber = RedisClient.getSubscriberInstance();

  redisSubscriber.subscribe("newAdminCreated", (error, count) => {
    if (error) {
      throw new AppError(error.message, 400);
    } else {
      console.log(`Subscribed to ${count} channels.`);
    }
  });

  redisSubscriber.subscribe("deleteAdmin", (error, count) => {
    if (error) {
      throw new AppError(error.message, 400);
    } else {
      console.log(`Subscribed to ${count} channels.`);
    }
  });

  redisSubscriber.subscribe("newAdminCreatedSuccess", (error, count) => {});

  redisSubscriber.on("message", (channel, message) => {
    if (channel === "newAdminCreated") {
      const admin = JSON.parse(message);
      // Send email to the user
      console.log("Sending email - Create");
      console.log(admin);
      const redisPublisher = RedisClient.getPublisherInstance();
      redisPublisher.publish(
        "newAdminCreatedSuccess",
        JSON.stringify({ status: "SUCCESS", statusCode: 200, message: "Done" })
      );
    } else if (channel === "deleteAdmin") {
      console.log("Sending email - Delete");
      console.log(message);
    }
  });
};
