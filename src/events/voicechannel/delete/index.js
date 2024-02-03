import { Events,ChannelType } from 'discord.js'

export const event = {
    name: Events.VoiceStateUpdate,
    once: false
}

export const action = async (oldState, newState) => {
    
    try{
        if (oldState.channel && oldState.channel.type === 2 && oldState.channel.name.includes('臨時頻道')) {
            if (oldState.channel.members.size === 0) {
                try {
                    await oldState.channel.delete();
                } catch (error) {
                }
            }
        }
    }
    catch{

    }
    
}