from pathlib import Path
p = Path('src/Rules/linefollower.tsx')
s = p.read_text(encoding='utf-8')
old = '              ← Back to Regulations\n            </Link>\n          </div>'
new = ('              ← Back to Regulations\n            </Link>\n            <a\n              href="/regs/line-follower.pdf"\n              target="_blank"\n              rel="noopener noreferrer"\n              download\n              className="rounded-lg bg-white px-6 py-3 text-blue-700 font-semibold hover:bg-slate-100 transition"\n            >\n              Download Line Follower PDF\n            </a>\n          </div>')
if old not in s:
    print('Old block not found; aborting')
else:
    s2 = s.replace(old, new)
    p.write_text(s2, encoding='utf-8')
    print('patched')
