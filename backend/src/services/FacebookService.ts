import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { AppDataSource } from "../data-source";
import { User } from  "../entities/User";



passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        callbackURL: process.env.FACEBOOK_REDIRECT_URI!,
        profileFields: ["id", "displayName", "name", "emails", "photos"]
    },
    async (accessToken, refreshToken, profile, cb) => {

        try{

            const userRepo = AppDataSource.getRepository(User); 
            const email = profile.emails?.[0]?.value;
            let user = await userRepo.findOneBy({email});

            if (!user){

                const new_user: Partial<User> = {
                    name: profile.name?.givenName || "",
                    surname: profile.name?.familyName || "",
                    username: email?.split("@")[0] + "_" + profile.id.slice(0,5),
                    email,
                    facebook_id: profile.id,
                    auth_provider: "facebook",
                    is_email_verified: true,
                    profile_photo: profile.photos?.[0]?.value
                };

                user = await userRepo.save(userRepo.create(new_user));

            }else if (user && !user.facebook_id){
                user.facebook_id = profile.id;
                user = await userRepo.save(user);
            }

            return cb(null, user);

        }catch(err){
            return cb(err as Error);
        }

    }
    )
)

export default passport;