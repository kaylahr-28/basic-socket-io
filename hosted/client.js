const socket = io();

const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (editBox.value) {
            socket.emit('chat message', editBox.value);
            editBox.value = "";
        }
    });
}

const displayMessage = (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = msg;
    document.getElementById('messages').appendChild(messageDiv);
}

const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');
    const messages = document.getElementById('messages');
    channelSelect.addEventListener('change', () => {
        messages.innerHTML = '';

        switch(channelSelect.value) {
            case 'memes':
                socket.off('general');
                socket.on('memes', displayMessage);
                break;
            default:
                socket.off('memes');
                socket.on('general', displayMessage);
                break;
        }
    });
}

const init = () => {
    handleEditBox();
    socket.on('chat message', displayMessage);
    handleChannelSelect();
};

window.onload = init;