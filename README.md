# RGT-BookStore
# Bookstore Project

안녕하세요! 이 프로젝트는 온라인 서점 웹 애플리케이션입니다. 프론트엔드와 백엔드가 포함되어 있으며, TypeScript를 사용하여 타입 안전성을 유지합니다.

## 기술 스택

### 프론트엔드
- **React**: 사용자 인터페이스를 구축하는 데 사용됨.
- **TypeScript**: 정적 타입 체크를 위해 사용됨.
- 기타 라이브러리:
  - **Axios**: API 호출을 위한 HTTP 클라이언트
  - **React Router**: 애플리케이션 내에서의 페이지 전환을 관리
  - **SweetAlert2**: 사용자에게 알림을 표시하기 위한 라이브러리

### 백엔드
- **Express**: 웹 서버 프레임워크
- **MySQL**: 데이터베이스 관리 시스템
- **TypeScript**: 타입 안전성을 보장
- 기타 패키지:
  - **CORS**: 클라이언트와 서버 간의 Cross-Origin Resource Sharing을 지원
  - **dotenv**: 환경 변수를 관리하기 위한 라이브러리

## 설치

이 프로젝트를 로컬 머신에 설치하려면 다음 단계를 따르세요:

### 1. 리포지토리 클론
```bash
git clone https://github.com/username/bookstore.git
cd bookstore

### 2. 프론트엔드 의존성 설치
프론트엔드 디렉토리로 이동하여 의존성을 설치합니다.
```bash
cd client
npm install

### 3. 백엔드 의존성 설치
```bash
cd api
npm install

## 실행 방법
### 백엔드 실행
백엔드 서버를 시작하려면, 서버 디렉토리에서 다음 명령어를 사용하세요.
```bash
npm start

### 프론트엔드 실행
프론트엔드 클라이언트를 시작하려면, 클라이언트 디렉토리에서 다음 명령어를 사용하세요.
```bash
npm start

## API 엔드포인트
GET /api/books: 모든 책 목록 조회
GET /api/books/:id: 특정 책 정보 조회
POST /api/books: 새로운 책 추가
PUT /api/books/:id: 특정 책 정보 수정
DELETE /api/books/:id: 특정 책 삭제

## 개발 도구
Nodemon: 서버 변경 시 자동으로 재시작
TypeScript: 코드의 정적 타입 검사 및 컴파일
