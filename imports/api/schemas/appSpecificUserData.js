import { SystemNotifications } from '../systemNotifications.js';

export const UserSettingsSchema = new SimpleSchema({
  showOrganizerWelcomeScreen: {
    type: Boolean,
    defaultValue: true,
    optional: true,
    autoform: {
      hidden: true
    }
  },
});

const userPermissionsCanDoBlock = {
  type: Boolean,
  optional: false,
  defaultValue: false,
}

export const UserPermissionsSchema = new SimpleSchema({
  canAssignAndEditUserRoles: _.extend(userPermissionsCanDoBlock, {label: "Может назначать и редактироавть роли пользователей"}),

  canBlockAndUnblockUserProfiles: _.extend(userPermissionsCanDoBlock, {label: "Может блокировать и разблокировать профили пользователей"}),
  canVerifyUserProfiles: _.extend(userPermissionsCanDoBlock, {label: "Может верифицировать профили пользователей"}),
  canDeleteUserProfiles: _.extend(userPermissionsCanDoBlock, {label: "Может удалять профили пользователей"}),

  canViewGeneralStatsAndReports: _.extend(userPermissionsCanDoBlock, {label: "Может просматривать общую статистику и отчеты"}),
  canViewRevenueStatsAndReports: _.extend(userPermissionsCanDoBlock, {label: "Может просматривать статистику и отчеты о заработке сервиса"}),
  canViewParticularOrganizersStats: _.extend(userPermissionsCanDoBlock, {label: "Может просматривать статистику конкретных организаторов"}),
  canViewParticularUserStats: _.extend(userPermissionsCanDoBlock, {label: "Может просматривать статистику конкретных пользователей"}),

  canManageRecommendationSystem: _.extend(userPermissionsCanDoBlock, {label: "Может управлять системой рекомендаций (включая рекомендации на главной странице)"}),

  canWriteArticles: _.extend(userPermissionsCanDoBlock, {label: "Может писать статьи"}),
  canManageOtherWritersArticles: _.extend(userPermissionsCanDoBlock, {label: "Может управлять статьями других писателей"}),
});

export const AppSpecificUserDataSchema = new SimpleSchema({

permissions: {
  type: UserPermissionsSchema,
  optional: true,
  label: "Допуски"
},
systemNotifications: {
  type: [String],
  defaultValue: [
    SystemNotifications.showWelcomeNotification
  ],
},
settings: {
  type: UserSettingsSchema,
  defaultValue: {},
}

});
