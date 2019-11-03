export default class CardsService {
  loadCards(page = 0, search = '') {
    const url = `https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=30&contains=imageUrl&name=${search}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        return json
      });
  }
}