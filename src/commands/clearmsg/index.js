import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder()
.setName('cls')
.setDescription('清除訊息')
.addStringOption(option =>
    option.setName('line')
        .setDescription('要清除幾行，若不輸入默認為五行')
        .setRequired(false))

export const action = async (ctx) => {
    let deleteCount = 5

    const lineOption = ctx.options.getString('line')
    if (lineOption && lineOption > 0 && lineOption <= 100) {
        deleteCount = lineOption
    }
    const channel = ctx.channel
    try {
        const messages = await channel.messages.fetch({ limit: deleteCount })
        await channel.bulkDelete(messages)
        await ctx.reply(`成功刪除 ${messages.size} 條訊息。`)
    } catch (error) {
        console.error('刪除訊息時發生錯誤:', error)
        await ctx.reply('刪除訊息時發生錯誤。')
    }
}