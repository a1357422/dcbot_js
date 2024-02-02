import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder().setName('ping').setDescription('查看延遲')

export const action = async (ctx) => {
    const msg = await ctx.reply({
        content: "正在計算延遲......", //設定訊息的內容
        fetchReply: true //告訴API我們將會對這個指令做出進一步的回應
    });
    const ping = msg.createdTimestamp - ctx.createdTimestamp;
    ctx.editReply(`機器人延遲：${ping} ms`) 
}