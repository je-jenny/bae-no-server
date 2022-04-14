# 배달비노노 서버 레파지토리

## 사용스택

- node:16.14.2 LTS

* express, PostgreSQL

- Typescript

## 실행 방법

### 도커

```bash
$ docker-compose up --build # -d 백그라운드 실행 옵션

```

### 로컬

```bash
$ npm run dev
```

## pg 접근 방법

```bash
$ psql -U postgres -d postgres  # 유저의 DB에 접속
$ \dt                           # 테이블 확인
```

## 팀
