import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
            .setName('resume')
            .setDescription('恢復播放')

export const action = async (ctx) => {
    await music.resume(ctx);
};