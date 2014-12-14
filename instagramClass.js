    /**
    Author erick, based on http://potomak.github.com/jquery-instagram
    **/
    //create instagram class and its properties
    function InstagramClass(){
      //set your config preferences here
      this.accessToken=null;
      this.clientId=null;
      this.count=null;
      this.url=null;
      this.hash=null;
      this.userId=null;
      this.location=null;
      this.search=null;
    }
    //this method get the basic user information
    InstagramClass.prototype.get_user_data=function(){
      //first check for accestoken and client id
      if (this.accessToken == null && this.userId == null) {
        throw 'You must provide an access token or an user id';
      }
      //set the basic data
      var data={access_token:this.accessToken,client_id:this.clientId,count:1};
      //set the url to get user data information
      var url=this.url+'/users/'+this.userId;
      //return an object with url and data to sent to the server
      return {url,data};
    }
    //this metod draw user information
    InstagramClass.prototype.draw_user_data=function(response){
      var feedHTML = '';
      feedHTML += '<img class="userprofileimg" src="' + response.data.profile_picture + '">';
      feedHTML += '<span class="username">' + response.data.username + '</span>';
      feedHTML += '<span class="followers">Seguidores: ' + response.data.counts.followed_by + '</span>';
      feedHTML += '<span class="frase">Síguenos y envíanos tus fotos con el hashtag <span>#ViveExpoinmobiliaria</span></span>';
      $('.instagram.user').append(feedHTML);
    }
    //return a promise using url and data provided
    InstagramClass.prototype.get_promise=function(data){
      return $.ajax({dataType:"jsonp",url:data.url,data:data.data});
    }
    //perform the process that we need
    InstagramClass.prototype.do_process=function(){
      //save the context
      var self=this;
      //get user information
      var data=this.get_user_data();
      //get the promise to do the request
      var userPromise=this.get_promise(data);

      //resolve user's promise
      Promise.resolve(userPromise)
      .then(function(response){
        self.draw_user_data(response)
      });
    }