import { SlashCommandBuilder,EmbedBuilder } from 'discord.js';
import fs from 'fs/promises';

export const command = new SlashCommandBuilder()
    .setName('戀愛日期')
    .setDescription('顯示戀愛天數')

export const action = async (ctx) => {
    const embed = new EmbedBuilder()
    let date
    const fileContent = await fs.readFile('src/commands/love/love.json', 'utf-8')
    date = JSON.parse(fileContent)
    embed.setTitle('ChihHao❤YanChih')
        .setColor('#33FF33')
        .setDescription('2021/04/25')
        .addFields(
        {name:'我的生日', value:'2002/07/20',inline: true},
        {name:'💙💛💙💛💙', value:'💙💛💙💛💙',inline: true},
        {name:'她的生日', value:'2001/12/13',inline: true},
        {name:'交往的日子', value:'2021/04/25',inline: true},
        {name:'💛💙💛💙💛', value:'💛💙💛💙💛',inline: true},
        {name:'在一起的天數', value:date.Datingdate.toString(),inline: true},
        )
        .setAuthor({ name: '至昊製作', iconURL: 'https://i.imgur.com/u32rqDT.jpg',url:"https://www.instagram.com/chihhao_0720/" })
        .setThumbnail('https://i.imgur.com/RsSbMM1.jpg')
        .setTimestamp()
        .setFooter({ text: 'TADA！'})

    await ctx.reply({ embeds: [embed] });
    
};