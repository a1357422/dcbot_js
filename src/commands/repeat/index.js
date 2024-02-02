import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder()
.setName('say')
.setDescription('機器人說')
.addStringOption(option =>
    option.setName('message')
        .setDescription('要說的話')
        .setRequired(true));

export const action = async (ctx) => {
    const message = ctx.options.getString('message');
    if (!message) {
        await ctx.reply('請提供要說的話');
        return;
    }
    await ctx.reply(message);
}