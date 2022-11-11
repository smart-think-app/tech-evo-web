echo 'running ng build'
cd tech-evo-web && ng build
echo 'removing all files in public'
cd .. && rm -r public/*
echo 'replacing by all new files which is generated by ng build'
cp -r tech-evo-web/dist/tech-evo-web/* public/
echo 'deploying on firebase'
firebase deploy
echo 'done'