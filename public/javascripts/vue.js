var app = new Vue({
    el: '#app',
    data: {
        posts: [],
        userposttext: "",
        username: "Andrew",
    },
    methods: {
        async getPosts() {
            console.log("requesting posts...");
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
        },
        async makeuserpost() {
            var text = this.userposttext;
            if(text == ""){
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

    },
    created() {
        this.getPosts();
    },
});
