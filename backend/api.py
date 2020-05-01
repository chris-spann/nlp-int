from flask import Flask, request
from utils.nlp_tools import break_camel, calc_sentiment, MatchReport

app = Flask(__name__)


@app.route('/get_sentiment', methods=['GET', 'POST'])
def get_sentiment():
    req = request.get_json()
    text = req['text']
    pos = str(calc_sentiment(text)['pos'])
    comp = str(calc_sentiment(text)['compound'])
    neu = str(calc_sentiment(text)['neu'])
    neg = str(calc_sentiment(text)['neg'])

    return {
        "text": text,
        "searchText": text,
        "comp": comp,
        "pos": pos,
        "neu": neu,
        "neg": neg}


@app.route('/get_matches', methods=['GET', 'POST'])
def get_matches():
    req = request.get_json()
    phrases = str(req['phrases'])
    filepath = req['filepath']
    mr = MatchReport(filepath, phrases)
    return {'matches': mr.matches_json,
            'phrases': phrases}


@app.route('/camel_input', methods=['POST', 'GET'])
def camel_input():
    break_camel()
    return {"sentiment": "test"}
