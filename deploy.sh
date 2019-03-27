#/bin/bash

yarn run build
gsutil rsync -r build gs://www.practicecalendar.com
