import unittest
from datetime import datetime, timezone
from refresh_updates import validate_item
class FeedChecks(unittest.TestCase):
    def setUp(self):
        self.now=datetime(2026,9,10,tzinfo=timezone.utc)
    def check(self,url='https://openai.com/news/example',date='Wed, 09 Sep 2026 12:00:00 GMT',title='An official announcement'):
        return validate_item(title,url,date,'OpenAI',{'openai.com'},self.now)
    def test_valid(self):self.assertIsNotNone(self.check())
    def test_bad_links(self):
        for url in ['javascript:alert(1)','https://openai.com.evil.test/a','http://openai.com/a','https://user:pass@openai.com/a']:
            self.assertIsNone(self.check(url=url))
    def test_bad_dates(self):
        for date in ['invalid','Thu, 10 Sep 2027 12:00:00 GMT','Wed, 01 Jan 2020 12:00:00 GMT']:
            self.assertIsNone(self.check(date=date))
    def test_markup(self):self.assertIsNone(self.check(title='<script>alert(1)</script>'))
if __name__=='__main__':unittest.main()
