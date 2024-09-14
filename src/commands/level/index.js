import { SlashCommandBuilder,EmbedBuilder } from 'discord.js'
import fs from 'fs/promises'

export const command = new SlashCommandBuilder()
.setName('lvl')
.setDescription('查看等級')
.addStringOption(option =>
    option.setName('who')
        .setDescription('要查看誰的等級，若不輸入默認為自己')
        .setRequired(false))

export const action = async (ctx) => {
    const embed = new EmbedBuilder()
    try {
        const guild = ctx.guild;
        const user = ctx.user;

        // 解析參數，確定要查看的使用者
        const targetUser = ctx.options.getString('who');
        let userId;
        let userName;
        if (targetUser) {
            // 如果指定了要查看的使用者，則從標記中解析出使用者ID
            const mentionRegex = /<@!?(\d+)>/;
            const match = targetUser.match(mentionRegex);
            if (match) {
                userId = match[1];
            } else {
                // 如果參數不是標記，則視為使用者名稱，尋找伺服器中對應的成員
                const member = await guild.members.fetch({ query: targetUser, limit: 1 });
                if (member.size > 0) {
                    userId = member.first().user.id;
                } else {
                    // 如果找不到對應的成員，回覆訊息給使用者
                    ctx.reply('找不到指定的成員，請確認輸入的是正確的成員名稱或標記。');
                    return;
                }
            }
        } else {
            // 如果未指定要查看的使用者，則默認為執行指令的使用者
            userId = user.id;
        }
        userName = guild.members.cache.get(userId).user.globalName
        if (userName == null)
        userName = guild.members.cache.get(userId).user.username
        // 讀取使用者資料
        const userData = JSON.parse(await fs.readFile('src/events/level/level.json', 'utf-8'));

        // 檢查使用者是否在檔案中
        if (!userData[userId]) {
            ctx.reply('該使用者尚未註冊等級，可能是因為他們還沒有參與聊天。');
            return;
        }

        // 獲取使用者的等級和經驗值
        const level = userData[userId].level;
        const exp = userData[userId].exp;
        // 回覆使用者等級信息
        embed.setTitle(`**${userName} 等級 ${level}!**`)
            .setDescription(':fire:')
            // .setThumbnail('https://i.imgur.com/RsSbMM1.jpg')
            .setTimestamp()
            .setFooter({ text: '至昊製作'})

        await ctx.reply({ embeds: [embed] })

    } catch (error) {
        console.error('發生錯誤：', error);
        ctx.reply('執行指令時發生錯誤。');
    }
}