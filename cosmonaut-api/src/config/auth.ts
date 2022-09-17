import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import { Strategy as GithubStrategy } from "passport-github";
import { pg } from "@d3lab/db";
import { PassportProfile } from "@d3lab/types";
import { makeLessonPicturePath } from "@d3lab/utils";

const oauth = process.env["OAUTH_REDIRECT"];
const START_LESSON = 0;
const START_CHAPTER = 1;
const INIT_STATUS = "start";
const PG = pg.PgSingle.getInstance();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
            callbackURL:
                oauth !== undefined
                    ? `${oauth}/auth/oauth2/redirect/google`
                    : "/auth/oauth2/redirect/google",
            scope: ["profile"],
        },
        async function verify(
            issuer: string,
            profile: PassportProfile,
            cb: any
        ) {
            let pgdb;
            try {
                const provider = "google";
                pgdb = await PG.getClient();
                let res = await pgdb.query(
                    "SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2",
                    [provider, profile.id]
                );
                if (res.rows && res.rows.length === 0) {
                    await pgdb.query(
                        "INSERT INTO federated_credentials (provider, subject, disp_name, created_at) VALUES($1, $2, $3, $4)",
                        [
                            provider,
                            profile.id,
                            profile.displayName,
                            new Date().toISOString(),
                        ]
                    );
                    await pgdb.query(
                        "INSERT INTO users (provider, subject, lesson, chapter) VALUES($1, $2, $3, $4)",
                        [provider, profile.id, START_LESSON, START_CHAPTER]
                    );

                    let asset_loc = `${makeLessonPicturePath(
                        START_LESSON
                    )}/${INIT_STATUS}.png`;
                    await pgdb.query("CALL update_asset($1, $2, $3, $4, $5)", [
                        provider,
                        profile.id,
                        START_LESSON,
                        INIT_STATUS,
                        asset_loc,
                    ]);

                    return cb(null, {
                        id: profile.id,
                        issuer: provider,
                        displayName: profile.displayName,
                    });
                } else {
                    return cb(null, {
                        id: profile.id,
                        issuer: provider,
                        displayName: profile.displayName,
                    });
                }
            } catch (error) {
                cb(error);
            } finally {
                pgdb?.release();
            }
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: process.env["GITHUB_CLIENT_ID"]!,
            clientSecret: process.env["GITHUB_CLIENT_SECRET"]!,
            callbackURL:
                oauth !== undefined
                    ? `${oauth}/auth/oauth2/redirect/github`
                    : "/auth/oauth2/redirect/github",
        },
        async function verify(
            accessToken: string,
            refreshToken: string,
            profile: PassportProfile,
            cb: any
        ) {
            let pgdb;
            try {
                pgdb = await PG.getClient();
                let res = await pgdb.query(
                    "SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2",
                    [profile.provider, profile.id]
                );
                if (res.rows && res.rows.length === 0) {
                    await pgdb.query(
                        "INSERT INTO federated_credentials (provider, subject, disp_name, created_at) VALUES($1, $2, $3, $4)",
                        [
                            profile.provider,
                            profile.id,
                            profile.displayName,
                            new Date().toISOString(),
                        ]
                    );
                    await pgdb.query(
                        "INSERT INTO users (provider, subject, lesson, chapter) VALUES($1, $2, $3, $4)",
                        [
                            profile.provider,
                            profile.id,
                            START_LESSON,
                            START_CHAPTER,
                        ]
                    );

                    let asset_loc = `${makeLessonPicturePath(
                        START_LESSON
                    )}/${INIT_STATUS}.png`;
                    await pgdb.query("CALL update_asset($1, $2, $3, $4, $5)", [
                        profile.provider,
                        profile.id,
                        START_LESSON,
                        INIT_STATUS,
                        asset_loc,
                    ]);

                    return cb(null, {
                        id: profile.id,
                        issuer: profile.provider,
                        displayName: profile.displayName,
                    });
                } else {
                    return cb(null, {
                        id: profile.id,
                        issuer: profile.provider,
                        displayName: profile.displayName,
                    });
                }
            } catch (error) {
                cb(error);
            } finally {
                pgdb?.release();
            }
        }
    )
);

passport.serializeUser((user: Express.User, cb) => {
    process.nextTick(() => {
        cb(null, {
            id: user.id,
            issuer: user.issuer,
            username: user.displayName,
        });
    });
});

passport.deserializeUser((user: Express.User, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});
