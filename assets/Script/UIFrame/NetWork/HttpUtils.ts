export default class HttpUtils {

    public static async get(url: string, paramgs?: string) {
        url += '?' + paramgs;
        return new Promise((resolve, reject) => {            
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status == 200) {
                    let respone = xhr.responseText;
                    resolve(respone);
                } else if (xhr.readyState === 4 && xhr.status == 401) {
                    resolve(null);
                }    
            };
            xhr.open('GET', url, true);
            // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            // xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
            // xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
            // xhr.setRequestHeader("Content-Type", "application/json");
            xhr.timeout = 8000;// 8 seconds for timeout

            setTimeout(() => {
                xhr.abort && xhr.abort();
                resolve(null);
            }, 8000);

            xhr.send && xhr.send();    
        });
        
    }
    static post() {

    }
}