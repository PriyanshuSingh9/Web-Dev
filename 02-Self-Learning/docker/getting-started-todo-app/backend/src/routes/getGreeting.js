const GREETING = [
    "Welcome to you todo app",
    "Plan your work ahead",
    "Stay organized and productive",
];

module.exports = async (req, res) => {
    res.send({
        greeting: GREETING[Math.floor(Math.random() * GREETING.length)],
    });
};
