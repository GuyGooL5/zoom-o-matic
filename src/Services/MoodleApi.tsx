import { ICourseData, IUserData, LTIFormJSON } from "../interfaces";

function pick<T extends object, U extends keyof T>(obj: T, ...paths: U[]): Pick<T, U> {
    const ret = Object.create(null);
    for (const k of paths)
        ret[k] = obj[k];
    return ret;
}

function apiCall(service: string, ...body: [string, string][]): Promise<any> {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const moodleUrl = localStorage.getItem('moodleUrl');

        if (!token || !moodleUrl) reject({ errorcode: 'missingtoken', error: 'טוקן לא קיים' });

        else fetch(`${moodleUrl}/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${service}`, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }, method: "POST",
            body: new URLSearchParams([['wsfunction', service], ['wstoken', token as string], ...body]).toString()
        }).then(res => res.json()).then(json => {
            if (!json) reject({ errorcode: 'jsonerror', error: "שגיאה בעת קבלת המידע מהשרת" })
            else if (json.errorcode) reject(json);
            else resolve(json);
        });

    })
}


const MoodleApi = {
    getUser: (): Promise<IUserData> => {
        return new Promise((resolve, reject) => {
            apiCall('core_webservice_get_site_info')
                .then(json => resolve(pick(json, "firstname", "lastname", "fullname", "username", "userid", "userprivateaccesskey", "userpictureurl")))
                .catch(reject);
        })
    },
    getCourses: (): Promise<ICourseData[]> => {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('user') ?? "");
            if (!user) reject({ errorcode: 'nouser', error: "לא נמצאו פרטי המשתמש, אנא נסו להתחבר שוב" });
            else apiCall('core_enrol_get_users_courses', ['userid', user.userid])
                .then(json => resolve((json.map((entry: any) => pick(entry, "id", "idnumber", "fullname", "shortname", "displayname")))))
                .catch(reject);
        })
    },
    getToolids: (course: string): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            apiCall('mod_lti_get_ltis_by_courses', ['courseids[0]', course]).then(json => {
                const ltis = json.ltis;
                if (ltis) resolve(ltis.map((entry: any) => entry.id));
                //TODO: fix rejection of missing toolid
                else reject({ errorcode: 'missingtoolid', error: 'missing toolid error' });
            }).catch(reject);
        })
    },
    getLti: (toolid: string): Promise<LTIFormJSON> => {
        return new Promise((resolve, reject) => {
            apiCall('mod_lti_get_tool_launch_data', ['toolid', toolid]).then(json => {
                if (json.parameters as { name: string, value: string }[]) {
                    const newParams: Record<string, string> = {};
                    for (const { name, value } of json.parameters) newParams[name] = value;
                    json.parameters = newParams;
                    resolve(json);
                }
                //TODO: fix the rejection of get LTI
                else reject({ errorcode: 'missinglti', error: 'missinglti' });
            }).catch(reject);
        });
    }
}

export default MoodleApi;