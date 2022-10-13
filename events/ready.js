module.exports = {
  name: "ready",
  once: true,
  execute(c) {
    console.log(`Logged in as ${c.user.username}`);
  },
};
