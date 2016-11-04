(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const formOauthToken = document.getElementById('oauth_token');
        const formContext = document.getElementById('context');
        const ghSettingsUrl = document.getElementById('gh_link');

        formOauthToken.value = Extension.Settings.get('oauthToken');
        formContext.value = Extension.Settings.get('context');

        formOauthToken.addEventListener('change', () => {
            Extension.Settings.set('oauthToken', formOauthToken.value);
        });

        formContext.addEventListener('change', () => {
            Extension.Settings.set('context', formContext.value);
        });
    });
})();