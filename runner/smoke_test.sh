cd ..
d="$(date +"%Y-%m-%d:%H:%M:%S")"
mkdir "report/$d"
galen test test/ --htmlreport "report/$d" --config "config/galen.config" --groups smoke