import { Events } from 'discord.js'
import fs from 'fs/promises'

export const event = {
    name: Events.GuildMemberAdd,
    once: false
}

export const action = async (member) => {
    let userdata
    const fileContent = await fs.readFile('src/events/level/level.json', 'utf-8')
    userdata = JSON.parse(fileContent)
    try{
        if (!userdata[member.id]) {
            // 如果使用者不在檔案中，將他們加入並設置等級和經驗值為 0
            userdata[member.id] = {
                level: 0,
                exp: 0
            }
            await fs.writeFile('src/events/level/level.json', JSON.stringify(userdata, null, 2))
        }
    }
    catch{
        console.error('無法寫入level.json', error);
    }
}