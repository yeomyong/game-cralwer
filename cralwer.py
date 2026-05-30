import requests

url = "https://www.itemmania.com/sell/ajax_list.php"
headers = {
    "Referer": "https://www.itemmania.com/sell/list.html?search_game=5233",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}
data = {
    "search_game": "5233",
    "search_server": "",
    "search_goods": "all",
    "goods_type": "",
    "trade_state": "1",
    "order": "2",
    "pinit": "1",
    "word": ""
}

res = requests.post(url, headers=headers, data=data)
result = res.json()

if result["result"] == "SUCCESS":
    items = result["data"].get("p", []) + result["data"].get("g", [])
    for item in items:
        signboard = item.get("signboard_name", "")
        ea_range = item.get("ea_range", "")
        ea_money = item.get("ea_trade_money", "")
        min_money = item.get("min_trade_money", "")
        reg_date = item.get("vw_trade_reg_date", "")

        print(f"{signboard}")
        print(f"  {ea_range}")
        print(f"  {ea_money}")
        if min_money:
            print(f"  {min_money}원")
        print(f"  {reg_date}")
        print()
