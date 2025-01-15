import dayjs from "dayjs";

/**
 * Interface representing the Team member data structure.
 * @interface TeamMember
 */
export interface TeamMember {
  dates?: any;
  name: string;
  profile_pic?: string | null;
  id: string;
  email?: string;
  start_date?: string | dayjs.Dayjs;
  end_date?: string | dayjs.Dayjs;
  status?: string;
}

export interface Dates {
  start_date: string;
  end_date:string;
}

// Interface of a team member's data
export interface TimeLogged {
  _id: string;
  team_member: string;
  profile_pic?: string | null;
  total_time: number;
  approved_time: number;
  submitted_or_rejected_time: number;
}

export interface TimeLoggedResponse {
  data: TimeLogged[];
  dateRange?: string;
}

/**
 * Interface representing the ProjectTeam data structure.
 * @interface ProjectTeamData
 */
export interface ProjectTeamData {
  id: string;
  projectlogo: string;
  project_id: string;
  projectname: string;
  start_date: string | dayjs.Dayjs;
  end_date: string | dayjs.Dayjs;
  status: string;
  date: string;
  teamsMembers: TeamMember[];
  teamMembers?: TeamMember[];
}