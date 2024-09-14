import { SlashCommandBuilder,EmbedBuilder } from 'discord.js'
import fs from 'fs/promises'

export const command = new SlashCommandBuilder()
    .setName('')
    .setDescription('')
    .addStringOption(option =>
        option.setName('金額')
            .setDescription('記帳的金額(若留空則顯示現在金額)')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('詳細資料')
            .setDescription('記帳的描述(可留空)')
            .setRequired(false))

export const action = async (ctx) => {
    const allowedChannels = ['860113767669301258']; // 替換為您允許的頻道ID
    if (!allowedChannels.includes(ctx.channelId)) {
        await ctx.reply("此指令僅在特定頻道可用。");
        return;
    }
    const money = ctx.options.getString('金額')
    const description = ctx.options.getString('詳細資料')
    const embed = new EmbedBuilder()

    let moneyData
    try {
        const fileContent = await fs.readFile('src/commands/money/money.json', 'utf-8')
        moneyData = JSON.parse(fileContent)
        embed.setTitle('')
        .setColor('#33FF33')
        .addFields(
        {name:'總金額', value:moneyData.Play.toString(),inline: true},
        )
        .setAuthor({ name: '至昊製作', url: 'https://www.instagram.com/chihhao_0720/' })
        // .setThumbnail('https://i.imgur.com/RsSbMM1.jpg')
        .setTimestamp()
        .setFooter({ text: 'TADA！'})
    } catch (error) {
        console.error('無法讀取 JSON 文件:', error)
        await ctx.reply('紀錄失敗')
        return
    }
    if(money){

        moneyData.Play = (moneyData.Play || 0) + parseInt(money)

        try {
            await fs.writeFile('src/commands/money/money.json', JSON.stringify(moneyData, null, 2))
        } catch (error) {
            console.error('無法寫入 JSON 文件:', error)
            await ctx.reply('紀錄失敗')
            return
        }
        embed.setTitle('')
            .setDescription('記帳成功！')
            .setColor('#33FF33')
            .addFields(
            {name:'儲存金額',value:money,inline: true},
            {name:'總金額', value:moneyData.Play.toString(),inline: true},
            )
            .setAuthor({ name: '至昊製作', url: 'https://www.instagram.com/chihhao_0720/' })
            // .setThumbnail('https://i.imgur.com/RsSbMM1.jpg')
            .setTimestamp()
            .setFooter({ text: 'TADA！'})
        if(description){
            embed.addFields({name:'詳細資料',value: description})
        }
    }
    
    
    await ctx.reply({ embeds: [embed] })
}