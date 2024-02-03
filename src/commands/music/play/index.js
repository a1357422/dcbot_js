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
    await music.play(ctx);
};