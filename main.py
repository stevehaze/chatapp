
import os
import json
import jinja2
import urllib
import webapp2

from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import channel

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Author(ndb.Model):
    identity = ndb.StringProperty(indexed=True)
    email = ndb.StringProperty(indexed=False)

class Message(ndb.Model):
    author = ndb.StructuredProperty(Author)
    content = ndb.StringProperty(indexed=False)
    date = ndb.DateTimeProperty(auto_now_add=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('/views/index.html')

        message_query = Message.query()
        messages = message_query.order(Message.date, -Message.date).fetch(25)

        token = channel.create_channel("Steve_1")
        template_values = {
            'user' : users.get_current_user(),
            'token' : token,
            'messages' : messages
        }

        self.response.write(template.render(template_values))

class MessageHandler(webapp2.RequestHandler):

    def post(self):

        message = Message()
        if users.get_current_user():
            user = users.get_current_user()
            message.author = Author(
                    identity=user.user_id(),
                    email=user.email())

        message.content = self.request.get('content')
        message.put()

        result = {
            "author" : message.author.email,
            "content" : message.content
        }

        channel.send_message("Steve_1", json.dumps(result))

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/message', MessageHandler),
], debug=True)
