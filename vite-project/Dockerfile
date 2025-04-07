FROM node:20

WORKDIR /app

# Bu ENV sayesinde rollup native binary yüklemeye çalışmaz!
ENV ROLLUP_NO_BINARY=true
ENV ROLLUP_WASM=true


# package.json ve lock dosyasını al
COPY package*.json ./

# --omit=optional ile optional bağımlılıkları kurma
RUN npm install 

# Kodları kopyala
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
