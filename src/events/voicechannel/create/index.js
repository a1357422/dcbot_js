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
    if (react.message.id !== '1257172996733538366' || user.bot) return
    const member = react.message.guild.members.cache.find(member => member.id === user.id)
    if (!member) return
    let userName = user.globalName
    if (userName == null)
    userName = user.username
    if (react.emoji.id === '802589433894928464') {
        const newChannel = await react.message.guild.channels.create({
            name: `${userName}的臨時頻道`,
            type: ChannelType.GuildVoice,
            parent: '495790074441498627',
            userLimit: 4,
          });

        try {
            await member.voice.setChannel(newChannel);
            console.log(`將使用者 ${userName} 加入新頻道 ${newChannel.name}`);
        } catch (error) {
            user.send(`請先加入一個語音頻道`)
            await newChannel.delete()
            await react.users.remove(user.id)
        }
    }
}