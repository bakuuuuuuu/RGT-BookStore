
---

# Bookstore 프로젝트

이 프로젝트는 온라인 서점에서 책을 관리하는 웹 애플리케이션입니다. 사용자는 책을 조회, 검색, 등록 및 삭제, 수정할 수 있습니다. 프로젝트는 프론트엔드와 백엔드로 나뉘며, 백엔드는 Node.js와 Express를 사용하고, 프론트엔드는 React를 사용하여 개발되었습니다. 두 컴포넌트 모두 TypeScript로 작성되었습니다.

## 목차
1. [사용된 기술](#사용된-기술)
2. [프론트엔드 설정](#프론트엔드-설정)
3. [백엔드 설정](#백엔드-설정)
4. [프로젝트 실행](#프로젝트-실행)
5. [스크립트](#스크립트)
6. [MySQL 테이블 구조](#mysql-테이블-구조)
7. [시연 영상](#시연-영상)

## 사용된 기술

### 프론트엔드:
- **React**: 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리.
- **TypeScript**: JavaScript의 정적 타입 검사를 추가하는 슈퍼셋.
- **React Router**: React 애플리케이션에서 라우팅을 처리하기 위한 라이브러리.
- **Axios**: HTTP 요청을 보내기 위한 라이브러리.
- **SweetAlert2**: 알림을 표시하기 위한 라이브러리.
- **React Testing Library**: React 컴포넌트를 테스트하기 위한 라이브러리.

### 백엔드:
- **Node.js**: Chrome의 V8 JavaScript 엔진을 기반으로 한 JavaScript 런타임 환경.
- **Express**: 최소한의 기능을 제공하는 Node.js 웹 애플리케이션 프레임워크.
- **MySQL**: 관계형 데이터베이스 관리 시스템.
- **TypeScript**: 백엔드 코드에 정적 타입 검사를 추가하기 위한 언어.
- **CORS**: Cross-Origin Resource Sharing을 위한 미들웨어.
- **dotenv**: 환경 변수를 `.env` 파일에서 로드하기 위한 라이브러리.
- **Nodemon**: 개발 중 서버 자동 재시작을 위한 도구.

## 프론트엔드 설정

### 필수 조건:
- Node.js (>= 16.0.0)
- npm (>= 8.0.0) 또는 Yarn (>= 1.0.0)

### 의존성 설치:
프론트엔드 디렉토리에서 다음 명령어 중 하나를 실행하여 필요한 모든 의존성을 설치합니다:

**npm 사용:**
```bash
npm install
```

**yarn 사용:**
```bash
yarn install
```

`yarn`을 사용하는 것이 더 안정적일 수 있으며, React 버전 19 관련 이슈를 피할 수 있습니다.

### 환경 설정:
`client/bookstore` 디렉토리에 `.env` 파일을 생성하고 다음과 같은 환경 변수를 설정합니다:

```bash
REACT_APP_API_URL=server address:port number
```

여기서 `server address:port number`은 백엔드 서버 주소입니다. 이 값은 실제 배포된 서버 주소로 변경 해야합니다.

### 사용할 수 있는 스크립트:
- `npm start` 또는 `yarn start`: 개발 모드로 애플리케이션을 실행합니다.
- `npm run build` 또는 `yarn build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `npm test` 또는 `yarn test`: 애플리케이션의 테스트를 실행합니다.

## 백엔드 설정

### 필수 조건:
- Node.js (>= 16.0.0)
- MySQL (또는 MySQL 호환 데이터베이스)

### 의존성 설치:
백엔드 디렉토리에서 다음 명령어를 실행하여 필요한 모든 의존성을 설치합니다:

```bash
npm install
```

또는

```bash
yarn install
```

### 환경 설정:
백엔드 디렉토리에 `.env` 파일을 생성하고 다음과 같은 환경 변수를 설정합니다:

```bash
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

### 사용할 수 있는 스크립트:
- `npm run start` 또는 `yarn run start`: 개발 모드에서 Nodemon을 사용하여 서버를 실행합니다.
- `npm run build` 또는 `yarn run build`: TypeScript 코드를 JavaScript로 컴파일합니다.
- `npm run serve` 또는 `yarn run serve`: 빌드된 JavaScript 서버를 실행합니다.

## 프로젝트 실행

### 프론트엔드:
프론트엔드 서버를 시작하려면 `client/bookstore` 디렉토리로 이동하여 아래 명령어를 실행합니다:

**npm 사용:**
```bash
npm start
```

**yarn 사용:**
```bash
yarn start
```

### 백엔드:
백엔드 서버를 시작하려면 `api` 디렉토리로 이동하여 아래 명령어를 실행합니다:

**npm 사용:**
```bash
npm run start
```

**yarn 사용:**
```bash
yarn run start
```

### 데이터베이스:
MySQL 데이터베이스가 설정되고 연결 가능해야 합니다. 백엔드는 데이터베이스에서 책 정보를 저장하고 검색하는 기능을 사용합니다.

## MySQL 테이블 구조

`books` 테이블의 구조는 다음과 같습니다:

```sql
mysql> desc books;
+------------------+-------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field            | Type                                            | Null | Key | Default           | Extra                                         |
+------------------+-------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id               | int                                             | NO   | PRI | NULL              | auto_increment                                |
| title            | varchar(255)                                    | NO   |     | NULL              |                                               |
| author           | varchar(255)                                    | YES  |     | NULL              |                                               |
| price            | decimal(10,2)                                   | YES  |     | NULL              |                                               |
| description      | text                                            | YES  |     | NULL              |                                               |
| publication_date | date                                            | YES  |     | NULL              |                                               |
| category         | enum('소설','아동','요리','여행','건강','과학') | YES  | MUL | 소설              |                                               |
| image_url        | varchar(255)                                    | YES  |     | NULL              |                                               |
| created_at       | timestamp                                       | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at       | timestamp                                       | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+------------------+-------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
```

위의 `books` 테이블 구조는 책의 정보를 저장하는 데 사용되며, 각 책은 고유한 `id`로 구분됩니다. 책의 제목, 저자, 가격, 설명, 출판일, 카테고리, 이미지 URL 등의 정보를 포함합니다.

## 스크립트

### 프론트엔드 스크립트:
- `start`: React 스크립트를 사용하여 개발 서버를 시작합니다.
- `build`: 앱을 프로덕션용으로 빌드합니다.
- `test`: 앱의 테스트를 실행합니다.
- `eject`: React 앱의 설정을 외부 파일로 분리하여 노출합니다.

### 백엔드 스크립트:
- `start`: 개발 모드에서 `nodemon`을 사용하여 서버를 시작합니다.
- `build`: TypeScript 코드를 JavaScript로 컴파일합니다.
- `serve`: 컴파일된 JavaScript 서버를 실행합니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 시연 영상

[전체 시연 영상 보기](https://youtu.be/0XgAZhRCXAo?si=iHVhOqdbfhs8Gn6_)

---
