import {Events,EmbedBuilder,ActivityType} from 'discord.js'
import fs from 'fs/promises';


export const event = {
    name: Events.ClientReady,
    once:false
}

export const action = async(c) => {
    console.log(`${c.user.tag}已上線`);
    const channelId = '858256727924801556';
    const embed = new EmbedBuilder()
    let data
    const fileContent = await fs.readFile('src/commands/love/love.json', 'utf-8')
    data = JSON.parse(fileContent)
    c.user.setActivity(`在一起第${data.Datingdate}天`, { type: ActivityType.Playing }); 
    const anniversary = new Date(data.anniversary)
    data.nowday = `${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}`
    await fs.writeFile('src/commands/love/love.json', JSON.stringify(data, null, 2));
    setInterval(async() => {
        const now = new Date();
        const nowTime = now.toLocaleTimeString('en-US', { hour12: false });
        const channel = c.channels.cache.get(channelId);
        if (nowTime === '24:00:00') {
            console.log(`今天是${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`)
            var timeDiff = Math.abs(now - anniversary);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            data.Datingdate = diffDays
            data.nowday = `${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}`
            try {
                await fs.writeFile('src/commands/love/love.json', JSON.stringify(data, null, 2));
            } catch (error) {
                console.error('無法寫入 JSON 文件:', error);
                await ctx.reply('紀錄失敗');
                return;
            }
            embed.setTitle('ChihHao❤YanChih')
            .setColor('#33FF33')
            .setDescription('2021/04/25')
            .addFields(
            {name:'我的生日', value:'2002/07/20',inline: true},
            {name:'💙💛💙💛💙', value:'💙💛💙💛💙',inline: true},
            {name:'她的生日', value:'2001/12/13',inline: true},
            {name:'交往的日子', value:'2021/04/25',inline: true},
            {name:'💛💙💛💙💛', value:'💛💙💛💙💛',inline: true},
            {name:'在一起的天數', value:diffDays.toString(),inline: true},
            )
            .setAuthor({ name: '至昊製作', iconURL: 'https://i.imgur.com/u32rqDT.jpg',url:"https://www.instagram.com/chihhao_0720/" })
            .setThumbnail('https://i.imgur.com/RsSbMM1.jpg')
            .setTimestamp()
            .setFooter({ text: 'TADA！'})
            channel.send({embeds:[embed]})
            c.user.setActivity(`在一起第${diffDays}天`, { type: ActivityType.Playing }); 
        }
        
    }, 1000);
}
