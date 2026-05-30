import requests
import time
import os
from datetime import datetime

URL = "https://www.itemmania.com/sell/ajax_list.php"
HEADERS = {
    "Referer": "https://www.itemmania.com/sell/list.html?search_game=5233",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}
DATA = {
    "search_game": "5233",
    "search_server": "",
    "search_goods": "all",
    "goods_type": "1",
    "trade_state": "1",
    "order": "1",
    "pinit": "1",
    "word": ""
}
INTERVAL = 10


def fetch_items():
    res = requests.post(URL, headers=HEADERS, data=DATA, timeout=10)
    result = res.json()
    if result["result"] != "SUCCESS":
        return []
    return result["data"].get("p", []) + result["data"].get("g", [])


def display(items):
    os.system("clear")
    now = datetime.now().strftime("%H:%M:%S")
    print(f"[갱신: {now}] 메이플랜드 시세 ({len(items)}건)")
    print(f"{'-'*60}")
    print(f"{'제목':<32} {'금액':<16} {'수량'}")
    print(f"{'-'*60}")
    for item in items:
        subject = item["trade_subject"][:30]
        price = item.get("ea_trade_money", f"{item['trade_money']}원")
        qty = item.get("ea_range", item.get("trade_quantity", "-"))
        print(f"{subject:<32} {price:<16} {qty}")
    print(f"{'-'*60}")
    print(f"10초 간격 | Ctrl+C 종료")


def main():
    while True:
        try:
            display(fetch_items())
            time.sleep(INTERVAL)
        except KeyboardInterrupt:
            print("\n종료")
            break
        except Exception as e:
            print(f"에러: {e}")
            time.sleep(INTERVAL)


if __name__ == "__main__":
    main()
