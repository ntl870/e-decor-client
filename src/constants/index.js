export const EMAIL = "email";
export const PASSWORD = "password";
export const EMAIL_REGEX =
  /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
export const EMAIL_ERROR = "email is invalid";
export const PASSWORD_ERROR = "password is required";
export const EMPTY_ERROR = "this field is required";
export const EMAIL_SUFFIX_REGEX = /^([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
export const EMAIL_SUFFIX_ERROR = "please enter a valid email suffix !";
export const INVITED_EMAIL_ERROR = "this email is invited before!";
export const WORKING_DAYS_ERROR =
  "please choose number of working days at least 2 days !";
export const WORKSPACE_NAME_ERROR = "this workspace name is already existed ! ";

export const USER = "user";
export const ID = "id";
export const ACTION_STATUS = "status";
export const DATA = "data";
export const SUCCESS = "success";
export const ERROR = "error";
export const BTN_SAVE = "SAVE";
export const BTN_CONFIRM = "CONFIRM";

/* ----------------------- table ----------------------- */
export const STATUS_OPTION = "status";
export const SIZE_OPTION = "size";
export const ASC = "ASC";
export const DESC = "DESC";
export const INITIAL_PAGE = 1;
export const INITIAL_ROWS_PER_PAGE = 5;
export const STATUS = "Status";
export const PENDING = "pending";
export const PROCESSING = "processing";
export const DELIVERED = "delivered";
export const CANCELED = "canceled";
export const SHIPPED = "shipped";
export const STATUSES = [
  // { name: STATUS, value: STATUS },
  { name: "Pending", value: PENDING },
  { name: "Delivered", value: DELIVERED },
  { name: "Processing", value: PROCESSING },
  { name: "Shipped", value: SHIPPED },
  { name: "Canceled", value: CANCELED },
];
export const STATUS_COLORS = [
  "rgb(163 129 161)",
  "rgb(49 142 246)",
  "rgb(72 133 13)",
  "rgb(238 154 28)",
  "rgb(244 45 45)",
];
export const ORDER_STATUS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "canceled",
];

export const IS_ACTIVATED = "isActivate";
export const IS_ARCHIVED = "isArchived";
export const ENABLE = "enable";
export const ARCHIVE = "archive";

/* ----------------------- paths ----------------------- */
export const HOMEPAGE = "/";
export const LOGIN_URL = "/login";
export const WORKSPACES_URL = "/workspaces";
export const DASHBOARD_URL = "/bookings";
export const PROJECTS_URL = "/projects";
export const RESOURCES_URL = "/resources";
export const REPORT_URL = "/report";
export const WORKSPACE_URL = "/workspaces/:id";
export const TEAM_URL = "/team";
export const TEAMS_URL = "/teams";
export const POSITIONS_URL = "/position";
export const IMAGES_URL = "/images/";
export const EMAILS_URL = "/emails";
export const INVITE_URL = "/invited-email";
export const USERS_URL = "/manageUsers";
export const RE_INVITE_URL = "/reinvited";
export const REPORTS_URL = "/report";
export const BOOKINGS_URL = "/bookings";
export const EXPORT_URL = "/export";
export const IMPORT_URL = "/import";

export const VIEWS = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

//
export const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["link", "image"],

    ["clean"],
  ],
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "size",
  "align",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "indent",
  "list",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "formula",
];
