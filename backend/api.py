from flask import Flask, request
from utils.nlp_tools import Sentiment, SentimentReport, MatchReport, FrequencyReport

app = Flask(__name__)


@app.route('/get_sentiment', methods=['GET', 'POST'])
def get_sentiment():
    req = request.get_json()
    text = req['text']
    sent = Sentiment(text)
    return {
        "text": text,
        "comp": sent.comp,
        "pos": sent.pos,
        "neu": sent.neu,
        "neg": sent.neg}


@app.route('/get_sentiment_report', methods=['GET', 'POST'])
def get_report():
    req = request.get_json()
    filepath = req['filepath']
    sr = SentimentReport(filepath)
    return {
        'sents': sr.data_json,
        'avgSent': sr.avg_sent}


@app.route('/get_matches', methods=['GET', 'POST'])
def get_matches():
    req = request.get_json()
    phrases = req['phrases']
    filepath = req['filepath']
    mr = MatchReport(filepath, phrases)
    return {'matches': mr.matches_json,
            'phrases': phrases,
            'numCon': mr.num_con}


@app.route('/get_freq', methods=['POST', 'GET'])
def get_freq():
    req = request.get_json()
    filepath = req['filepath']
    fr = FrequencyReport(filepath)
    return {'wordFreq': fr.word_freq_json,
            'unsubs': fr.unsubs,
            'lyftMentions': fr.lyft_mentions,
            'taylorMentions': fr.taylor_mentions
            }
