import { Events } from 'discord.js'

export const event = {
    name: Events.MessageReactionRemove,
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
    // 確保反應是在正確的消息上，並且用戶不是機器人本身
    if (react.message.id !== '1068487502161264720' || user.bot) return

    // 根據移除的反應移除身分組
    const member = react.message.guild.members.cache.find(member => member.id === user.id)
    if (!member) return

    if (react.emoji.id === '868107496630411334') {
        const roleToRemove = react.message.guild.roles.cache.find(role => role.id === '1068486595101065266')
        if (roleToRemove){
            await member.roles.remove(roleToRemove)
            user.send(`你已成功退出${roleToAdd.name}`)
        } 
        
    } else if (react.emoji.id === '861203792619634698') {
        const roleToRemove = react.message.guild.roles.cache.find(role => role.id === '723152479415697510')
        if (roleToRemove){
            await member.roles.remove(roleToRemove)
            user.send(`你已成功退出${roleToAdd.name}`)
        } 
    }
}
