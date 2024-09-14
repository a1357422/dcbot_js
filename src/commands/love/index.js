import { SlashCommandBuilder,EmbedBuilder } from 'discord.js'
import fs from 'fs/promises'

export const command = new SlashCommandBuilder()
    .setName('戀愛日期')
    .setDescription('顯示戀愛天數')

export const action = async (ctx) => {
    const allowedChannels = ['1260593983202136176','858181593412010004']; // 替換為您允許的頻道ID
    if (!allowedChannels.includes(ctx.channelId)) {
        await ctx.reply("此指令僅在特定頻道可用。");
        return;
    }
    const embed = new EmbedBuilder()
    let date
    const fileContent = await fs.readFile('src/commands/love/love.json', 'utf-8')
    date = JSON.parse(fileContent)
    embed.setTitle('ChihHao❤YUICHI')
        .setColor('#33FF33')
        .addFields(
        {name:'我的生日', value:'2002/07/20',inline: true},
        { name: '☀.☁.⛰︎.༄♡.✉', value: '✉.༄♡.⛰︎.☁.☀', inline: true },
        { name: '她的生日', value: '2005/08/13', inline: true },
        { name: '交往的日子', value: '2024/06/22', inline: true },
        { name: '✉.༄♡.⛰︎.☁.☀', value: '☀.☁.⛰︎.༄♡.✉', inline: true },
        { name: '在一起的天數', value: date.Datingdate.toString(), inline: true }
        )
        .setAuthor({ name: '至昊製作',url:"https://www.instagram.com/chihhao_0720/" })
        .setThumbnail('https://i.imgur.com/llOcNHq.jpeg')
        .setTimestamp()
        .setFooter({ text: 'TADA！'})    
    await ctx.reply({ embeds: [embed] })
    
}