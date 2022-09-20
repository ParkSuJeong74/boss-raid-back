<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# 보스레이드 서비스 프로젝트 📋

## 1. 프로젝트 소개

보스레이드 PVE 컨텐츠 관련 기능을 제작합니다.

### 1-1) 요구사항 분석

유저 생성 : 중복되지 않는 id로 생성합니다.
유저 조회 :
보스레이드 상태 조회
보스레이드 시작
보스레이드 종료
랭킹 조회

### 1-2) 관련 문서

- API Docs (swagger)

👉 https://app.swaggerhub.com/apis-docs/ParkSuJeong74/BossRaid/1.0.0

- ERD

![image](https://user-images.githubusercontent.com/71163016/191239325-f2333205-c3b4-4f23-942a-5d1b997ebe0c.png)

## 2. 사용된 기술스택

| 파트   | 기술                                                          |
| ------ | ------------------------------------------------------------- |
| **BE** | Nest.js, Postgres, Prisma, GCP Compute Engine, swagger, Redis |

## 3. 서비스 실행 방법

레포지토리를 clone 받아야합니다!

```shell
$ git clone
$ cd
```

@ParkSuJeong 에게 `*.env`를 요청해주세요!

```shell
$ npm install
$ npm run start:dev
```

## 버전

- version 1.0.0

## FAQ

- 자주 받는 질문 정리

## License

Nest is [MIT licensed](LICENSE).
