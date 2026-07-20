---
target: components/movie/VideoPlayer.tsx
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-07-20T08-17-04Z
slug: components-movie-videoplayer-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Spinner + error state OK. Thiếu recovery khi buffer stall |
| 2 | Match System / Real World | 3 | Icons phần lớn tốt. Ký tự skip ⟪10/10⟫ không phổ biến |
| 3 | User Control and Freedom | 3 | Seek/volume/fullscreen OK. Thiếu PiP và playback speed |
| 4 | Consistency and Standards | 3 | Nhất quán với design system. Volume hover-only vấn đề mobile |
| 5 | Error Prevention | 2 | Fatal error không có retry — user phải F5 |
| 6 | Recognition Rather Than Recall | 2 | Skip icons không rõ. Keyboard shortcuts không disclosed |
| 7 | Flexibility and Efficiency | 3 | Keyboard shortcuts tốt. Thiếu playback rate |
| 8 | Aesthetic and Minimalist Design | 3 | Controls gọn. Progress thumb nhỏ |
| 9 | Error Recovery | 1 | Chỉ show error text, không có retry button |
| 10 | Help and Documentation | 2 | Shortcuts tồn tại nhưng không ai biết |
| **Total** | | **25/40** | Acceptable |

## Anti-Patterns Verdict
Detector: clean (0 findings). Không có absolute bans.

## Priority Issues
- [P1] Không có retry khi fatal error
- [P1] Skip icons không chuẩn, thiếu tooltip
- [P2] Thiếu playback rate (0.5x-2x)
- [P2] Volume slider ẩn hoàn toàn trên mobile
- [P3] Progress bar thumb quá nhỏ trên mobile

## Persona Red Flags
- Alex: không có playback speed, không có PiP
- Casey: volume control mobile bị khóa, seek target quá nhỏ, no retry on error
- Minh (Cinava-specific): skip icons lạ, error state không có hướng dẫn
