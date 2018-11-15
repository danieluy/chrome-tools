
const searchOnFilmAffinityEnItem = chrome.contextMenus.create({
  title: 'Search on FilmAffinity EN',
  contexts: ["selection"],
  onclick: searchOnFilmAffinityEn
});
function searchOnFilmAffinityEn(info, tab) {
  console.log(info.selectionText);
  const formatted = info.selectionText.replace(/\s/g, '+');
  chrome.tabs.create({ url: `https://www.filmaffinity.com/en/search.php?stext=${formatted}` });
}
const searchOnFilmAffinityEsItem = chrome.contextMenus.create({
  title: 'Search on FilmAffinity ES',
  contexts: ["selection"],
  onclick: searchOnFilmAffinityEs
});
function searchOnFilmAffinityEs(info, tab) {
  console.log(info.selectionText);
  const formatted = info.selectionText.replace(/\s/g, '+');
  chrome.tabs.create({ url: `https://www.filmaffinity.com/es/search.php?stext=${formatted}` });
}