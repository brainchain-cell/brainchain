"""Collect official announcement links; never generate or copy article bodies."""
import hashlib
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FEEDS = [
    ('OpenAI', 'https://openai.com/news/rss.xml', {'openai.com', 'www.openai.com'}),
    ('Google AI', 'https://blog.google/innovation-and-ai/technology/ai/rss/', {'blog.google'}),
]
MAX_BYTES = 3_000_000

def validate_item(title, url, date, source, hosts, now):
    title = ' '.join(title.split())
    parsed = urlparse(url)
    if parsed.scheme != 'https' or parsed.hostname not in hosts or parsed.username or parsed.password:
        return None
    if not 8 <= len(title) <= 180 or '<' in title or '>' in title:
        return None
    try:
        when = parsedate_to_datetime(date)
        if when.tzinfo is None:
            return None
    except (ValueError, TypeError, OverflowError):
        return None
    if not now - timedelta(days=90) <= when <= now + timedelta(minutes=5):
        return None
    return {'id': hashlib.sha256(url.encode()).hexdigest()[:16], 'title':title,
            'url':url, 'source':source, 'date':when.astimezone(timezone.utc).isoformat()}

def collect():
    now = datetime.now(timezone.utc)
    found = {}
    failures = []
    for source, feed, hosts in FEEDS:
        try:
            req = urllib.request.Request(feed, headers={'User-Agent':'BrainchainFeedReader/1.0'})
            with urllib.request.urlopen(req, timeout=25) as response:
                if urlparse(response.url).hostname not in hosts:
                    raise ValueError('Unapproved feed redirect')
                raw = response.read(MAX_BYTES + 1)
            if len(raw)>MAX_BYTES or b'<!ENTITY' in raw or b'<!DOCTYPE' in raw:
                raise ValueError('Invalid or oversized XML')
            root = ET.fromstring(raw)
            accepted = []
            for item in root.findall('./channel/item'):
                row = validate_item(item.findtext('title',''),item.findtext('link',''),item.findtext('pubDate',''),source,hosts,now)
                if row:
                    accepted.append(row)
            for row in sorted(accepted,key=lambda row:row['date'],reverse=True)[:6]:
                found[row['id']] = row
            if not accepted:
                raise ValueError('No recent valid items')
        except Exception as exc:
            failures.append(source)
            print(f'{source}: refresh failed ({type(exc).__name__}); previous collection retained.', file=sys.stderr)
    # All-or-nothing refresh prevents one unavailable publisher silently disappearing.
    if failures:
        return 1
    items=sorted(found.values(),key=lambda row:row['date'],reverse=True)
    target=ROOT/'data/updates.json'
    encoded=json.dumps(items,ensure_ascii=False,indent=2)+'\n'
    if target.read_text()!=encoded:
        temporary=target.with_suffix('.tmp')
        temporary.write_text(encoded)
        temporary.replace(target)
    print(f'Validated {len(items)} original-source announcement links.')
    return 0

if __name__=='__main__':
    raise SystemExit(collect())
