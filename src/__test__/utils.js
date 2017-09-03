export const createCookie = (key, data) => {
    document.cookie = key + "=" + JSON.stringify(data);
}

export const getCookie = key => {
    let re = new RegExp(key + "=([^;]+)");
    let value = re.exec(document.cookie);
    return (value != null) ? JSON.parse(unescape(value[1])) : null;
}
