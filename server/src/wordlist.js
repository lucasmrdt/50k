const axios = require('axios');

const MAX_CHAR_BY_REQUESTS = 4000;
const BASE_TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';
const translateWords = async (words, from, to) => {
  const text = words.join(';');
  const { data } = await axios.get(
    `${BASE_TRANSLATE_URL}?client=gtx&sl=${from}&tl=${to}&dt=t&q=${text}`
  );
  const translations = data[0];
  return translations.reduce(
    (acc, curr) => ([
      ...acc,
      ...curr[0].replace(/(^ *| *$)/g).split(/; */)
    ]),
    [],
  );
};

const getWordlist = async (cached, url, from, to) => {
  const { data } = await axios.get(url);
  const wordlist = data.split(/\n/).map(word => word.split(' ')[0]);
  const unknownWords = wordlist.filter(word => !cached.has(word));

  const translatedWordlist = [];
  let wordsToTranslate = [];
  let length = 0;
  for (const word in unknownWords) {
    length += word.length;
    if (length > MAX_CHAR_BY_REQUESTS) {
      const translatedWords = await translateWords(wordsToTranslate);
      translatedWordlist.concat(translatedWords);
      wordsToTranslate = [];
      length = 0;
    } else {
      wordsToTranslate.push(word);
    }
  }

  return Promise.all(translatedWordlist);
};

module.exports = async function (app) {
  const { languages, urlPatern, dumpDB } = app.get('wordlist');

  if (!dumpDB) {
    return;
  }

  console.warn('\x1b[33mYou\'re dumping your DB.');

  for (const from of languages) {
    for (const to of languages) {
      if (from === to) continue;

      const service = app.service('en-wordlist');
      if (!service) continue;

      try {
        console.log(`Downloading ${from}/${to}`);
        const url = urlPatern.replace(/%s/g, from);
        const { data } = await service.find({});

        const wordlist = new Set(data.map(({ word }) => word));
        const newWords = await getWordlist(wordlist, url, from, to);
        console.log(newWords);
      } catch(e) {
        console.log(e)
      }
    }
  }
};
