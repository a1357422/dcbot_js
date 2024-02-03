import { Events } from 'discord.js'

export const event = {
    name: Events.MessageCreate,
    once: false
}

export const action = async (c) => {
    if (c.author.bot) return
    const date =`${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}`
    if (c.content === '彥芝') {
        await c.channel.send('至昊最愛她了')
    }
    else if (c.content === '至昊') {
        await c.channel.send('彥芝最愛她了')
    }
    else if (c.content === '0425') {
        await c.channel.send('這天是我們交往的紀念日哦！💏👨‍❤️‍👨')
    }
    else if (c.content === '發福跌') {
        await c.channel.send('🎶🎵')
        await c.channel.send('幅跌幅跌升的真美麗')
    }
    else if (c.content === '粗發') {
        await c.channel.send('出取彎 出取彎🎏🎏')
    }
    else if (c.content === '520') {
        if(date == '0520')
            await c.channel.send('寶貝 520快樂 最愛妳了哦💕💕')
        else
            await c.channel.send('寶貝 520！')
    }
    else if (c.content === '521') {
        await c.channel.send('寶貝 想不到521也有吧')
        if(date === '0521')
            await c.channel.send('寶貝 521快樂 最愛妳了哦💕💕')
        else
            await c.channel.send('寶貝 521！')
    }
    else if (c.content === '1213') {
        if(date === '0521')
            await c.channel.send('寶貝 生日跨樂哦 我們要一起過好多生日🍰🎂')
        else
            await c.channel.send('時間還沒到，才不告訴妳我做了什麼😜')
    }
    
}