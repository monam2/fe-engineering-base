## @fe-base/hooks

재사용 가능한 React 커스텀 훅을 모아 두는 패키지입니다.

### 개발 스크립트

```bash
yarn workspace @fe-base/hooks build   # dist 생성
yarn workspace @fe-base/hooks test    # Vitest 실행
yarn workspace @fe-base/hooks lint    # ESLint 점검
```

### 예시

```tsx
import { useToggle } from "@fe-base/hooks";

function Example() {
  const { value, toggle } = useToggle();

  return (
    <button onClick={() => toggle()}>
      {value ? "ON" : "OFF"}
    </button>
  );
}
```
