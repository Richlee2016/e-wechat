const Rxios = require('request-promise-native')
const cheerio = require('cheerio')
const _ = require('lodash')
// 搜索爬取
exports.bookSearch = async q => {
  const url = `https://sou.xanbhx.com/search?siteid=23uscc&q=${encodeURIComponent(q)}`
  const html = await Rxios({ url })
  const $ = cheerio.load(html)
  const dom = $('ul li').get()
  const href = box => {
    const h = box('s2').find('a').attr('href')
    return /.+\/html\/(\d+)\/(\d+)/.test(h) ? [RegExp.$1, RegExp.$2] : h
  }
  return dom.slice(1, dom.length).map(o => {
    const box = s => $(o).find('.' + s)
    return {
      type: box('s1').text(),
      name: box('s2').find('a').text().trim(),
      href: href(box),
      author: box('s4').text(),
      newChapter: box('s3').find('a').text(),
      newChapterHref: box('s3').find('a').attr('href'),
      status: box('s6').text(),
      update: box('s7').text()
    }
  })
}
// 章节爬虫
exports.bookChapter = async (type, chapter) => {
  const html = await Rxios({ url: `https://www.x23us.la/html/${type}/${chapter}` })
  const $ = cheerio.load(html)
  const dom = $('.chapterlist').children().get()
  let capList = []
  dom.forEach(o => {
    let res = {}
    const href = $(o).find('a').attr('href')
    if (o.name === 'dt') {
      res.type = 'dt'
      res.text = $(o).text()
      capList.push(res)
    } else if (o.name === 'dd' && /(\d+)\.html/.test(href)) {
      res.type = 'dd'
      res.text = $(o).find('a').text()
      res.href = $(o).find('a').attr('href').replace(/\.html/, '').trim()
      capList.push(res)
    };
  })
  const author = $('.btitle span em').text()
  return {
    id: chapter,
    name: $('.btitle span h1').text(),
    preid: type,
    author: /作者：([\u4e00-\u9fa5]+)/.test(author) ? RegExp.$1 : author,
    newChapter: $('.stats .fl a').text(),
    newChapterHref: $('.stats .fl a').attr('href'),
    status: $('.stats .fr i').eq(0).text(),
    update: $('.stats .fr i').eq(1).text(),
    context: $('.intro').remove('b').text(),
    chapters: capList
  }
}

// 内容爬取
exports.bookContext = async (type, chapter, id) => {
  const html = await Rxios({ url: `https://www.x23us.la/html/${type}/${chapter}/${id}.html` })
  const $ = cheerio.load(html, { decodeEntities: false })
  return {
    id: id,
    title: $('#BookCon h1').text(),
    context: _.compact($('#content').html().split('<br>').map(o => o.trim()))
  }
}
