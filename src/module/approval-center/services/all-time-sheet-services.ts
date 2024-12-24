import { FetchTeamMembersResponse } from "@/interfaces/approval-center/approval-center";
import http from "@/utils/http";

export default function UseApprovalCenterServices() {
    
    const fetchTeamMembers = async ():Promise<FetchTeamMembersResponse> => {
        try{
            const { body } = await http().post("/api/admin/teammemberswithtimesheet");
            return {
                status: body.status,
                message: body.message,
                data: body.data
            }
        }catch(error){
            console.error(error)
            throw error;
        }
    }


    return {
        fetchTeamMembers
    }
}


