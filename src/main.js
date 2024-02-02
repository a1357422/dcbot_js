import { Client, Events, GatewayIntentBits } from 'discord.js' //引入discord.js套件
import dotenv from 'dotenv' //引入讀取env套件

dotenv.config() //讀取env

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); //創建實體

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN); //使用env檔中的憑證登入機器人