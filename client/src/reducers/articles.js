import { SEARCH_ARTICLES, LOAD_ARTICLES } from '../constants/ActionTypes'


const initialState = {
  searchTerms: "",
  articles: []
}

export default function articles(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      if (action.body) {
        articles = []
        for (let article of action.body) {
          for (let item of article.item) {
            let link = item.link;
            let title = item.title;

            debugger;
            if (item.description.toString().indexOf(link) >= 0) {
              link = "";
              title = "";
            }

            articles.push({
              title: title,
              description: item.description,
              link: link
            });
          }
        }
        return Object.assign({}, state, {
          articles: articles,
          all_articles: articles
        })
      } else {
        return state;
      }

    case SEARCH_ARTICLES:
      let terms = action.searchTerms.split(" ");
      let expressions = terms.map((term) => new RegExp('.*' + term + '.*', 'gi'));

      let articles = state.all_articles.filter(function(val) {
        let matches = expressions.map((re) => re.test(val.title) || re.test(val.description));
        let result = matches.reduce((a, b) => a && b);
        return result
      });

      return Object.assign({}, state, {
        searchTerms: action.searchTerms,
        articles: articles
      })

    default:
      return state
  }
}
