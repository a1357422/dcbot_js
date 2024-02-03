import { SlashCommandBuilder,EmbedBuilder } from 'discord.js'
import fs from 'fs/promises'

export const command = new SlashCommandBuilder()
    .setName('旅遊')
    .setDescription('旅遊基金記帳')
    .addStringOption(option =>
        option.setName('金額')
            .setDescription('記帳的金額(若留空則顯示現在金額)')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('詳細資料')
            .setDescription('記帳的描述(可留空)')
            .setRequired(false))

export const action = async (ctx) => {
    const money = ctx.options.getString('金額')
    const description = ctx.options.getString('詳細資料')
    const embed = new EmbedBuilder()

    let moneyData
    try {
        const fileContent = await fs.readFile('src/commands/money/money.json', 'utf-8')
        moneyData = JSON.parse(fileContent)
        embed.setTitle('旅遊基金')
        .setColor('#33FF33')
        .addFields(
        {name:'旅遊基金總金額', value:moneyData.Play.toString(),inline: true},
        )
        .setAuthor({ name: '至昊製作', iconURL: 'https://i.imgur.com/u32rqDT.jpg', url: 'https://www.instagram.com/chihhao_0720/' })
        .setThumbnail('https://i.imgur.com/RsSbMM1.jpg')
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
        embed.setTitle('旅遊基金')
            .setDescription('記帳成功！')
            .setColor('#33FF33')
            .addFields(
            {name:'儲存金額',value:money,inline: true},
            {name:'旅遊基金總金額', value:moneyData.Play.toString(),inline: true},
            )
            .setAuthor({ name: '至昊製作', iconURL: 'https://i.imgur.com/u32rqDT.jpg', url: 'https://www.instagram.com/chihhao_0720/' })
            .setThumbnail('https://i.imgur.com/RsSbMM1.jpg')
            .setTimestamp()
            .setFooter({ text: 'TADA！'})
        if(description){
            embed.addFields({name:'詳細資料',value: description})
        }
    }
    
    
    await ctx.reply({ embeds: [embed] })
}