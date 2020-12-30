export interface LTIFormJSON {
    endpoint: "https://applications.zoom.us/lti/rich";
    parameters: {
        [T in
        "oauth_version" |
        "oauth_nonce" |
        "oauth_timestamp" |
        "oauth_consumer_key" |
        "user_id" |
        "lis_person_sourcedid" |
        "roles" |
        "context_id" |
        "context_label" |
        "context_title" |
        "resource_link_title" |
        "resource_link_description" |
        "resource_link_id" |
        "context_type" |
        "lis_course_section_sourcedid" |
        "lis_person_name_given" |
        "lis_person_name_family" |
        "lis_person_name_full" |
        "ext_user_username" |
        "lis_person_contact_email_primary" |
        "launch_presentation_locale" |
        "ext_lms" |
        "tool_consumer_info_product_family_code" |
        "tool_consumer_info_version" |
        "oauth_callback" |
        "lti_version" |
        "lti_message_type" |
        "tool_consumer_instance_guid" |
        "tool_consumer_instance_name" |
        "tool_consumer_instance_description" |
        "launch_presentation_document_target" |
        "launch_presentation_return_url" |
        "oauth_signature_method" |
        "oauth_signature"
        ]: string;
    };
    warnings: [];
}


export interface core_webservice_get_site_info {
    firstname: string;
    fullname: string;
    lang: string;
    lastname: string;
    sitecalendartype: string;
    siteid: number;
    sitename: string;
    siteurl: string;
    theme: string;
    uploadfiles: number;
    usercalendartype: string;
    usercanmanageownfiles: boolean;
    userhomepage: number;
    userid: string;
    userissiteadmin: boolean;
    usermaxuploadfilesize: number;
    username: string;
    userpictureurl: string;
    userprivateaccesskey: string;
    userquota: number;
}

export interface core_enrol_get_users_courses {
    [i: number]: {
        id: number;
        shortname: string;
        fullname: string;
        displayname: string;
        enrolledusercount: number;
        idnumber: string;
        visible: number;
        summary: "";
        summaryformat: number;
        format: string;
        showgrades: boolean;
        lang: string;
        enablecompletion: boolean;
        completionhascriteria: boolean;
        completionusertracked: boolean;
        category: number;
        progress: any |
        null;
        completed: any |
        null;
        startdate: number;
        enddate: number;
        marker: number;
        lastaccess: any |
        null;
        isfavourite: boolean;
        hidden: boolean;
        overviewfiles: [];
    }
}




export interface moodle_webservice_error {
    errorcode: string;
    exception: string;
    message: string;
}





export interface IUserData {
    userid: string;
    fullname: string;
    username: string;
    lastname: string;
    firstname: string;
    userpictureurl: string;
    userprivateaccesskey: string;
}

export interface ICourseData {
    id: string;
    idnumber: string;
    fullname: string;
    shortname: string;
    displayname: string;
}