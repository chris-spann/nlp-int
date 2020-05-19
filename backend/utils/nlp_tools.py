from collections import Counter
from nltk import ngrams, word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from nltk.stem import PorterStemmer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd
from spacy.matcher import PhraseMatcher
import spacy

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


class MatchReport:
    def __init__(self, filepath, phrases):
        self.filepath = filepath
        self.phrases = phrases
        self.data = pd.read_csv(self.filepath, sep='^([^,]+),',
                                engine='python',
                                usecols=['lyft_id', 'message'])
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
    def __init__(self, filepath, output_method="report"):
        self.filepath = filepath
        self.output_method = output_method
        self.data = None
        self._pre_process()
        self.processed = self.data.copy(deep=True)
        self.get_word_freq()
        self.word_freq_json = self.get_word_freq().to_json()
        self.get_bigram_freq()
        self.word_bigram_json = self.get_bigram_freq().to_json()
        self.get_trigram_freq()
        self.word_trigram_json = self.get_trigram_freq().to_json()

    def _pre_process(self):
        file = pd.read_csv(self.filepath)
        txt = file['message'].to_string()
        tokens = word_tokenize(txt.lower())
        english_stopwords = stopwords.words('english')
        stemmer = PorterStemmer()
        token_list_stemmed = []
        for token in tokens:
            stemmed_token = stemmer.stem(token)
            token_list_stemmed.append(stemmed_token)
        stops = [
            x for x in token_list_stemmed if x not in set(english_stopwords)]
        data = [item for item in stops if len(item) > 2]
        self.data = data

    def get_word_freq(self):
        fdist = FreqDist(self.processed)
        top_100 = fdist.most_common(100)
        return pd.DataFrame(
            top_100, columns=['token', 'count']).head(20)

    def get_bigram_freq(self):
        bigrams = list(ngrams(self.processed, 2))
        frequencies = Counter(bigrams)
        final = []
        for token, count in frequencies.most_common(100):
            lister = token, count
            final.append(lister)
        return pd.DataFrame(
            final, columns=['bigram', 'count']).head(20)

    def get_trigram_freq(self):
        trigrams = list(ngrams(self.processed, 3))
        frequencies = Counter(trigrams)
        final = []
        for token, count in frequencies.most_common(100):
            lister = token, count
            final.append(lister)
        return pd.DataFrame(
            final, columns=['trigram', 'count']).head(20)
