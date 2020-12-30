export type ErrorCode =
    | "invalidrequest"
    | "invalidlogin"
    | "missingtoken" //token doesn't exist or wrong.
    | "jsonerror" //invalid json format or missing data.
    | "nouser"
    | "missingargs"
    | "missingtoolid"
    | "missinglti"
    ;

export type ErrorType = { errorcode: ErrorCode, error: string };
