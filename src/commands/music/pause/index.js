import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
        .setName('pause')
        .setDescription('暫停音樂')

export const action = async (ctx) => {
    await music.pause(ctx);
};