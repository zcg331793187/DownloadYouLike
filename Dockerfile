FROM daocloud.io/node:6
RUN mkdir -p /www/loop/



COPY ./service/ /www/loop/service/
COPY ./package.json /www/loop/

WORKDIR /www/loop/

RUN npm install --registry=https://registry.npm.taobao.org
#RUN npm install

CMD ["npm","start"]
