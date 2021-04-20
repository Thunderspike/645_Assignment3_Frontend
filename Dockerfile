FROM node as build
LABEL "maintainers"="Pol Ajazi; Flavio Amurrio Moya"

WORKDIR /root/survey

COPY . /root/survey/ 

RUN npm install --silent
RUN npm install -g @angular/cli
RUN ng build --prod 

FROM nginx
COPY --from=build /root/survey/dist/survey/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

#debugging
RUN apt-get update;
RUN apt-get install -y iputils-ping;
RUN apt-get install -y curl;

CMD [ "nginx", "-g", "daemon off;" ]