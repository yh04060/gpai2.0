#!/usr/bin/env python3
"""
gpai-prototype.html 빌드 스크립트 (의존성 없음 — python3 표준 라이브러리만)

  python3 build.py           src/ 조각들을 순서대로 이어붙여 gpai-prototype.html 생성
  python3 build.py --check   생성하지 않고, 현재 gpai-prototype.html이 src/와 일치하는지 검사

src/manifest.txt 가 조립 순서의 정본이다. 파일을 추가/삭제/이동하면 반드시 갱신하라.
산출물(gpai-prototype.html)은 직접 수정하지 않는다 — 항상 src/를 고치고 빌드한다.
"""
import sys, os

ROOT=os.path.dirname(os.path.abspath(__file__))
MANIFEST=os.path.join(ROOT,'src','manifest.txt')
OUT=os.path.join(ROOT,'gpai-prototype.html')

def parts():
    out=[]
    for i,line in enumerate(open(MANIFEST,encoding='utf-8'),1):
        p=line.strip()
        if not p or p.startswith('#'): continue
        fp=os.path.join(ROOT,p)
        if not os.path.isfile(fp):
            sys.exit(f'manifest.txt:{i} 파일 없음: {p}')
        out.append(fp)
    return out

def build_str():
    return ''.join(open(p,encoding='utf-8').read() for p in parts())

if __name__=='__main__':
    html=build_str()
    if '--check' in sys.argv:
        cur=open(OUT,encoding='utf-8').read() if os.path.isfile(OUT) else None
        if cur==html: print('OK: gpai-prototype.html == build(src/)')
        else: sys.exit('MISMATCH: gpai-prototype.html이 src/와 다릅니다. python3 build.py 로 재생성하세요.')
    else:
        open(OUT,'w',encoding='utf-8').write(html)
        print(f'built gpai-prototype.html ({len(html):,} chars, {html.count(chr(10)):,} lines)')
