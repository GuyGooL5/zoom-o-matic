export default class LocalStorage {

    static getToken(): string | null {
        return localStorage.getItem('token');
    }
    static setToken(token: string | null) {
        if (token !== null) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }

    static addToolIDs(...toolids: string[]) {
        let data = this.getToolIDs();
        if (data) for (let toolid of toolids) data.push(toolid);
        else data = toolids;
        localStorage.setItem('toolids', JSON.stringify(data));
    }
    static getToolIDs(): string[] | null {
        let data = localStorage.getItem('toolids');
        return data == null ? null : JSON.parse(data) as string[];
    }

}