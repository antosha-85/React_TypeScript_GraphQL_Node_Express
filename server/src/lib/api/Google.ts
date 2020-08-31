import { google } from "googleapis";

// constructed a new object
const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`
);
export const Google = {
  //here I mentioned in the scope what info I will need from the account
  authUrl: auth.generateAuthUrl({
    access_type: "online",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),
  //function that gets tokens
  logIn: async (code: string) => {
    const { tokens } = await auth.getToken(code);
    //configuring auth object
    auth.setCredentials(tokens);
    // getting user information by running people constructor
    const { data } = await google.people({ version: "v1", auth }).people.get({
      resourceName: "people/me",
      personFields: "emailAdresses,names,photos",
    });
    return { user: data };
  },
};
