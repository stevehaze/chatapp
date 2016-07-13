(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            Cosmos.edit.UI.bar
    */
    /* -------------------------------------------------------------------- */


    ChatApp.namespace("ChatApp.message");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    ChatApp.message = {

      initialize : function(){

          var self = this;


          $("#submit").click(function(){
              var content = $("#comment").val();
              self.sendMessage(content);
          })

          var channel = new goog.appengine.Channel($("#token").val());

          var handler = {
            'onopen' : function(){},
            'onmessage' : self.onMessage,
            'onerror' : function(){},
            'onclose' : function(){}
          };

          var socket = channel.open(handler);

      },
      sendMessage : function(content){

          $.ajax({
              url : "/message",
              method : "post",
              data : {
                  "content" : content
              },
              success : function(){
              $("#comment").val('');
              },
              failure : function(error){
                  console.log(error);
              }
          });


      },
      onMessage : function(data){

          var message = JSON.parse(data.data);

          $(".messages").append("" + message.author + " :<p> " + message.content + "</p>");


      }
     }

    /* -------------------------------------------------------------------- */
    /*
            Bootstrap
    */
    /* -------------------------------------------------------------------- */

     $(function(){

         ChatApp.message.initialize();

     });


})();
