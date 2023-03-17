# build front-end
FROM node:lts-alpine AS frontend

RUN npm install pnpm -g

WORKDIR /app

COPY ./package.json /app

COPY ./pnpm-lock.yaml /app

RUN pnpm install

COPY . /app

RUN pnpm run build

# build backend
# FROM node:lts-alpine as backend

# RUN npm install pnpm -g

# WORKDIR /app

# COPY /service/package.json /app

# COPY /service/pnpm-lock.yaml /app

# RUN pnpm install

# COPY /service /app

# RUN pnpm build

# service
# FROM node:lts-alpine

# RUN npm install pnpm -g

WORKDIR /app

# ADD https://www.python.org/ftp/python/3.9.0/Python-3.9.0.tgz /usr/src/
# RUN tar -xzf /usr/src/Python-3.9.0.tgz -C /usr/src/
# RUN cd /usr/src/Python-3.9.0 && ./configure && make && make install
# ENV PYTHONPATH=/usr/local/bin/python3.9
# CMD ["/usr/local/bin/python3.9"]
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# RUN easy_install pip
# RUN curl https://bootstrap.pypa.io/get-pip.py | python
COPY /service/requirements.txt /app/requirements.txt
# RUN pip3 install -r /app/requirements.txt
RUN pip3 install tqdm==4.65.0
RUN pip3 install Flask==2.1.0
RUN pip3 install llama-index==0.4.12
RUN pip3 install langchain==0.0.27

# COPY /service/package.json /app

# COPY /service/pnpm-lock.yaml /app

# RUN pnpm install --production && rm -rf /root/.npm /root/.pnpm-store /usr/local/share/.cache /tmp/*

COPY /service /app

COPY ./package.json /app

COPY ./pnpm-lock.yaml /app

# COPY /app/dist /app/public

# COPY --from=backend /app/build /app/build

EXPOSE 3002

COPY /start.sh /app/start.sh
# CMD ["pnpm", "run", "prod"]
CMD ["sh","/app/start.sh"]
