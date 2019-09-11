#!/bin/bash
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PUBLISH_DIR="$CURRENT_DIR/.publish"
rm -rf $PUBLISH_DIR/*

WITHOUT_NODE_MODULES=`ls -p -A | grep -v 'node_modules'`
PUBLISH_NAME=`ls -p -A | grep -o '.publish/'`
RESULT="${WITHOUT_NODE_MODULES//$PUBLISH_NAME/}"
cp -r $RESULT $PUBLISH_DIR
