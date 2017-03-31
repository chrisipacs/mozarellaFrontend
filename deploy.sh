#!/bin/bash 

echo "# mozarellaDist" >> README.md

ls

cloneCMD="git clone https://"$NAME":"$OTH"@github.com/chrisipacs/mozarellaDist.git"
eval $cloneCMD

mv tools/distServer.js mozarellaDist/distServer.js
mv tools/distPackage.json mozarellaDist/package.json
rm -r mozarellaDist/dist
mv -f dist mozarellaDist/dist

cd mozarellaDist

git config user.name chrisipacs
git config user.email pitypalattysama@gmail.com

git status

#deploy distServer to heroku

git add .
git commit -m "create new build"
#git remote add deploy https://github.com/chrisipacs/mozarellaDist.git

#https://username:password@github.com/username/repository.git
pushCMD="git push -u https://"$NAME":"$OTH"@github.com/chrisipacs/mozarellaDist.git master"
eval $pushCMD
