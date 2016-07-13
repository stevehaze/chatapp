
Install gem and compass on your system

open cmd and run npm install root of project

run grunt watch

-> get the messages entity in the MainPage class

    tmp_greetings = Greeting.query().fetch()

-> Order the query using the date fields

Heres an example : tmp_greetings = Greeting.query().order(Greeting.date, -Greeting.date).fetch()

-> loop through messages and convert them to a dict using to_dict()

Heres an example :  greetings = []
                    for greeting in tmp_greetings:
                        greetings(greeting.to_dict())


-> Display messages onto the index.html passing messages into the template_values

Heres an example : template_values = {
                        "greetings" : greetings
                    }
                    self.response.write(template.render(template_values))

You should now see messages sent after refreshing page

--------------------------------------------

-> Create a channel in the MainPage class and name channel steve

Heres an example : token = channel.create_channel("channel_1")

-> Pass token into template_values

-> In MessageHandler line 52 send your result to the same channel remember to use steve channel

Heres an example : channel.send_message("channel_1", json.dumps(result))

-> Once this is working I want you to style the app using scss

Let me know if you need any help
