const request = require('request');
const cheerio = require('cheerio');

const bbcgf = (url, req, res) => {

  request(url, (err, response, body) => {

    if(err) return res.status(500).send({ error: "There was a  network issue. Please make sure you are connected to the internet"});

    const $ = cheerio.load(body);
    const title = $('.recipe-header__title').text();
    let ingredients = '';
    let method = '';

    if (!title){
      return res.status(422).send({ error: 'Something went wrong. Please make sure the url is complete'})
    }

    $('.ingredients-list__item').each((index, element) => {
        if ($(element).children().first().hasClass('ingredients-list__glossary-link')) {
          const prev = $(element).children().first()['0'].prev ? $(element).children().first()['0'].prev.data : '';
          const middle = $(element).children().html()
          const next = $(element).children().first()['0'].next.type === 'text' ? $(element).children().first()['0'].next.data : '';

          ingredients += prev + middle + next + '\n';
        }
        else ingredients[index] = $(element).html();
    });

    $('.method__item').each((index, element) => {
      method += $(element).children().first().text() + '\n\n';
    })

    const imageUrl = `http:${$('.img-container').children().first().attr('src')}`;
    const tags='';

    const scrapedRecipe = {
      title,
      ingredients,
      method,
      imageUrl,
      tags
    }
    
    res.status(200).send(scrapedRecipe);
  });
}

module.exports = bbcgf;
