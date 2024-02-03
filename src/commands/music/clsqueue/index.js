import { SlashCommandBuilder } from 'discord.js';

import music from '@/commands/music/music'

export const command = new SlashCommandBuilder()
    .setName('clsqueue')
    .setDescription('刪除播放清單中的所有歌曲')
    .addStringOption(option => option.setName('id').setDescription('提供播放清單的 ID 識別碼').setRequired(true))

export const action = async (ctx) => {
    await music.deletePlayList(ctx);
};