import type { Project } from '../types'

// NOTE: `github` links point to the profile as a placeholder — swap in the
// actual repo URLs. `year` values are best guesses; confirm/adjust.
const GH = 'https://github.com/shindonghwagit'

export const projects: Project[] = [
  {
    n: '01',
    title: "Farmer's Market",
    kind: 'Full-stack · Solo',
    desc: 'Local farm-to-table marketplace. Built front to back, solo — JWT/OAuth2 social login, SSE live inventory, atomic point-payment transactions.',
    detail: {
      year: '2025',
      overview:
        '지역 농가와 소비자를 직접 연결하는 직거래 플랫폼. 소비자·농가 이중 회원 구조부터 상품 거래, 커뮤니티, 관리자 운영 도구까지 프론트엔드·백엔드·배포를 단독으로 구현했다.',
      highlights: [
        'JWT·OAuth2(카카오·구글) 소셜 로그인, 농가는 가입 후 관리자 승인',
        'SSE 기반 실시간 재고 동기화, 포인트 결제 원자적 트랜잭션 처리',
        '관리자 패널: 농가 승인 워크플로우, 사용자·게시글 관리, 통계 대시보드',
      ],
      stack: ['React', 'TypeScript', 'Vite', 'Spring Boot', 'PostgreSQL', 'JWT/OAuth2', 'SSE'],
      github: GH,
    },
  },
  {
    n: '02',
    title: 'CVDLens',
    kind: 'Capstone · Full-stack + AI',
    desc: 'Real-time color-blindness correction web app. Implemented the color-vision transform by hand instead of importing a library.',
    imgs: ['/og_cover.jpg'],
    fit: 'contain',
    detail: {
      year: '2025',
      overview:
        'AI 기반 실시간 색각이상 보정 웹 애플리케이션. Protanopia·Deuteranopia·Tritanopia 세 가지 타입을 단일 모델로 처리한다.',
      highlights: [
        'daltonize 등 외부 라이브러리 없이 Brettel(1997) LMS 색공간 변환을 직접 구현 (NumPy)',
        'MobileNetV2 기반 U-Net 모델을 색각이상 타입 조건부 입력으로 설계, PyTorch로 학습',
        'ONNX(opset 16)로 변환해 FastAPI 추론 서버에서 서빙',
      ],
      stack: ['Python', 'PyTorch', 'MobileNetV2+U-Net', 'ONNX', 'Next.js', 'FastAPI', 'PostgreSQL'],
      github: GH,
    },
  },
  {
    n: '03',
    title: 'PrismDesign',
    kind: 'Team of 2',
    desc: 'Browser-based node visual-programming studio. ReactFlow node editor, Canvas 2D rendering, MediaPipe hand tracking.',
    imgs: ['/assets1.png'],
    fit: 'contain',
    detail: {
      year: '2024',
      overview:
        'TouchDesigner에서 영감을 받은 브라우저 기반 노드형 비주얼 프로그래밍 스튜디오. 오퍼레이터 노드를 그래프로 연결해 실시간 비주얼을 생성한다.',
      role: '프론트엔드 기능 구현, 백엔드 API·서버 로직 개발, 프론트-백엔드 연동',
      highlights: [
        'ReactFlow 기반 노드 그래프 에디터와 Canvas 2D 실시간 렌더링 파이프라인',
        'MediaPipe 손 추적을 활용한 제스처 인터랙션 연동',
      ],
      stack: ['React', 'TypeScript', 'ReactFlow', 'Canvas 2D', 'Express', 'MediaPipe'],
      github: GH,
    },
  },
  {
    n: '04',
    title: 'GitHub Country Filter',
    kind: 'Side',
    desc: 'Chrome extension that filters GitHub users by country.',
    imgs: ['/modal.png', '/top-repositories.png'],
    detail: {
      year: '2024',
      overview:
        '국가별로 GitHub 사용자를 필터링해주는 크롬 확장 프로그램. 개발자를 탐색할 때 겪던 불편을 직접 도구로 해결했다.',
      highlights: [
        'GitHub 페이지에 동작하는 크롬 확장(Manifest) 구조 설계, DOM 조작 구현',
        'bio·README·최근 커밋 언어를 분석해 국가를 추정하는 필터 로직',
        'GitHub 토큰 기반 인증으로 rate limit 확장, 국가 정보 캐싱',
      ],
      stack: ['JavaScript', 'Chrome Extension'],
      github: GH,
    },
  },
]

export const focusAreas = [
  'Python',
  'PyTorch',
  'Pandas',
  'NumPy',
  'Spring',
  'Java',
  'Docker',
  'React',
  'JavaScript',
  'PostgreSQL',
  'C',
  'C++',
]
