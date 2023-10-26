const { bot, truecaller, jidToNum } = require('../lib/index')

bot(
  {
    pattern: 'truecaller ?(.*)',
    fromMe: true,
    desc: 'search number in truecaller',
    type: 'search',
  },
  async (message, match) => {
    match =
      (message.mention[0] && jidToNum(message.mention[0])) ||
      match ||
      (message.reply_message && jidToNum(message.reply_message.jid))
    if (!match) return await message.send(`*Example :* truecaller 919876543210`)

    const res = await truecaller.search(match)

    if (res.message) {
      return await message.send(res.message)
    }
    let msg = ''
    if (res.name) msg += `*Name :* ${res.name}\n`
    if (res.gender) msg += `*Gender :* ${res.gender}\n`
    msg += `*Type :* ${res.numberType}(${res.type})\n`
    msg += `*Carrier :* ${res.carrier}\n`
    if (res.city) msg += `*City :* ${res.city}\n`
    msg += `*DailingCode :* ${res.dialingCode}(${res.countryCode})`
    await message.send(msg)
  }
)
