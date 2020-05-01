import os
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd
from spacy.matcher import PhraseMatcher
import spacy

analyzer = SentimentIntensityAnalyzer()


class MatchReport:
    def __init__(self, filepath, phrases):
        self.filepath = filepath
        self.phrases = phrases
        self.data = pd.read_csv(self.filepath, sep='^([^,]+),',
                                engine='python',
                                usecols=['lyft_id', 'message'])
        self.matches = self.data.copy(deep=True)
        self.get_matches()
        self.matches_json = self.matches.to_json()

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


def calc_sentiment(string):
    return analyzer.polarity_scores(string)


def break_camel(string):
    lst = list(string)
    new_lst = []
    for i in lst:
        if i.islower():
            new_lst.append(i)
        else:
            new_lst.append(' ')
            new_lst.append(i)
    return ''.join(new_lst)


def print_100():
    for i in range(1, 101):
        if ((i % 5 == 0) and (i % 3 == 0)):
            print('FizzBuzz')
        elif i % 5 == 0:
            print('Buzz')
        elif i % 3 == 0:
            print('Fizz')
        else:
            print(i)
