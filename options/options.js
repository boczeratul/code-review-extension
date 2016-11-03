(() => {
    'use strict';

    function normalizeRoot(url) {
        if (!/^https?:\/\//.test(url)) {
            // assume it is https
            url = `https://${url}`;
        }

        if (!/\/$/.test(url)) {
            url += '/';
        }

        return url;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const formRootUrl = document.getElementById('root_url');
        const formOauthToken = document.getElementById('oauth_token');
        const formContext = document.getElementById('context');
        const ghSettingsUrl = document.getElementById('gh_link');

        formRootUrl.value = Extension.Settings.get('rootUrl');
        formOauthToken.value = Extension.Settings.get('oauthToken');
        formContext.value = Extension.Settings.get('context');

        formRootUrl.addEventListener('change', () => {
            let url = normalizeRoot(formRootUrl.value);

            const urlSettings = `${url}settings/tokens/new?scopes=repo:status`;

            // case of url is empty: set to default
            if (url === normalizeRoot('')) {
                Extension.Settings.remove('rootUrl');
                url = Extension.Settings.get('rootUrl');
            }

            Extension.Settings.set('rootUrl', url);
            ghSettingsUrl.href = urlSettings;
        });

        formOauthToken.addEventListener('change', () => {
            Extension.Settings.set('oauthToken', formOauthToken.value);
        });

        formContext.addEventListener('change', () => {
            Extension.Settings.set('context', formContext.value);
        });
    });
})();