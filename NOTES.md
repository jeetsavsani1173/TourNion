- ### How to get google client ID and client secret
> 1. Go to [Google API Console](https://console.developers.google.com/)
> 2. Create a new project
> 3. Click on the project name and give appropriate name and no need to select organization and then click on `Create`
> 4. select created project and go to OAuth consent screen
>> 1. Select `External` and click on `Create`
>> 2. In App Information Give appropriate name and email address.
>> 3. Add same email address in `Developer contact information`
>> 4. click on `Save and Continue`
> 5. Click on `save and continue` in Scopes
> 6. Click on `save and continue` in Test users
> 7. Click on `Back to Dashboard` in Summary
> 8. Click on `Credentials` in left side menu
>> 1. Click on `Create Credentials` and select `OAuth client ID`
>> 2. Select `Web application` and give appropriate name
>> 3. In `Authorized redirect URIs` and `Authorized JavaScript origins` add `http://localhost:3000` and click on `Create`
> 9. Copy `Client ID` and `Client secret` and paste in .env file and use it in your application

---