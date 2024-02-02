import { SlashCommandBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
    .setName('抽')
    .setDescription('抽籤')
    .addStringOption(option =>
        option.setName('items')
            .setDescription('要抽的選項')
            .setRequired(true));

export const action = async (ctx) => {
    const options = ctx.options.getString('items').split(" ");

    await ctx.reply(`所有選項：\n${options.map(option => `- ${option}`).join('\n')}`);
    
    const thinkingMessage = await ctx.channel.send('讓我思考一下！');

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedItem = options[randomIndex];
    
    await thinkingMessage.edit(`想好了！就這個吧：『${selectedItem}』`);
};