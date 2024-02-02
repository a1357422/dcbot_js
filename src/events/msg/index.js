import { Events } from 'discord.js';

export const event = {
    name: Events.MessageCreate,
    once: false
};

export const action = async (c) => {
    if (c.author.bot) return;
    if (c.content === '彥芝') {
        await c.channel.send('至昊最愛她了');
    }
    else if (c.content === '至昊') {
        await c.channel.send('彥芝最愛她了');
    }
    else if (c.content === '0425') {
        await c.channel.send('這天是我們交往的紀念日哦！💏👨‍❤️‍👨');
    }
    else if (c.content === '發福跌') {
        await c.channel.send('🎶🎵');
        await c.channel.send('幅跌幅跌升的真美麗');
    }
    else if (c.content === '粗發') {
        await c.channel.send('出取彎 出取彎🎏🎏');
    }
    
};