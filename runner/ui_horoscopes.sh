#!/bin/bash
cd ..
d="$(date +"%Y-%m-%d:%H:%M:%S")"
mkdir "report/$d"
galen test test/ui.horoscopes.test.js --htmlreport "report/$d" --config "config/galen.config"
