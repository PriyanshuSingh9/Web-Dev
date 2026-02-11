import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in environment.");
  process.exit(1);
}

const shouldUnsetOld = process.argv.includes("--unset-old");

const run = async () => {
  await mongoose.connect(uri);

  const users = mongoose.connection.collection("users");

  const filter = {
    $or: [
      { cashfreeClientId: { $exists: false }, razorpayId: { $exists: true, $ne: "" } },
      { cashfreeClientSecret: { $exists: false }, razorpaySecret: { $exists: true, $ne: "" } },
    ],
  };

  const cursor = users.find(filter, {
    projection: {
      _id: 1,
      razorpayId: 1,
      razorpaySecret: 1,
      cashfreeClientId: 1,
      cashfreeClientSecret: 1,
    },
  });

  let matched = 0;
  let modified = 0;

  for await (const user of cursor) {
    matched += 1;

    const $set = {};
    if (!user.cashfreeClientId && user.razorpayId) {
      $set.cashfreeClientId = user.razorpayId;
    }
    if (!user.cashfreeClientSecret && user.razorpaySecret) {
      $set.cashfreeClientSecret = user.razorpaySecret;
    }

    if (Object.keys($set).length === 0) continue;

    const update = { $set };
    if (shouldUnsetOld) {
      update.$unset = { razorpayId: "", razorpaySecret: "" };
    }

    const res = await users.updateOne({ _id: user._id }, update);
    if (res.modifiedCount > 0) modified += 1;
  }

  console.log(
    `Migration complete. Matched: ${matched}, Updated: ${modified}, Unset old: ${shouldUnsetOld}`
  );
};

run()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
