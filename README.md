# 04-SNS

- SNS 서비스
  - 사용자는 본 서비스에 접속하여, 게시물을 업로드 하거나 다른 사람의 게시물을 확인하고, 좋아요를 누를 수 있습니다.

## 🔖 목차

- [04-SNS](#04-sns)
  - [🔖 목차](#-목차)
  - [💿 기술 스택](#-기술-스택)
  - [💾 ERD 설계](#-erd-설계)
  - [🚀 API 항목](#-api-항목)
    - [**🚶🏻 User**](#-user)
    - [**📋 Feed**](#-feed)
    - [**📋 Auth**](#-auth)
  - [🌕 프로젝트 실행 및 테스트](#-프로젝트-실행-및-테스트)
  - [🔒 ENV](#-env)

<br />

## 💿 기술 스택

---

<br>
<div align='center'> 🖥&nbsp&nbsp&nbsp사용한 기술 스택</div>
<br>
<p align="center">
📑&nbsp&nbsp&nbsp구성 언어
  </p>
<p align="center">
<img alt= "icon" wide="80" height="80" src ="https://techstack-generator.vercel.app/ts-icon.svg">
  </p>
 <p align="center">
🏠&nbsp&nbsp&nbsp Database
  </p>
<p align="center">
<img alt= "icon" wide="65" height="65" src ="https://techstack-generator.vercel.app/mysql-icon.svg">
&nbsp&nbsp&nbsp 
<img alt= "icon" wide="60" height="60" src ="https://velog.velcdn.com/images/sjy0917/post/45b7622b-54df-4f04-bd83-278c33c9bc90/typeorm.png">

  </p>
<p align="center">
🏖&nbsp&nbsp&nbsp 서버
  </p>
<p align="center">
<img alt= "icon" wide="60" height="60" src ="https://symbols.getvecta.com/stencil_89/37_nestjs-icon.a67daec196.svg">
&nbsp&nbsp
<img alt= "icon" wide="65" height="65" src ="https://techstack-generator.vercel.app/restapi-icon.svg">
&nbsp&nbsp
<img alt= "icon" wide="65" height="65" src ="https://techstack-generator.vercel.app/docker-icon.svg">
&nbsp&nbsp
<img alt= "icon" wide="60" height="60" src ="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png">
</p>

<p align="center">
🏖&nbsp&nbsp&nbsp 배포
  </p>
<p align="center">
<img alt= "icon" wide="60" height="60" src ="https://camo.githubusercontent.com/79864e687ef243c4008d8c7c9ecc7b77548625b867ce08094beee7a417d41585/68747470733a2f2f6c6972702e63646e2d776562736974652e636f6d2f61613065663336392f646d73337265702f6d756c74692f6f70742f676f6f676c652d636c6f75642d69636f6e2d353730772e706e67">
</p>

---

<br>

## 💾 ERD 설계

![](image/ERD.png)

## 🚀 API 항목

<br>

### **🚶🏻 User**

|  METHOD  |                URL                |                             PARAMETER                              |                        RETURN                         |          DESCRIPTION           |
| :------: | :-------------------------------: | :----------------------------------------------------------------: | :---------------------------------------------------: | :----------------------------: |
| **GET**  | http://localhost:3003/api/v1/user |      [CurrentUser](./backend/src/common/auth/currentUser.ts)       | [User](backend/src/apis/user/entities/user.entity.ts) | 자신의 유저 정보를 조회합니다. |
| **POST** | http://localhost:3003/api/v1/user | [CreateUserInput](./backend/src/apis/user/dto/createUser.input.ts) | [User](backend/src/apis/user/entities/user.entity.ts) |       유저를 생성합니다.       |

 <div><details><summary>내 유저 정보 조회</summary>
 <div markdown="1">
 
 </div></details></div>

 <div><details><summary>회원가입(유저 정보 생성)</summary>
 <div markdown="1">
 
![](image/gif/회원가입.gif)
 </div></details></div>

<hr>
<br>

### **📋 Feed**

|   METHOD   |                    URL                     |                                 PARAMETER                                  |                              RETURN                              |          DESCRIPTION           |
| :--------: | :----------------------------------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------: | :----------------------------: |
|  **POST**  |     http://localhost:3003/api/v1/feed/     |     [CreateFeedInput](./backend/src/apis/feed/dto/createFeed.input.ts)     |     [Feed](./backend/src/apis/feed/entities/feed.entity.ts)      |      게시글을 생성합니다.      |
|  **GET**   | http://localhost:3003/api/v1/feed/{feedId} |                                   feedId                                   |     [Feed](./backend/src/apis/feed/entities/feed.entity.ts)      | 게시글을 단일 상세 조회합니다. |
|  **GET**   |     http://localhost:3003/api/v1/feed/     |              ?search,?order,?orderBy,?filter,?page,?pageCount              | [FetchFeedOutput](backend/src/apis/feed/dto/fetchFeed.output.ts) | 게시글 목록을 검색 조회합니다. |
| **PATCH**  | http://localhost:3003/api/v1/feed/{feedId} | feedId, [UpdateFeedInput](./backend/src/apis/feed/dto/updateFeed.input.ts) |     [Feed](./backend/src/apis/feed/entities/feed.entity.ts)      |      게시글을 수정합니다.      |
| **DELETE** | http://localhost:3003/api/v1/feed/{feedId} |                                   feedId                                   |           String('게시글이 성공적으로 삭제되었습니다')           |      게시글을 삭제합니다.      |
|  **PUT**   | http://localhost:3003/api/v1/feed/{feedId} |                                   feedId                                   |           String('게시글이 성공적으로 복구되었습니다')           |  삭제된 게시글을 복구합니다.   |
|  **POST**  |     http://localhost:3003/api/v1/feed/     |                                   feedId                                   |         String('좋아요 성공),String('좋아요 취소 성공')          |  게시글에 좋아요를 누릅니다.   |

<hr>

 <div><details><summary>게시글 생성</summary>
 <div markdown="1">
 
 ![](image/gif/게시글%20생성.gif) 
 </div></details></div>

 <div><details><summary>게시글 수정</summary>
 <div markdown="1">

![](image/gif/게시글%20수정.gif)

 </div></details></div>

  <div><details><summary>게시글 삭제</summary>
 <div markdown="1">
 
![](image/gif/게시글%20삭제.gif)

 </div></details></div>

   <div><details><summary>게시글 복구</summary>
 <div markdown="1">
 
![](image/gif/게시글%20복구.gif)

  </div></details></div>

<div><details><summary>게시글 좋아요</summary>
 <div markdown="1">
 
![](image/gif/게시글%20좋아요.gif)

 </div></details></div>

 <div><details><summary>게시글 목록 검색 조회</summary>
<div markdown="1">

<div><details><summary>맛집 검색</summary>
<div markdown="1">
 
![](image/gif/맛집%20검색.gif)

</div></details></div>

<div><details><summary>여행 검색</summary>
<div markdown="1">

![](image/gif/여행%20검색.gif)

</div></details></div>

 </div></details></div>

<div><details><summary>게시글 상세 조회</summary>
 <div markdown="1">
 
![](image/gif/게시글%20상세조회1.gif)

 </div></details></div>

 <div><details><summary>게시글 상세 조회시 조회수 증가</summary>
 <div markdown="1">
 
![](image/gif/게시글%20상세조회2.gif)

 </div></details></div>

<hr>
<br>

### **📋 Auth**

|  METHOD  |                       URL                       |                        PARAMETER                         |       RETURN        |   DESCRIPTION    |
| :------: | :---------------------------------------------: | :------------------------------------------------------: | :-----------------: | :--------------: |
| **POST** |       http://localhost:3003/api/v1/login        | [loginInput](./backend/src/apis/auth/dto/login.input.ts) | String(액세스 토큰) |      로그인      |
| **POST** | http://localhost:3003/api/v1/restoreAccessToken |                            -                             | String(액세스 토큰) | 액세스 토큰 복구 |

 <div><details><summary>로그인</summary>
 <div markdown="1">
 
![](image/gif/로그인.gif)

 </div></details></div>

  <div><details><summary>액세스 토큰 복구</summary>
 <div markdown="1">
 
![](image/gif/액세스%20토큰%20복구.gif)

 </div></details></div>

 <br>

---

<br>

## 🌕 프로젝트 실행 및 테스트

**local에서 테스트** 💡

- 실행 명령어

```
git clone https://github.com/pre-onboarding-backend-E/04-SNS
git checkout taeyoung
cd backend
env/.env 추가
docker compose build
docker compose up
```

- RestApi로 테스트하기

  - [Api 항목](#-api-항목)을 참고하여 Rest-Api 호출

- Swagger Docs에서 테스트하기
  - http://localhost:3003/api/docs

**배포 서버에서 테스트** 💡

- RestApi로 테스트하기

  - localhost => 34.64.153.50:3003
  - [Api 항목](#-api-항목)을 참고하여 Rest-Api 호출

- Swagger Docs에서 테스트하기
  - http://34.64.153.50:3003/api/docs

<br>

## 🔒 ENV

- 위치 : /env/.env
- local에서 실행시 샘플로 사용할 env는 다음과 같습니다

```
DB_HOST=database-server
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=1178
DB_DATABASE=sns
JWT_ACCESS_KEY=AK
JWT_REFRESH_KEY=RK
JWT_ACCESS_EXPIRATION_TIME=5h
JWT_REFRESH_EXPIRATION_TIME=10h
```
