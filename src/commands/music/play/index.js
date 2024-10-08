import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
    .setName('play')
    .setDescription('播放音樂')
    .addStringOption(option => 
        option.setName('keyword')                          // option name
        .setDescription('提供 音樂名稱 或 網址')  // option 描述
        .setRequired(true)                       // option 是否為必要 (如果為必要，輸入指令時會自動帶入)
    );

export const action = async (ctx) => {
    const allowedChannels = ['791673052592996382','495790074441498626','1257170642009329766','858181593412010004']; // 替換為您允許的頻道ID
    if (!allowedChannels.includes(ctx.channelId)) {
        await ctx.reply("此指令僅在特定頻道可用。");
        return;
    }
    await music.play(ctx);
};