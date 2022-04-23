const client = require("../index");
const { channelToWatch, allowedFileExtension } = require("../config.json");

client.on("messageCreate", async (message) => {
    if(message.author.bot) return null;

    //Checks if the message is in the watched channel
    if(message.channel.id === channelToWatch) {
        //If no attachments, delete the message
        if(!message.attachments.first()) {
            await message.delete();
        }
        //If an attachment doesn't have the allowed extension
        else if(message.attachments.first().name.split(".").pop() !== allowedFileExtension) {
            await message.delete();
        }
        //If an attachment meets all requirements to be posted, do nothing
        else if(message.attachments.first().contentType && message.attachments.first().name.split(".").pop() === allowedFileExtension) {
            return null;
        }
    }
    //Command Handler
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [ cmd, ...args ] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
