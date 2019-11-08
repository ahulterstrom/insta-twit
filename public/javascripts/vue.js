var app = new Vue({
    el: '#app',
    data: {
        posts: [],
        userposttext: "",
        username: "",
        createaccount: false,
        login: false,
        loggedin: false,
        accountcreated: false,
        waiting: false,
        usernameinput: '',
        passwordinput: '',
    },
    methods: {
        createorlog(){
            this.usernameinput = "";
            this.passwordinput = "";
            this.accountcreated = false;
            this.login = false;
            this.createaccount = false;
        },
        showcreateaccount(){
            this.accountcreated = false;
            this.login = false;
            this.createaccount = true;
        },
        showlogin(){
            this.accountcreated = false;
            this.createaccount = false;
            this.login = true;
        },
        async createAccount() {
            if(this.usernameinput == "" || this.passwordinput == ""){
                alert("Please enter both a Username and Password");
                return;
            }
            console.log("creating account");
            var url = "http://cs260.andrewhulterstrom.com:3001/newuser";
            try{
                var response = await axios.post(url,{
                    username: this.usernameinput,
                    password: this.passwordinput,
                });
                if(response.data){
                    this.usernameinput="";
                    this.passwordinput="";
                    this.accountcreated = true;
                    this.createaccount = false;
                }
                else{
                    alert("Sorry, that Username is already taken");
                }
            }
            catch(err){
                console.log("error");
            }
        },
        async checkCredentials() {
            if(this.usernameinput == "" || this.passwordinput == ""){
                alert("Please enter both a Username and Password");
                return;
            }
            console.log("attempting to log in...");
            var url = "http://cs260.andrewhulterstrom.com:3001/login";
            var name = this.usernameinput;
            var pass = this.passwordinput;
            var user={name:name,pass:pass};
            try{
                console.log(name);
                console.log(pass);
                var response = await axios.post(url,{
                    username: name,
                    password: pass
                });
                if(response.data){
                    //Log in success!
                    this.getPosts();
                    let timerId = setInterval(() => this.getPosts(), 5000);
                    setTimeout(() => { clearInterval(timerId); }, 1000000);
                    this.username = name;
                    this.loggedin = true;
                }
                else{
                    alert("Invalid Username and Password");
                }
            }
            catch(err){
                console.log("error");
            }
        },
        async getPosts() {
            if(this.waiting == true){
                console.log("Still waiting for response...");
                return;
            }
            console.log("requesting posts...");
            this.waiting = true;
            var url = "http://cs260.andrewhulterstrom.com:3001/posts";
            try {
                var response = await axios.get(url);
                var data = response.data;
                this.posts = data;
                this.setRelativeTimes();
            }
            catch (err) {
                console.log("Could not get posts");
            }
            this.waiting = false;
        },
        async makeuserpost() {
            var text = this.userposttext;
            if(text == ""){
                alert("Your InstaTwit was empty! Enter some text in the box");
                return;
            }
            var url = "http://cs260.andrewhulterstrom.com:3001/submituserpost";
            try {
                var response = await axios.post(url, {
                    text: text,
                    name: this.username,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                });
                this.userposttext = "";
                this.getPosts();
            }
            catch (err) {
                console.log("error");
            }
        },
        setRelativeTimes(){
            var date;
            for(var i=0;i<this.posts.length;i++){
                this.posts[i].ago = moment(this.posts[i].date, 'MMMM Do YYYY, h:mm:ss a').fromNow();
            }
        }
    },
    computed: {
        remainingchars(){
            var length = this.userposttext.length;
            return (28 - length);
        }
    },
    created() {
        this.getPosts();
    },
});
