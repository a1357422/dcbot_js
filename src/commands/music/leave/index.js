import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
        .setName('leave')
        .setDescription('讓機器人離開語音頻道（會清空歌曲隊列）')

export const action = async (ctx) => {
    await music.leave(ctx);
};