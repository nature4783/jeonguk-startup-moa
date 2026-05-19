from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any

import pandas as pd


MONTHLY_SALES_RULES = [
    (0, 10_000_000, "1천만 미만", 1),
    (10_000_000, 30_000_000, "1천만~3천만", 3),
    (30_000_000, 50_000_000, "3천만~5천만", 4),
    (50_000_000, 100_000_000, "5천만~1억", 5),
    (100_000_000, float("inf"), "1억 이상", 6),
]

PREMIUM_RULES = [
    (0, 30_000_000, "3천만 미만", 1),
    (30_000_000, 50_000_000, "3천만~5천만", 2),
    (50_000_000, 100_000_000, "5천만~1억", 3),
    (100_000_000, 200_000_000, "1억~2억", 4),
    (200_000_000, float("inf"), "2억 이상", 5),
]

PROFIT_RULES = [
    (0, 3_000_000, "300만 미만", 1),
    (3_000_000, 5_000_000, "300만~500만", 2),
    (5_000_000, 8_000_000, "500만~800만", 3),
    (8_000_000, 12_000_000, "800만~1,200만", 4),
    (12_000_000, float("inf"), "1,200만 이상", 5),
]

RENT_RULES = [
    (0, 1_000_000, "100만 미만", 1),
    (1_000_000, 2_000_000, "100만~200만", 2),
    (2_000_000, 3_000_000, "200만~300만", 3),
    (3_000_000, 5_000_000, "300만~500만", 4),
    (5_000_000, float("inf"), "500만 이상", 5),
]

PRIVATE_COLUMNS = {
    "raw_dong",
    "raw_detail_address",
    "raw_branch_name",
    "owner_name",
    "owner_phone",
    "customer_name",
    "internal_memo",
    "pos_original",
    "sales_sheet_original",
    "raw_address",
}


def numeric(value: Any) -> float:
    if pd.isna(value):
        return 0
    if isinstance(value, (int, float)):
        return float(value)
    cleaned = re.sub(r"[^0-9.]", "", str(value))
    return float(cleaned or 0)


def range_for(value: Any, rules: list[tuple[float, float, str, int]]) -> tuple[str, int]:
    amount = numeric(value)
    for minimum, maximum, label, bucket in rules:
        if minimum <= amount < maximum:
            return label, bucket
    return rules[0][2], rules[0][3]


def normalize_category(raw_category: Any) -> str:
    category = str(raw_category or "")
    if "커피" in category or "카페" in category:
        return "카페"
    if "치킨" in category:
        return "치킨"
    if "편의점" in category:
        return "편의점"
    if "무인" in category:
        return "무인점포"
    if "뷰티" in category:
        return "뷰티"
    return category or "기타"


def classify_brand_group(raw_brand_name: Any) -> str:
    brand = str(raw_brand_name or "")
    major = ["메가커피", "BBQ", "GS25", "CU", "스타벅스"]
    if any(name in brand for name in major):
        return "대형 프랜차이즈"
    if "무인" in brand:
        return "무인/자동화 브랜드"
    if brand:
        return "중소형 프랜차이즈"
    return "개인 브랜드"


def public_code(raw_id: Any, row_number: int) -> str:
    suffix = re.sub(r"[^0-9]", "", str(raw_id))[-4:] or str(row_number + 1).zfill(4)
    return f"JM-2026-{suffix.zfill(4)}"


def transform_row(row: pd.Series, row_number: int) -> dict[str, Any]:
    category = normalize_category(row.get("raw_category"))
    sales_range, sales_bucket = range_for(row.get("monthly_sales"), MONTHLY_SALES_RULES)
    premium_range, premium_bucket = range_for(row.get("premium"), PREMIUM_RULES)
    profit_range, profit_bucket = range_for(row.get("estimated_profit"), PROFIT_RULES)
    rent_range, _rent_bucket = range_for(row.get("rent"), RENT_RULES)
    sido = str(row.get("raw_sido") or "").strip()
    sigungu = str(row.get("raw_sigungu") or "").strip()

    return {
        "raw_listing_id": row.get("id"),
        "public_code": public_code(row.get("id"), row_number),
        "title": f"{sido} {sigungu} {category} 양도양수 매물".strip(),
        "brand_group": classify_brand_group(row.get("raw_brand_name")),
        "category": category,
        "sido": sido,
        "sigungu": sigungu,
        "region_label": f"{sido} {sigungu}".strip(),
        "monthly_sales_range": sales_range,
        "premium_range": premium_range,
        "estimated_profit_range": profit_range,
        "rent_range": rent_range,
        "monthly_sales_bucket": sales_bucket,
        "premium_bucket": premium_bucket,
        "estimated_profit_bucket": profit_bucket,
        "size_range": "검수 후 공개",
        "floor_type": "상담 시 안내",
        "operation_period_range": "검수 후 공개",
        "summary": f"{sido} {sigungu} 상권의 {category} 매물입니다. 월매출은 {sales_range} 범위로 검수되었습니다.",
        "highlights": ["정제 완료", "주소 비공개", "상담 후 상세자료"],
        "recommended_for": ["조건 비교 고객", "상담 희망 고객"],
        "is_public": False,
    }


def assert_private_columns_removed(records: list[dict[str, Any]]) -> None:
    for record in records:
        leaked = PRIVATE_COLUMNS.intersection(record.keys())
        if leaked:
            raise ValueError(f"Private columns leaked into public output: {sorted(leaked)}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="CSV exported from raw_listings")
    parser.add_argument("--output", required=True, help="Destination JSON file for public_listings")
    args = parser.parse_args()

    raw = pd.read_csv(args.input)
    records = [transform_row(row, index) for index, row in raw.iterrows()]
    assert_private_columns_removed(records)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
