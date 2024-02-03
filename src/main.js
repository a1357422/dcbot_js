import { Client, Partials , GatewayIntentBits } from 'discord.js' //引入discord.js套件
import vueinit from '@/core/vue'
import dotenv from 'dotenv' //引入讀取env套件
import {loadCommands,loadEvents} from '@/core/loader'
import {useAppStore} from '@/store/app'

vueinit() //初始化
dotenv.config() //讀取env

const client = new Client({ intents: [GatewayIntentBits.Guilds
                                    ,GatewayIntentBits.GuildMessages
                                    ,GatewayIntentBits.MessageContent
                                    ,GatewayIntentBits.GuildMessageReactions
                                    ,GatewayIntentBits.GuildVoiceStates
                                    ,GatewayIntentBits.GuildMembers
                                ],
                            partials: [Partials.Message
                                , Partials.Channel
                                , Partials.Reaction],
                         }) //創建實體
const appStore = new useAppStore()
appStore.client = client

loadCommands() //讀取指令
loadEvents() //讀取動作

client.login(process.env.TOKEN) //使用env檔中的憑證登入機器人