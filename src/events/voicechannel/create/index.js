import { Events,ChannelType } from 'discord.js'

export const event = {
    name: Events.MessageReactionAdd,
    once: false
}

export const action = async (react,user) => {
    if (react.partial) {
		try {
			await react.fetch()
		} catch (error) {
			console.error('出了問題！', error)
			return
		}
	}
    if (react.message.id !== '1068796312599941140' || user.bot) return
    const member = react.message.guild.members.cache.find(member => member.id === user.id)
    if (!member) return

    if (react.emoji.id === '1087761843071754311') {
        const newChannel = await react.message.guild.channels.create({
            name: `${user.username}的臨時頻道`,
            type: ChannelType.GuildVoice,
            parent: '1203200036628996096',
            userLimit: 4,
          });

        try {
            await member.voice.setChannel(newChannel);
            console.log(`將使用者 ${user.username} 加入新頻道 ${newChannel.name}`);
        } catch (error) {
            user.send(`請先加入一個語音頻道`)
            await newChannel.delete()
        }
    }
}