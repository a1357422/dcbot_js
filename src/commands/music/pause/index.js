import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
        .setName('pause')
        .setDescription('暫停音樂')

export const action = async (ctx) => {
    const allowedChannels = ['791673052592996382','495790074441498626','1257170642009329766']; // 替換為您允許的頻道ID
    if (!allowedChannels.includes(ctx.channelId)) {
        await ctx.reply("此指令僅在特定頻道可用。");
        return;
    }
    await music.pause(ctx);
};