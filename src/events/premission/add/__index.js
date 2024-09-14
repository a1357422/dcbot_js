import { Events } from 'discord.js'

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
    if (react.message.id !== '1068487502161264720' || user.bot) return
    const member = react.message.guild.members.cache.find(member => member.id === user.id)
    if (!member) return

    if (react.emoji.id === '868107496630411334') {
        const roleToAdd = react.message.guild.roles.cache.find(role => role.id === '1068486595101065266')
        if (roleToAdd) {
            await member.roles.add(roleToAdd)
            user.send(`你已成功加入${roleToAdd.name}`)
        }

    } else if (react.emoji.id === '861203792619634698') {
        const roleToAdd = react.message.guild.roles.cache.find(role => role.id === '723152479415697510')
        if (roleToAdd){
            await member.roles.add(roleToAdd)
            user.send(`你已成功加入${roleToAdd.name}`)
        } 
        
    }
}