#!/usr/bin/env python

import requests, json, sys, pprint
pp = pprint.PrettyPrinter(indent=4)

class cc:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def get(endpoint):
    url = config["backend"] + endpoint
    r = requests.get(url)
    if r.status_code != 200:
        print(cc.FAIL + ("ERROR: For GET %s received %d response code " % (endpoint, r.status_code)) + str(r.text) + cc.ENDC)
        sys.exit(1)
    return json.loads(r.text)

def put(endpoint):
    url = config["backend"] + endpoint
    r = requests.put(url)
    if r.status_code != 200:
        print(cc.FAIL + ("ERROR: For PUT %s received %d response code " % (endpoint, r.status_code)) + str(r.text) + cc.ENDC)
        sys.exit(1)
    return json.loads(r.text)

def getArticles(articleId=None):
    endpoint = '/articles'
    if articleId is not None:
        endpoint = (endpoint + "/%d") % articleId
    return checkArticles(get(endpoint))

def checkArticles(result):
    if "articles" not in result:
        print(cc.FAIL + "ERROR: GET /articles did not have \"articles\" entry" + cc.ENDC)
        print(result)
        return []
    else:
        return result["articles"]

def addArticle(body):
    r = requests.post(config["backend"] + "/article", json={'text':body})
    return checkArticles( json.loads(r.text) )

def msg(message):
    print(cc.BLUE + message + cc.ENDC)

################################################

if len(sys.argv) < 2:
    print("usage: %s README.json" % sys.argv[0])
    sys.exit(1)

with open(sys.argv[1], 'r') as f:
    config = json.loads(f.read())
    for key in config.keys():
        if config[key].endswith('/'):
            config[key] = (config[key])[:-1]

print(cc.YELLOW + ("Checking for %s site %s" % (config['netid'], config['backend'])) + cc.ENDC)

######################################
# inital GET
r = get("/")
msg("GET /")
pp.pprint(r)

# GET /articles
articles = getArticles()
msg("GET /articles")
pp.pprint(articles)

if len(articles) < 3:
    print(cc.FAIL + ("FAIL: Expected at least 3 articles from GET /articles but found %d " % len(articles)) + cc.ENDC)
else:
    print(cc.GREEN + ("OK: GET /articles returned %d articles, expecting at least 3" % len(articles)) + cc.ENDC)

######################################
# add a new article
body = "Hello World!"
newArticles = addArticle(body)
msg("POST /article -d " + body)
pp.pprint(newArticles)

if len(newArticles) is not 1:
    print(cc.FAIL + ("FAIL: Expected 1 new article added but found %d articles" % len(newArticles)) + cc.ENDC)
else:
    newArticleId = newArticles[0]['_id']
    print(cc.GREEN + ("OK: POST /article returned one new article with id=%d" % newArticleId) + cc.ENDC)
    if newArticles[0]['text'] != body:
        print(cc.FAIL + ("FAIL: Article did not have the correct body message: %s vs %s" % (newArticles[0]['text'], body)) + cc.ENDC)
    else:
        print(cc.GREEN + ("OK: article body was correct") + cc.ENDC)
    ######################################
    # get that new article by itself
    getNewArticle = getArticles(newArticleId)
    msg("GET /articles/%d" % newArticleId)
    pp.pprint(getNewArticle)
    if len(getNewArticle) is not 1:
        print(cc.FAIL + ("FAIL: Expected to get the one article that was added but found %d articles" % len(getNewArticle)) + cc.ENDC)
    else:
        print(cc.GREEN + ("OK: GET /articles/%d got the new article" % newArticleId) + cc.ENDC)
        if getNewArticle[0]['text'] != newArticles[0]['text'] or newArticles[0]['text'] != body:
            print(cc.FAIL + ("FAIL: Article did not have the correct text message: %s" % getNewArticle[0]['text']) + cc.ENDC)
        else:
            print(cc.GREEN + ("OK: article text was correct") + cc.ENDC)

######################################
# confirm that we only added one article
articles2 = getArticles()
msg("GET /articles")
pp.pprint(articles2)
if len(articles2) is not len(articles) + 1:
    print(cc.FAIL + ("FAIL: Expected one new article added but found %d + 1 = %d" % (len(articles), len(articles2))) + cc.ENDC)
else:
    print(cc.GREEN + ("OK: GET /articles returned one additional article") + cc.ENDC)

######################################
print(cc.YELLOW + ('Testing stubs...') + cc.ENDC)
# Stubs
for e in [ "/headlines", "/headlines/"+config['netid'], "/email", "/email/"+config['netid'], "/zipcode", "/zipcode/"+config['netid'], "/avatars", "/avatars/" + config['netid'] ]:
    msg("GET " + e)
    pp.pprint(get(e))
for e in [ "/headline", "/email", "/zipcode", "/avatar" ]:
    msg("PUT " + e)
    pp.pprint(put(e))

## done
print(cc.YELLOW + ('COMPLETE!') + cc.ENDC)

