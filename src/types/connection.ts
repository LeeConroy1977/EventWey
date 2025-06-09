export interface Connection {
  id: number | undefined;
  email: string;
  username?: string;
  password?: string;
  googleId?: string;
  authMethod?: string;
  profileImage?: string | undefined;
  profileBackgroundImage?: string | undefined;
  aboutMe?: string;
  bio?: string;
  tags?: string[];
  connections?: number[];
  groups?: number[];
  events?: number[];
  messages?: number[];
  adminGroups?: number[];
  notifications?: number[];
  viewEventsStatus?: string;
  viewConnectionsStatus?: string;
  viewGroupsStatus?: string;
  viewTagsStatus?: string;
  viewProfileImage?: string;
  viewBioStatus?: string;
  aboutMeStatus?: string;
  role?: string;
}
