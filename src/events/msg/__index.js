import { Events } from 'discord.js'

export const event = {
    name: Events.MessageCreate,
    once: false
}

export const action = async (c) => {
    if (c.author.bot) return
    const date =`${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}`
    if (c.content === '') {
        await c.channel.send('')
    }
    else if (c.content === '') {
        if(date === '')
            await c.channel.send('')
    }
    
}