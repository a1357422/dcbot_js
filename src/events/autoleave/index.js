import { Events, ChannelType } from 'discord.js';
import music from '@/commands/music/music'

export const event = {
    name: Events.VoiceStateUpdate,
    once: false
};

export const action = async (oldState, newState) => {
    try {
        const channel = newState.channel || oldState.channel;
        if (!channel || channel.type !== ChannelType.GuildVoice) return;

        const guildId = newState.guild.id;

        // 檢查語音頻道中是否只剩下機器人
        const members = channel.members.filter(member => !member.user.bot);
        if (members.size === 0) {
            await music.leave(guildId)
            // 執行機器人離開語音頻道的操作
            // 請在此處添加您的機器人離開語音頻道的程式碼
        }
    } catch (error) {
        console.error('VoiceStateUpdate event error:', error);
    }
};