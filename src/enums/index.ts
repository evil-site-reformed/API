export enum PermissionsEnum {
    None = 0,
    ALL = 1 << 0,
    INVITES_GENERATE_DELETE = 1 << 1,
    INVITES_VIEW = 1 << 2,
    INVITES_ALL = 1 << 3,
    USER_BAN_UNBAN = 1 << 4,
    BADGES_GRANT_REMOVE = 1 << 5,
    BADGES_CREATE_REMOVE = 1 << 6,
    BADGES_ALL = 1 << 7,
    PREMIUM = 1 << 8,
    BANNED = 1 << 9,
    VERIFIED = 1 << 10
}
