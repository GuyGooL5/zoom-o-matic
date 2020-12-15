import { core_webservice_get_site_info, LTIFormJSON, moodle_webservice_error } from "../interfaces";
import LocalStorage from "./LocalStorage";


export default class MoodleRequests {
    private static _rootURL = "https://md.hit.ac.il";
    static getToken(username: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(`${this._rootURL}/login/token.php`, {
                method: 'POST',
                body: `username=${username}&password=${password}&service=moodle_mobile_app`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*'
                }
            }).then(res => res.json()).then(json => {
                if (json.errorcode || !json.token) reject(json);
                else resolve(json.token);
            })
        })
    }


    static apiCall(service: string, ...body: [string, string][]): Promise<any> {
        return new Promise((resolve, reject) => {
            let token = LocalStorage.getToken();
            if (token === null || token === 'null') reject({ errorcode: 'emptytoken' });
            else {
                let msg = new URLSearchParams([['wsfunction', service], ['wstoken', token], ...body]).toString();
                fetch(`${this._rootURL}/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${service}`, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    method: "POST",
                    body: msg
                }).then(res => res.json())
                    .then(json => {
                        if (json)
                            if (json.errorcode) reject(json as moodle_webservice_error);
                            else resolve(json);
                        else reject({ errorcode: 'jsonerror' });
                    })
            }
        })
    }

    static getLTI(toolid: string): Promise<LTIFormJSON> {
        return new Promise((resolve, reject) => {
            this.apiCall('mod_lti_get_tool_launch_data', ['toolid', toolid]).then(json => {
                let params = json.parameters as { name: string, value: string }[];
                if (params) {
                    let newParams: Record<string, string> = {};
                    for (let entry of params) newParams[entry.name] = entry.value;
                    json.parameters = newParams;
                    resolve(json);
                }
                //TODO: fix the rejection of get LTI
                else reject({ errorcode: 'no_lti' });
            }).catch(e => reject(e));
        })
    }
    static getToolIDs(course: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.apiCall('mod_lti_get_ltis_by_courses', ['courseids[0]', course]).then(json => {
                let ltis = json.ltis as { [x: string]: string }[];
                if (ltis) resolve(ltis.map(entry => entry.id));
                //TODO: fix the rejection of get ToolIds
                else reject({ errorcode: 'no_lti2' })
            }).catch(e => reject(e));
        })
    }

    static getUserInfo(): Promise<core_webservice_get_site_info> {
        return new Promise((resolve, reject) => {
            this.apiCall('core_webservice_get_site_info')
                .then(json => {
                    resolve(json);
                }).catch(e => reject(e));
        })
    }
}