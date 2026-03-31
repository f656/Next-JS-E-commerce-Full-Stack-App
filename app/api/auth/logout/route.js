import { connectDb } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { cookies } from "next/headers";

export async function POST(request){
    try {
        await connectDb();
        const cookieStore = await cookies();
        cookieStore.delete('access_token');
        return response(true,200,"Logged out successfully.");
    } catch (error) {
       return catchError(error)
    }
}