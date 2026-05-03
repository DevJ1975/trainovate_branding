#!/usr/bin/env python3
"""
Generate Trainovate letterhead.docx from scratch.

A docx is a zip of OpenXML parts. We write the four minimum parts
directly so we don't pull in python-docx or any other dependency.

Outputs:
  public/downloads/letterhead.docx
"""

import os
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "downloads" / "letterhead.docx"
OUT.parent.mkdir(parents=True, exist_ok=True)

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
"""

ROOT_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"""

DOC_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
</Relationships>
"""

# Minimal styles file declaring our two named styles. Word will fall back
# to defaults for anything else. Brand colors live as runtime fills.
STYLES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Inter Tight" w:hAnsi="Inter Tight" w:cs="Inter Tight"/>
        <w:sz w:val="22"/>
        <w:szCs w:val="22"/>
        <w:color w:val="0A0A0A"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:before="0" w:after="160" w:line="288" w:lineRule="auto"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="TVBrand">
    <w:name w:val="Trainovate Brand"/>
    <w:rPr>
      <w:rFonts w:ascii="Inter Tight" w:hAnsi="Inter Tight"/>
      <w:b/>
      <w:sz w:val="28"/>
      <w:color w:val="0A0A0A"/>
      <w:spacing w:val="-10"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="TVEyebrow">
    <w:name w:val="Trainovate Eyebrow"/>
    <w:rPr>
      <w:rFonts w:ascii="JetBrains Mono" w:hAnsi="JetBrains Mono"/>
      <w:caps/>
      <w:sz w:val="16"/>
      <w:color w:val="5C5C5C"/>
      <w:spacing w:val="40"/>
    </w:rPr>
  </w:style>
</w:styles>
"""

SETTINGS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:zoom w:percent="100"/>
  <w:defaultTabStop w:val="720"/>
  <w:characterSpacingControl w:val="doNotCompress"/>
</w:settings>
"""

THEME = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Trainovate">
  <a:themeElements>
    <a:clrScheme name="Trainovate">
      <a:dk1><a:srgbClr val="0A0A0A"/></a:dk1>
      <a:lt1><a:srgbClr val="F4F1EA"/></a:lt1>
      <a:dk2><a:srgbClr val="0036B5"/></a:dk2>
      <a:lt2><a:srgbClr val="E5EBFC"/></a:lt2>
      <a:accent1><a:srgbClr val="0046E6"/></a:accent1>
      <a:accent2><a:srgbClr val="FF3B30"/></a:accent2>
      <a:accent3><a:srgbClr val="0036B5"/></a:accent3>
      <a:accent4><a:srgbClr val="E5EBFC"/></a:accent4>
      <a:accent5><a:srgbClr val="5C5C5C"/></a:accent5>
      <a:accent6><a:srgbClr val="8A8A8A"/></a:accent6>
      <a:hlink><a:srgbClr val="0046E6"/></a:hlink>
      <a:folHlink><a:srgbClr val="0036B5"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Trainovate">
      <a:majorFont>
        <a:latin typeface="Inter Tight"/><a:ea typeface=""/><a:cs typeface=""/>
      </a:majorFont>
      <a:minorFont>
        <a:latin typeface="Inter Tight"/><a:ea typeface=""/><a:cs typeface=""/>
      </a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Trainovate">
      <a:fillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
      </a:fillStyleLst>
      <a:lnStyleLst>
        <a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>
        <a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>
        <a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>
      </a:lnStyleLst>
      <a:effectStyleLst>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
      </a:effectStyleLst>
      <a:bgFillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
      </a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>
"""

CORE = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
                   xmlns:dc="http://purl.org/dc/elements/1.1/"
                   xmlns:dcterms="http://purl.org/dc/terms/"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Trainovate.ai Letterhead</dc:title>
  <dc:creator>Trainovate.ai Brand Hub</dc:creator>
  <cp:lastModifiedBy>Trainovate.ai Brand Hub</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:modified>
</cp:coreProperties>
"""

APP = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
            xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Trainovate.ai Brand Hub</Application>
</Properties>
"""

# US Letter: 8.5x11in => 12240 x 15840 twips. Margins 1in.
# A header band sits above the body using a tall first-paragraph rule.
DOCUMENT = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <!-- Brand band: cobalt rule -->
    <w:p>
      <w:pPr>
        <w:pBdr>
          <w:bottom w:val="single" w:sz="36" w:space="1" w:color="0046E6"/>
        </w:pBdr>
        <w:spacing w:after="240"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Inter Tight" w:hAnsi="Inter Tight"/>
          <w:b/>
          <w:sz w:val="36"/>
          <w:color w:val="0A0A0A"/>
          <w:spacing w:val="-12"/>
        </w:rPr>
        <w:t>Trainovate</w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Inter Tight" w:hAnsi="Inter Tight"/>
          <w:sz w:val="36"/>
          <w:color w:val="8A8A8A"/>
          <w:spacing w:val="-12"/>
        </w:rPr>
        <w:t>.ai</w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="JetBrains Mono" w:hAnsi="JetBrains Mono"/>
          <w:caps/>
          <w:sz w:val="16"/>
          <w:color w:val="5C5C5C"/>
          <w:spacing w:val="40"/>
        </w:rPr>
        <w:tab/>
        <w:tab/>
        <w:tab/>
        <w:tab/>
        <w:tab/>
        <w:tab/>
        <w:t>Operational training, in the field.</w:t>
      </w:r>
    </w:p>

    <!-- Date line -->
    <w:p>
      <w:pPr><w:spacing w:before="240" w:after="240"/></w:pPr>
      <w:r>
        <w:rPr><w:rFonts w:ascii="JetBrains Mono" w:hAnsi="JetBrains Mono"/><w:sz w:val="18"/><w:color w:val="5C5C5C"/></w:rPr>
        <w:t>{{DATE}}</w:t>
      </w:r>
    </w:p>

    <!-- Recipient block -->
    <w:p><w:r><w:t>{{RECIPIENT_NAME}}</w:t></w:r></w:p>
    <w:p><w:r><w:t>{{RECIPIENT_ADDRESS_1}}</w:t></w:r></w:p>
    <w:p><w:r><w:t>{{RECIPIENT_ADDRESS_2}}</w:t></w:r></w:p>

    <!-- Salutation -->
    <w:p>
      <w:pPr><w:spacing w:before="320"/></w:pPr>
      <w:r><w:t>Dear {{RECIPIENT_FIRST_NAME}},</w:t></w:r>
    </w:p>

    <!-- Body placeholder -->
    <w:p>
      <w:r><w:t xml:space="preserve">Replace this paragraph with your message. The default body uses Inter Tight at 11pt with a 1.4 line height — the same rhythm the Trainovate web product uses, so anything you type here will read consistently with the rest of the brand surface.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t xml:space="preserve">Use the eyebrow style above the rule for short labels. Body type stays at the default. Keep paragraphs short — three lines or fewer reads best in print.</w:t></w:r>
    </w:p>

    <!-- Sign-off -->
    <w:p>
      <w:pPr><w:spacing w:before="320"/></w:pPr>
      <w:r><w:t>Sincerely,</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:before="640"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>{{SENDER_NAME}}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:rFonts w:ascii="JetBrains Mono" w:hAnsi="JetBrains Mono"/><w:sz w:val="18"/><w:color w:val="5C5C5C"/></w:rPr>
        <w:t>{{SENDER_TITLE}}</w:t>
      </w:r>
    </w:p>

    <!-- Footer rule -->
    <w:p>
      <w:pPr>
        <w:pBdr>
          <w:top w:val="single" w:sz="6" w:space="1" w:color="E2DDD0"/>
        </w:pBdr>
        <w:spacing w:before="640"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:rFonts w:ascii="JetBrains Mono" w:hAnsi="JetBrains Mono"/><w:caps/><w:sz w:val="14"/><w:color w:val="8A8A8A"/><w:spacing w:val="40"/></w:rPr>
        <w:t>Trainovate.ai</w:t>
        <w:tab/>
        <w:t>trainovate.ai</w:t>
        <w:tab/>
        <w:t>hello@trainovate.ai</w:t>
      </w:r>
    </w:p>

    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
      <w:cols w:space="720"/>
    </w:sectPr>
  </w:body>
</w:document>
"""

PLACEHOLDERS = {
    "DATE": "January 1, 2026",
    "RECIPIENT_NAME": "Recipient name",
    "RECIPIENT_ADDRESS_1": "Address line 1",
    "RECIPIENT_ADDRESS_2": "City, State ZIP",
    "RECIPIENT_FIRST_NAME": "First name",
    "SENDER_NAME": "Your name",
    "SENDER_TITLE": "Title · Trainovate.ai",
}


def fill(template: str) -> str:
    out = template
    for k, v in PLACEHOLDERS.items():
        out = out.replace("{{" + k + "}}", v)
    return out


def write_docx(path: Path) -> None:
    parts = {
        "[Content_Types].xml": CONTENT_TYPES,
        "_rels/.rels": ROOT_RELS,
        "word/_rels/document.xml.rels": DOC_RELS,
        "word/document.xml": fill(DOCUMENT),
        "word/styles.xml": STYLES,
        "word/settings.xml": SETTINGS,
        "word/theme/theme1.xml": THEME,
        "docProps/core.xml": CORE,
        "docProps/app.xml": APP,
    }
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        # [Content_Types].xml must be the first entry per the OPC spec
        ordered = ["[Content_Types].xml"] + [k for k in parts if k != "[Content_Types].xml"]
        for name in ordered:
            z.writestr(name, parts[name])
    print(f"wrote {path}  ({path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    write_docx(OUT)
