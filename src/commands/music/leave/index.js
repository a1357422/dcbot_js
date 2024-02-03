import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
        .setName('leave')
        .setDescription('讓機器人離開語音頻道（會清空歌曲隊列）')

export const action = async (ctx) => {
    const allowedChannels = ['860113767669301258','801677178491109427','603122576121659393']; // 替換為您允許的頻道ID
    if (!allowedChannels.includes(ctx.channelId)) {
        await ctx.reply("此指令僅在特定頻道可用。");
        return;
    }
    await music.leave(ctx);
};