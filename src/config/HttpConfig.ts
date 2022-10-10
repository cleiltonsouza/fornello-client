export default class HttpConfig{

    static UriApi():string{

        let uri = "http://localhost:3000";
        if(!process.env.DEV){
            uri = "https://fornello.herokuapp.com"
        }
        return uri;
    }

}
