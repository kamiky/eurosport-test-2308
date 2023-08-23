// making sure that dates are in UTC for tests
module.exports = async () => {
  process.env.TZ = "UTC";
};
