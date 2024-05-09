FROM node:14

ADD package.json /tmp/package.json

ADD yarn.lock /tmp/yarn.lock

RUN rm -rf build 