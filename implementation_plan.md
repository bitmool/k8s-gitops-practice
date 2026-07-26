# Phase 2: 실무형 MSA CI/CD 및 GitOps 인프라 마스터 계획

지금까지 배운 내용은 쿠버네티스라는 거대한 엔진이 내부적으로 어떻게 작동하는지 이해하기 위한 "기본기" 과정이었습니다.
이제부터는 실제 빅테크 기업들이 현재 사용하는 **실무 표준(Industry Standard)** 접근법인 **"GitOps 기반의 완전 자동화 및 관측성(Observability) 확보"** 커리큘럼을 시작합니다.

## Docker Hub 대안 (GitHub Container Registry)

> [!TIP]
> **Docker Hub 계정 없이 실습하는 방법**
> Docker Hub 대신 깃허브에서 자체적으로 제공하는 **GitHub Container Registry (GHCR)**를 사용합니다. 
> 회원님의 GitHub 계정 하나만 있으면 코드 저장소와 도커 이미지 저장소를 동시에, 게다가 **무료**로 사용할 수 있어 최근 실무에서도 Docker Hub를 대체하여 매우 많이 쓰이는 트렌디한 방식입니다. 번거로운 추가 가입이 필요 없습니다!

## 구상된 폴더 구조 (GitOps 표준)

GitOps 환경에서는 '앱 소스코드'와 '인프라 설정(YAML)'을 철저히 분리하여 관리하는 것이 실무 원칙입니다. 다음과 같은 구조로 진행합니다.

```text
D:\VibeCoding2\Learning\MSA\Phase2_GitOps
├── docs/                     # (학습 가이드) 단계별 실습 문서가 저장될 폴더
│   ├── Step01_Kustomize.md
│   └── Step02_GitHub_Actions_CI.md ...
├── .github/
│   └── workflows/
│       └── ci-pipeline.yaml  # (CI) 소스코드 Push 시 자동 빌드 및 GHCR 업로드 설정
├── apps/
│   └── hello-msa/                # 개발자가 작성하는 실제 애플리케이션 소스 코드
│       ├── app.js
│       ├── package.json
│       └── Dockerfile            # 이미지를 굽기 위한 레시피
└── manifests/
    └── hello-msa/
        ├── base/                 # (CD) Kustomize 공통 기본 YAML 템플릿
        │   ├── deployment.yaml
        │   ├── service.yaml
        │   └── kustomization.yaml
        └── overlays/             # (CD) 환경별(Dev/Prod) 덮어쓰기 설정
            ├── dev/
            │   ├── patch.yaml
            │   └── kustomization.yaml
            └── prod/
                ├── patch.yaml
                └── kustomization.yaml
```

## Proposed Changes (Phase 2 커리큘럼)

### 1. Kustomize를 이용한 환경 분리 (Dev / Prod)
동일한 앱을 개발(Dev)과 운영(Prod) 환경에 다르게 배포하기 위해 `Kustomize`를 활용한 오버레이(Overlay) 기법을 실습합니다.

### 2. GitHub Actions (CI: 지속적 통합 자동화)
개발자가 코드를 수정해서 GitHub에 `git push`를 하는 순간, GitHub 서버가 코드를 빌드하고 도커 이미지를 만들어 **GHCR(GitHub Container Registry)**에 자동 업로드하는 봇을 구축합니다.

### 3. ArgoCD를 이용한 GitOps (CD: 지속적 배포 자동화)
K8s 클러스터 내부에 **ArgoCD**를 설치합니다. ArgoCD가 깃허브 저장소의 `manifests/` 폴더를 24시간 감시하다가, 새로운 이미지 태그가 감지되면 클러스터에 **스스로 끌고 와서(Pull)** 배포합니다.

### 4. 무중단 무결점 배포 (Canary Deployment)
Argo Rollouts를 활용하여 트래픽의 10%만 새 버전(V2) 서버로 보내어 에러가 없는지 모니터링 후 100%로 전환하는 **카나리 배포**를 실습합니다.

### 5. 실무급 모니터링 (Prometheus & Grafana)
인프라에 문제가 생겼을 때 즉각 인지할 수 있도록, 프로메테우스와 그라파나를 연동하여 우리 클러스터의 건강 상태를 대시보드에 띄워봅니다.
