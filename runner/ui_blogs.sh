cd ..
d="$(date +"%Y-%m-%d:%H:%M:%S")"
mkdir "report/$d"
galen test test/ui.blog.test.js --htmlreport "report/$d" --config "config/galen.config"