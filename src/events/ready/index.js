import { Events, EmbedBuilder, ActivityType } from 'discord.js'
import fs from 'fs/promises'


export const event = {
    name: Events.ClientReady,
    once: false
}

export const action = async (c) => {
    console.log(`${c.user.tag}已上線`)
    // const channelId = '858181593412010004'
    const channelId = '1260593983202136176'
    let data
    const fileContent = await fs.readFile('src/commands/love/love.json', 'utf-8')
    data = JSON.parse(fileContent)
    const now = new Date()
    const anniversary = new Date(data.anniversary)
    var timeDiff = Math.abs(now - anniversary)
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    data.Datingdate = diffDays
    try {
        await fs.writeFile('src/commands/love/love.json', JSON.stringify(data, null, 2))
        c.user.setActivity(`在一起第${data.Datingdate}天`, { type: ActivityType.Playing })
    } catch (error) {
        console.error('無法寫入 JSON 文件:', error)
        await ctx.reply('紀錄失敗')
        return
    }
    await fs.writeFile('src/commands/love/love.json', JSON.stringify(data, null, 2))
    setInterval(async () => {
        const now = new Date()
        const nowTime = now.toLocaleTimeString('en-US', { hour12: false })
        const channel = c.channels.cache.get(channelId)
        if (nowTime === '24:00:00') {
            const embed = new EmbedBuilder()
            embed.setTitle('ChihHao❤YUICHI')
                .setColor('#33FF33')
                .addFields(
                    { name: '我的生日', value: '2002/07/20', inline: true },
                    { name: '☀.☁.⛰︎.༄♡.✉', value: '✉.༄♡.⛰︎.☁.☀', inline: true },
                    { name: '她的生日', value: '2005/08/13', inline: true },
                    { name: '交往的日子', value: '2024/06/22', inline: true },
                    { name: '✉.༄♡.⛰︎.☁.☀', value: '☀.☁.⛰︎.༄♡.✉', inline: true },
                )
                .setAuthor({ name: '至昊製作', iconURL: 'https://imgur.com/TURhDUo.jpeg', url: "https://www.instagram.com/chihhao_0720/" })
                .setThumbnail('https://i.imgur.com/llOcNHq.jpeg')
                .setTimestamp()
                .setFooter({ text: 'TADA！' })
            console.log(`今天是${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
            var timeDiff = Math.abs(now - anniversary)
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
            data.Datingdate = diffDays
            try {
                await fs.writeFile('src/commands/love/love.json', JSON.stringify(data, null, 2))
            } catch (error) {
                console.error('無法寫入 JSON 文件:', error)
                await ctx.reply('紀錄失敗')
                return
            }
            embed.addFields({ name: '在一起的天數', value: data.Datingdate.toString(), inline: true },)
            channel.send({ embeds: [embed] })
            c.user.setActivity(`在一起第${diffDays}天`, { type: ActivityType.Playing })
        }

    }, 1000)
}
