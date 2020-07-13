from nltk.corpus import stopwords
from nltk.probability import FreqDist
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import TweetTokenizer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd
from spacy.matcher import PhraseMatcher
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF
# from collections import Counter
# from nltk import ngrams

analyzer = SentimentIntensityAnalyzer()


class Sentiment:
    def __init__(self, string):
        self.string = string
        self.results = self.calc_sentiment()
        self.comp = self.results['compound']
        self.pos = self.results['pos']
        self.neu = self.results['neu']
        self.neg = self.results['neg']

    def calc_sentiment(self):
        return analyzer.polarity_scores(self.string)


class SentimentReport:
    def __init__(self, filepath):
        self.filepath = filepath
        self.data = pd.read_csv(self.filepath)
        self.df = self.data.copy(deep=True)
        self._pre_process()
        self.get_sentiment()
        self.data_json = self.df.to_json(orient="records")
        self.avg_sent = round(self.df['compound'].mean(), 4)

    def _pre_process(self):
        self.data = pd.read_csv(self.filepath)

    def get_sentiment(self):
        analyzer = SentimentIntensityAnalyzer()
        self.df['scores'] = self.df['message'].apply(
            lambda message: analyzer.polarity_scores(str(message)))
        self.df['compound'] = self.df['scores'].apply(
            lambda score_dict: score_dict['compound'])
        self.df['comp_score'] = self.df['compound'].apply(
            lambda c: 'pos' if c >= 0.05 else ('neg' if c <= -0.05 else 'neu'))


class MatchReport:
    def __init__(self, filepath, phrases):
        self.filepath = filepath
        self.phrases = phrases
        self.data = pd.read_csv(self.filepath)
        self.matches = self.data.copy(deep=True)
        self.get_matches()
        self.num_con = len(self.data)
        self.matches_json = self.matches.to_json(orient="records")

    def get_matches(self):
        nlp = spacy.load('en_core_web_sm')
        matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
        phrase_list = [x.strip() for x in self.phrases.split(',')]
        phrase_patterns = [nlp(text) for text in phrase_list]
        matcher.add('my_match', None, *phrase_patterns)

        msgs = self.matches['message'].tolist()
        for i in range(len(msgs)):
            if len(matcher(nlp(str(msgs[i]).lower()))) == 0:
                self.matches.drop(i, inplace=True)


class FrequencyReport:
    def __init__(self, filepath):
        self.filepath = filepath
        self.data = None
        self._pre_process()
        self.processed = self.data.copy()
        self.get_word_freq()
        self.word_freq_json = self.get_word_freq().to_json(orient="records")
        self.unsubs = self.get_unsubs()
        self.lyft_mentions = self.get_lyft_mentions()
        self.taylor_mentions = self.get_taylor_mentions()
        # self.get_bigram_freq()
        # self.bigram_freq_json = self.get_bigram_freq().to_json()
        # self.get_trigram_freq()
        # self.trigram_freq_json = self.get_trigram_freq().to_json()

    def _pre_process(self):
        file = pd.read_csv(self.filepath)
        # file['message'].replace('', pd.np.nan, inplace=True)
        file.dropna(axis=0, inplace=True)
        txt = file['message'].tolist()
        tknzr = TweetTokenizer()
        tokens = []
        for i in txt:
            if type(i) == str:
                i = i.lower()
            tkn = tknzr.tokenize(i)
            for j in tkn:
                tokens.append(j)
        
        lemmatizer = WordNetLemmatizer()
        lemm_list = []
        for i in tokens:
            lemm = lemmatizer.lemmatize(i, pos="v")
            lemm_list.append(lemm)

        english_stopwords = stopwords.words('english')    
        stops = [x for x in lemm_list if x not in set(english_stopwords)]
        
        punct = [",", ".", "'", "\"", "\'", "!", ";", ";", "?"]
        data = [x for x in stops if x not in set(punct)]
        
        # data = [item for item in stops if len(item) > 2]
        self.data = data

    def get_word_freq(self):
        fdist = FreqDist(self.processed)
        top_100 = fdist.most_common(100)
        return pd.DataFrame(
            top_100, columns=['token', 'count']).head(100)

    def get_unsubs(self):
        return self.data.count('stop') + self.data.count('unsubscribe')

    def get_lyft_mentions(self):
        return self.data.count('lyft')
    
    def get_taylor_mentions(self):
        return self.data.count('taylor')

    # def get_bigram_freq(self):
    #     bigrams = list(ngrams(self.processed, 2))
    #     frequencies = Counter(bigrams)
    #     final = []
    #     for token, count in frequencies.most_common(100):
    #         lister = token, count
    #         final.append(lister)
    #     return pd.DataFrame(
    #         final, columns=['bigram', 'count']).head(20)

    # def get_trigram_freq(self):
    #     trigrams = list(ngrams(self.processed, 3))
    #     frequencies = Counter(trigrams)
    #     final = []
    #     for token, count in frequencies.most_common(100):
    #         lister = token, count
    #         final.append(lister)
    #     return pd.DataFrame(
    #         final, columns=['trigram', 'count']).head(20)


class Nnmf:
    def __init__(self, filepath): 
        self.filepath = filepath
        self.data = pd.read_csv(self.filepath)
        self.train_model()

    def train_model(self):
        tfidf = TfidfVectorizer(max_df=0.95, min_df=2, stop_words='english')
        dtm = tfidf.fit_transform(self.data['message'])
        nmf_model = NMF(n_components=8, random_state=42)
        nmf_model.fit(dtm)