# m2-gear


branch -> amplify backend
main -> prod (not used yet)
develop -> dev (not used yet)
staging -> staging (please branch off this)


# TroubleShooting

## unable to switch envs run this
```bash
git clean -fxd
amplify pull --appId <app-id> --envName <env-name>
npm i -f
cd ios && pod install
#install andriod oneday
```

run `git clean -fxd` to remove all gitignored files (this will simulate a fresh clone of the repo)
OR clone project into a new directory
delete the team-provider-info.json file: rm amplify/team-provider-info.json
initialize/pull the project locally `amplify pull --appId <app-id> --envName <env-name>`
use amplify env pull to pull additional envs such as staging: `amplify env pull --envName staging`
attempt to push resources changes with amplify push

# reminders/notes

if you connect the app to a staging instances and the install a dev testflight instance the device will not connect,
because it still wants to connect to the old device, it needs to be reset now.
