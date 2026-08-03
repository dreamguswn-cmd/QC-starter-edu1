from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, HRFlowable

OUT = r"C:\aws_project\QC-starter-edu1-live\public\downloads\Yoo_Hyunju_Resume.pdf"
FONT_PATH = r"C:\Windows\Fonts\malgun.ttf"
FONT_BOLD_PATH = r"C:\Windows\Fonts\malgunbd.ttf"
pdfmetrics.registerFont(TTFont("Malgun", FONT_PATH))
pdfmetrics.registerFont(TTFont("MalgunBold", FONT_BOLD_PATH))

BLUE = colors.HexColor("#1268E8")
INK = colors.HexColor("#0B1728")
MUTED = colors.HexColor("#526075")
styles = getSampleStyleSheet()

title = ParagraphStyle("TitleKR", fontName="MalgunBold", fontSize=27, leading=32, textColor=INK, spaceAfter=5)
role = ParagraphStyle("RoleKR", fontName="MalgunBold", fontSize=14, leading=18, textColor=BLUE, spaceAfter=8)
notice = ParagraphStyle("NoticeKR", fontName="MalgunBold", fontSize=9.5, leading=14, textColor=MUTED, spaceAfter=10)
body = ParagraphStyle("BodyKR", fontName="Malgun", fontSize=9.5, leading=15, textColor=INK, spaceAfter=5)
small = ParagraphStyle("SmallKR", fontName="Malgun", fontSize=8.7, leading=13, textColor=MUTED, spaceAfter=4)
project_title = ParagraphStyle("ProjectTitleKR", fontName="MalgunBold", fontSize=10, leading=14, textColor=INK, spaceAfter=2)
skill = ParagraphStyle("SkillKR", fontName="Malgun", fontSize=9.1, leading=14, textColor=INK, spaceAfter=4)
section = ParagraphStyle("SectionKR", fontName="MalgunBold", fontSize=11.5, leading=16, textColor=BLUE, spaceBefore=9, spaceAfter=4)
bullet = ParagraphStyle("BulletKR", fontName="Malgun", fontSize=9.2, leading=14, leftIndent=14, firstLineIndent=-8, bulletIndent=2, textColor=INK, spaceAfter=3)
link = ParagraphStyle("LinkKR", fontName="Malgun", fontSize=9.2, leading=14, textColor=BLUE, spaceAfter=3)


def heading(story, text):
    story.append(Paragraph(text, section))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#D6E1EA"), spaceAfter=5))


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Malgun", 8)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(letter[0] / 2, 0.32 * inch, f"유현주 · AI Software QA Engineer 지원 이력서 · {doc.page}")
    canvas.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=letter, rightMargin=0.65*inch, leftMargin=0.65*inch, topMargin=0.5*inch, bottomMargin=0.55*inch, title="유현주 AI Software QA Engineer 지원 이력서", author="유현주")
story = []
story += [
    Paragraph("유현주", title),
    Paragraph("AI Software QA Engineer 지원", role),
    Paragraph("AI Software QA 실무 경력 없음 · 교육 및 프로젝트 기반 지원", notice),
    Paragraph('EMAIL&nbsp;&nbsp;<link href="mailto:aa01057559209@gmail.com">aa01057559209@gmail.com</link>&nbsp;&nbsp;&nbsp;&nbsp; GITHUB&nbsp;&nbsp;<link href="https://github.com/dreamguswn-cmd">github.com/dreamguswn-cmd</link><br/>PORTFOLIO&nbsp;&nbsp;<link href="https://dreamguswn-cmd.github.io/QC-starter-edu1/">dreamguswn-cmd.github.io/QC-starter-edu1/</link>', link),
]

heading(story, "PROFILE")
story.append(Paragraph("임상병리사로 약 8년간 검사 결과의 정확성, 재현성, 이상치 확인과 장비 품질관리를 수행했습니다. 현재 대우능력개발원 AI 기반 소프트웨어 테스터(QA) 및 모니터링 실무 과정에서 기능·API 테스트, AI 응답 품질평가, 자동화, 성능 검증, 모니터링과 AWS 장애복구를 학습하고 프로젝트로 증빙하고 있습니다. 의료 QC 경험을 소프트웨어 품질 검증 역량으로 확장해 신입 AI Software QA 직무에 지원합니다.", body))

heading(story, "QA EDUCATION")
story.append(Paragraph("대우능력개발원 | AI 기반 소프트웨어 테스터(QA) 및 모니터링 실무 과정", project_title))
story.append(Paragraph("2026.05.27 - 2026.08.07 | 수강 중", small))
for item in ["기능·API·회귀 테스트, 테스트 케이스와 결함 재현 기록", "pytest 자동화, k6 성능 검증, Prometheus·Grafana 모니터링", "RAG·LLM Judge 기반 AI 응답 품질평가 및 답변 개선", "AWS EC2·S3·CloudTrail 환경 구축, 장애 재현·복구·보안 점검"]:
    story.append(Paragraph(item, bullet, bulletText="•"))

heading(story, "SELECTED QA PROJECTS")
projects = [
    ("RAG 챗봇 자동 평가 및 답변 개선 | 개인", "평가 기준 설계, 응답 5건 자동 평가, 감점 원인 분석, Correction Agent 개선과 재검증을 전 과정 수행. 평균 4.20/5."),
    ("AWS 웹 서버 장애 재현 및 복구 검증 | 개인", "EC2·Apache 구축부터 장애 시나리오, 원인 확인, 서비스 복구, S3·CloudTrail 보안 재검증까지 수행. 복구 평가 100점."),
    ("VOC Improve 멀티 에이전트 QA | 팀", "Agent 결과 테스트 실행, AI 품질 결과 검토, Release Gate 배포 판정 자료와 최종 증빙 정리를 담당."),
    ("AI Agent 품질관리·운영 모니터링 | 교육 프로젝트", "pytest 기능 테스트와 k6 부하 테스트를 실행하고 Prometheus 지표를 Grafana 대시보드에서 검증."),
]
for name, detail in projects:
    story.append(Paragraph(name, project_title))
    story.append(Paragraph(detail, small))

heading(story, "SKILLS - 교육 프로젝트 수행 근거 기준")
skills = [
    ("Testing", "7/10", "테스트 기준 수립, 기능·회귀·API 검증과 재테스트 수행"),
    ("AI Quality", "7/10", "RAG·LLM Judge 평가 기준 설계와 답변 개선·재검증 수행"),
    ("Automation", "6/10", "pytest 기반 반복 검증과 결과 보고 적용"),
    ("Performance", "5/10", "k6 부하 조건과 응답 시간·오류율 검증 실습"),
    ("Monitoring", "6/10", "Prometheus 지표 수집과 Grafana 대시보드 확인"),
    ("Cloud & Ops", "6/10", "AWS 서버 구축·장애복구·S3 보안 점검 개인 과제"),
]
for name, score, detail in skills:
    story.append(Paragraph(f'<font name="MalgunBold" color="#1268E8">{name} &nbsp; {score}</font>&nbsp;&nbsp; {detail}', skill))

story.append(PageBreak())
heading(story, "TRANSFERABLE QUALITY EXPERIENCE - 이전 직무")
story.append(Paragraph("AI Software QA 회사 경력은 없으며, 의료기관에서 약 8년간 수행한 품질관리 경험 중 지원 직무와 연결되는 역량만 요약했습니다.", small))
for item in ["매일 정도관리(QC)를 실행하고 기준 이탈 시 원인을 확인한 경험", "검사 결과의 정확성·재현성을 확인하고 레퍼런스를 재설정·재검증한 경험", "검사 장비 품질관리(QA), 결과 보고, 협업과 사내 교육 경험", "의료 결과가 진단과 치료로 이어지는 환경에서 근거와 기록을 중시한 경험"]:
    story.append(Paragraph(item, bullet, bulletText="•"))

heading(story, "EDUCATION & CERTIFICATIONS")
story.append(Paragraph("신흥대학교(현 신한대학교) | 임상병리과 졸업 · 보건전문학사", project_title))
story.append(Paragraph("임상병리사 면허 · MOS Word Expert · MOS Excel Expert · MOS PowerPoint · MOS Access", body))

heading(story, "TOOLS")
story.append(Paragraph("Python · pytest · k6 · Prometheus · Grafana · AWS EC2 · S3 · CloudTrail · Docker · GitHub Actions · Jupyter · Streamlit · MS Office", body))

heading(story, "PORTFOLIO EVIDENCE")
story.append(Paragraph("각 프로젝트의 문제 정의, 테스트 설계·실행, 결함·개선, 재검증 결과와 증빙은 포트폴리오와 GitHub 저장소에서 확인할 수 있습니다.", body))
story.append(Paragraph('<link href="https://dreamguswn-cmd.github.io/QC-starter-edu1/#projects">포트폴리오 프로젝트 자세히 보기</link>&nbsp;&nbsp;&nbsp;&nbsp;<link href="https://github.com/dreamguswn-cmd/QC-starter-edu1/tree/main/docs">GitHub QA 문서 보기</link>', link))

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
