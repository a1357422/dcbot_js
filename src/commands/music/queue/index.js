import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
                .setName('queue')
                .setDescription('查看目前歌曲隊列')

export const action = async (ctx) => {
    await music.nowQueue(ctx);
};