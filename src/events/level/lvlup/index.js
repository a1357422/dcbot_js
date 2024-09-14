import { Events,EmbedBuilder } from 'discord.js';
import fs from 'fs/promises'

export const event = {
    name: Events.MessageCreate,
    once: false
}

export const action = async (message) => {
    const embed = new EmbedBuilder()
    try {
        if (!message.guild || message.author.bot) return;

        let userdata
        const fileContent = await fs.readFile('src/events/level/level.json', 'utf-8')
        userdata = JSON.parse(fileContent)
        // 檢查使用者是否在檔案中
        if (!userdata[message.author.id]) {
            // 如果使用者不在檔案中，將他們加入並設置等級和經驗值為 0
            userdata[message.author.id] = {
                level: 1,
                exp: 1
            };
            await fs.writeFile('src/events/level/level.json', JSON.stringify(userdata, null, 2))
        }

        // 增加經驗值
        userdata[message.author.id].exp += 1;

        const exp = userdata[message.author.id].exp;
        const lvl_start = userdata[message.author.id].level;
        const lvl_end = 5 * (Math.pow(2, lvl_start) - 1);
        // 檢查是否需要升級等級
        if (exp >= lvl_end) {
            userdata[message.author.id].level += 1;
            // 寫入更新後的使用者資料到檔案
            await fs.writeFile('src/events/level/level.json', JSON.stringify(userdata, null, 2))
            // 回覆使用者
            embed.setTitle('**升級!**')
            .setDescription(`${message.author.globalName} 升到了 ${userdata[message.author.id].level}等! :fire:`)
            // .setThumbnail('')
            .setTimestamp()
            .setFooter({ text: '至昊製作'})

            await message.reply({ embeds: [embed] })
        }
        else {
            // 寫入更新後的經驗值到檔案
            await fs.writeFile('src/events/level/level.json', JSON.stringify(userdata, null, 2));
        }

    } catch (error) {
        console.error('發生錯誤：', error);
    }
}
