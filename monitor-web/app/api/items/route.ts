import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://www.itemmania.com/sell/ajax_list.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: "https://www.itemmania.com/sell/list.html?search_game=5233",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
    body: new URLSearchParams({
      search_game: "5233",
      search_server: "",
      search_goods: "all",
      goods_type: "",
      trade_state: "1",
      order: "2",
      pinit: "1",
      word: "",
    }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.result !== "SUCCESS") {
    return NextResponse.json({ items: [] });
  }

  const items = (json.data.g || []).map((item: any) => ({
    id: item.trade_id,
    subject: item.trade_subject,
    signboard: item.signboard_name || "",
    price: item.ea_trade_money || `${item.trade_money}원`,
    quantity: item.ea_range || item.trade_quantity || "-",
    minPrice: item.min_trade_money || "",
    premium: item.premium === "p",
    regDate: item.vw_trade_reg_date || item.reg_date,
  }));

  return NextResponse.json({ items });
}
