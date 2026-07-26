# Node.js 최신 LTS(Long Term Support) 버전을 베이스 이미지로 사용
FROM node:lts-alpine

# 앱이 들어갈 작업 폴더 생성
WORKDIR /usr/src/app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스코드 복사
COPY . .

# 앱이 3000번 포트를 씀을 알림
EXPOSE 3000

# 컨테이너 시작 시 실행할 명령어
CMD [ "npm", "start" ]
