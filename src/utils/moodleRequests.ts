import { Axios } from "../config";
import { ICourseData, IUserData, LTI } from "../interfaces";

function pick<T extends object, U extends keyof T>(obj: T, ...paths: U[]): Pick<T, U> {
    const ret = Object.create(null);
    for (const k of paths)
        ret[k] = obj[k];
    return ret;
}




const apiCall = (service: string, ...body: [string, string][]): Promise<any> => new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    const moodleUrl = localStorage.getItem('moodleUrl');

    if (!token || !moodleUrl) reject({ errorcode: 'missingtoken', error: 'טוקן לא קיים' });

    else Axios.post(`${moodleUrl}/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${service}`,
        new URLSearchParams([['wsfunction', service], ['wstoken', token as string], ...body]).toString()
    ).then(({ data }) => {
        if (!data) reject({ errorcode: 'jsonerror', error: "שגיאה בעת קבלת המידע מהשרת" })
        else if (data?.errorcode) reject(data);
        else resolve(data);
    });
});

/**
 * request to get the user information from moodle api.
 * @async
 */
const fetchUser = (): Promise<IUserData> => apiCall("core_webservice_get_site_info")
    .then(data => (pick(data,
        "firstname",
        "lastname",
        "fullname",
        "username",
        "userid",
        "userprivateaccesskey",
        "userpictureurl")));

const fetchCourses = (): Promise<ICourseData[]> => {
    const user: IUserData = JSON.parse(localStorage.getItem('user') ?? "");

    if (!user?.userid) return Promise.reject({ errorcode: 'nouser', error: "לא נמצאו פרטי המשתמש, אנא נסו להתחבר שוב" });

    return apiCall('core_enrol_get_users_courses', ['userid', user.userid])
        .then(data => (data.map((entry: any) => pick(entry,
            "id",
            "idnumber",
            "fullname",
            "shortname",
            "displayname"))
        ));
}
/**
 * Returns an array of activities' id.
 * @param course course id 
 */
const fetchToolids = (course: string): Promise<string[]> => apiCall('mod_lti_get_ltis_by_courses', ['courseids[0]', course]).then(data => {
    const { ltis } = data;
    if (ltis) return (ltis.map((entry: any) => entry.id));
    //TODO: fix rejection of missing toolid
    else Promise.reject({ errorcode: 'missingtoolid', error: 'missing toolid error' });
})

/**
 * Returns an LTI object representing the given toolid
 * @param toolid - the activity's id
 */
const fetchLti = (toolid: string): Promise<LTI> => apiCall('mod_lti_get_tool_launch_data', ['toolid', toolid]).then(data => {
    if (data.parameters as { name: string, value: string }[]) {
        const newParams: Record<string, string> = {};
        for (const { name, value } of data.parameters) newParams[name] = value;
        data.parameters = newParams;
        return (data);
    }
    //TODO: fix the rejection of get LTI
    else Promise.reject({ errorcode: 'missinglti', error: 'missinglti' });
})

export {
    fetchCourses, fetchLti, fetchToolids, fetchUser
}