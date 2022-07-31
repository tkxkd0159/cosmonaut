#!/usr/bin/env bash

cd cosmonaut-frontend
if [[ $1 == "new" ]]; then
npm ci
npm run build
else
npm run build
fi