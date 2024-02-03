import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
            .setName('skip')
            .setDescription('跳過這首歌')

export const action = async (ctx) => {
    await music.skip(ctx);
};