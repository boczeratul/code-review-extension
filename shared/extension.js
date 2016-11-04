window.Extension = (() => {
    const DEFAULTS = {
        rootUrl: "https://github.agodadev.io/api/v3/",
        oauthToken: "",
        context: "Code Review"
    };

    const Settings = {
        get: name => {
            return localStorage.getItem(name) || DEFAULTS[name];
        },
        set: localStorage.setItem.bind(localStorage),
        remove: localStorage.removeItem.bind(localStorage),
        reset: localStorage.clear.bind(localStorage)
    };

    const Api = {
        setCommitStatus: (status, params) => {
            return new Promise((resolve, reject) => {
                let {org, repo, pull, sha} = params;
                let xhr = new XMLHttpRequest();
                xhr.open('POST', `${Settings.get('rootUrl')}repos/${org}/${repo}/statuses/${sha}`);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization', `token ${Settings.get('oauthToken')}`);
                xhr.send(`{"state": "${status}", "context": "${Settings.get('context')}"}`);
                xhr.onload = resolve;
            });
        },
        getCommitParams: () => {
            return new Promise((resolve, reject) => {
                chrome.tabs.getSelected(function(tab){
                    const regex = /https?\:\/\/[^\/]*github[^\/]*\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/
                    let params = tab.url.match(regex);
                    
                    if (!params) {
                        return reject();
                    }
                    
                    let [fullUrl, org, repo, pull] = params;
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', `${Settings.get('rootUrl')}repos/${org}/${repo}/pulls/${pull}/commits?per_page=100`);
                    xhr.setRequestHeader('Authorization', `token ${Settings.get('oauthToken')}`);
                    xhr.onload = () => {
                        let result = JSON.parse(xhr.responseText);
                        let sha = result[result.length - 1].sha;
                        resolve({org, repo, pull, sha});
                    };
                    xhr.send();
                });
            });
        }
    };

    return {
        Settings,
        Api
    }
})();
