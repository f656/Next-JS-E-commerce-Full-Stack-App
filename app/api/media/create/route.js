import { connectDb } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";

export async function POST(request){
    const payload = await request.json();
    try {
        const auth = await isAuthenticated('admin');
        if(!auth.isAuth){
            return response(false,403,'Unauthorized access');
        }

        await connectDb();
        const newMedia = await MediaModel.insertMany(payload)
        return response(true,200,'Media uploaded successfully',newMedia);
    } catch (error) {

        if(payload && payload.length > 0){
            const publicIds = payload.map(data => data.public_id);
            //delete uploaded media from cloudinary in case of error
            try {
                await cloudinary.api.delete_resources(publicIds)
            } catch (deleteError) {
                error.cloudinary = deleteError
            }
        }
        return catchError(error);
    }
}