const client = require("../index");

client.on("ready", () => {
    client.startingLogger(`${client.user.tag} is online!`);
});
