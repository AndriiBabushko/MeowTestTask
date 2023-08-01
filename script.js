function showContent(contentId) {
    const contents = document.getElementsByClassName('content');
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].id === contentId + '-content') {
            contents[i].style.display = 'block';
        } else {
            contents[i].style.display = 'none';
        }
    }
}
