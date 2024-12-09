export interface TeamMember {
    id: string;
    name: string;
    avatar?: string;
}

async function fetchTeamMembers(setTeamMemebers:(members:TeamMember[]) =>void):Promise<void>{
    try{
        const response = {
            status: true,
            message: 'Team members fetched successfully',
            data: [
                {id: '1', name: 'John Doe', avatar:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'},
                {id: '2', name: 'Jane Smith'},
                {id: '3', name: 'Michael Johnson'},
            ]   
        }

        setTeamMemebers(response.data)
    }catch(err){
        console.error('Error fetching team members:', err);
    }
}

export {fetchTeamMembers};