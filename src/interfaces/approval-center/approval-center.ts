export interface TeamMember {
    id: string;
    full_name: string;
    profile_pic?: string;
}

export interface FetchTeamMembersResponse {
    status: boolean;
    message: string;
    data: TeamMember[];
    errors?: Error | null;
}