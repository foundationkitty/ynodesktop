const { Client } = require("@xhayper/discord-rpc");
const { parseGameName } = require("./utils");

// Initialize the Discord RPC client
const client = new Client({
  clientId: "1311371561416265738",
});

// Function to update Discord Rich Presence
async function updateRichPresence(currentURL) {
  let gameName = parseGameName(currentURL);
  if (!gameName) {
    try {
      await client.user?.setActivity({
        largeImageKey: "yno-logo",
        largeImageText: "Yume Nikki Online Project",
        state: "Choosing a door...",
        instance: false, // Instance type
        buttons: [
            {
                label: "Play YNOproject",
                url: "https://ynoproject.net/", // Button URL
            },
        ]
      });
    } catch (error) {
      console.error("Failed to update rich presence:", error);
    }
    return;
  }

  try {
    await client.user?.setActivity({
      largeImageKey: "", // we need to find some good source of icons, I don't wanna upload them manually to discord portal like it was done before
      largeImageText: "Yume Nikki Online Project",
      smallImageKey: `https://ynoproject.net/images/door_${gameName}.gif`,
      smallImageText: "YNOProject",
      details: `Dreaming on ${gameName}...`,
      state: "Disconnected",
      instance: false, // Instance type
      buttons: [
          {
              label: "Play YNOproject",
              url: "https://ynoproject.net/", // Button URL
          },
      ]
    });
  } catch (error) {
    console.error("Failed to update rich presence:", error);
  }
}

// Connect and start the Discord RPC client
async function connectDiscordRpc() {
  client.on("ready", () => {
    console.log("Discord Rich Presence connected!");
  });

  try {
    await client.login();
  } catch (error) {
    console.error("Failed to connect Discord RPC:", error);
  }
}

// Export the functions and client
module.exports = { updateRichPresence, connectDiscordRpc, client };
