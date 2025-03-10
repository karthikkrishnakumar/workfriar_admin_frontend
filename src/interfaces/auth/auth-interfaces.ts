

interface Data {
    token: string;
}
export interface EmailLoginResponse{
    status: boolean;
    message: string;
    data: Data | null;
}
