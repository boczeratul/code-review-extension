class PopupController {
    constructor() {
        this._initComponents();
        this._bindEvents();

        Extension.Api.getCommitParams()
            .then(this._onValidCommitParams.bind(this));
    }

    _initComponents() {
        this._approveButton = document.getElementById("success");
        this._declineButton = document.getElementById("failure");
    }

    _bindEvents() {
        this._approveButton.addEventListener('click', this._handleClick.bind(this, "success"));
        this._declineButton.addEventListener('click', this._handleClick.bind(this, "failure"));
    }

    _disableComponents() {
        this._approveButton.disabled = true;
        this._declineButton.disabled = true;
    }

    _enableComponents() {
        this._approveButton.disabled = false;
        this._declineButton.disabled = false;
    }

    _handleClick(status) {
        Extension.Api.setCommitStatus(status, this._params).then(window.close);
        document.body.classList.add(status);
        this._disableComponents();
    }

    _onValidCommitParams(params) {
        this._enableComponents();
        this._params = params;
        console.log(params);
    }
}

window.onload = () => {
    window.PC = new PopupController();
    
}