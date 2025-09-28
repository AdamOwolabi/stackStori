# backend/app/database/hello.py
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from uuid import uuid4

# load .env from project root
load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE")  # service role key

print("Supabase URL:", url)  # quick debug
supabase: Client = create_client(url, key)

schema_response = supabase.table("game_session").select("*").limit(1).execute()
print(schema_response)
# Try a simple test query
response = supabase.table("game_session").select("id").execute()
print("Supabase response:", response.data)

player_id = supabase.table("player_profile").insert({
    "user_name": "watermelon",
    "risk_profile": "conservative",
    "net_worth": 1000,
    "max_net_worth": 1000
}).execute()
#print(res.data)

# Insert one row 
many_response = supabase.table("game_session").insert({
        "player_id": player_id.data[0]["id"],   # ✅ this one matches an existing player now
        "state_blob_json": {"assets": 1000},
        "difficulty_version": "EASY",
        "last_event": "Game started",
        "ai_model": "Gemini",
        "check_sum": "abc123",
        "state_version": 1
    }).execute()





# supabase.table("game_session").insert([
#     {
#         "player_id": str(uuid4()),
#         "state_blob_json": {"assets": 1000, "age": 22},
#         "difficulty_version": "MEDIUM",
#         "last_event": "First job",
#         "ai_model": "gemini-1.5-pro",
#         "check_sum": "seed1",
#         "state_version": 1
#     }
    # {
    #     "player_id": str(uuid4()),
    #     "state_blob_json": {"assets": 1500, "age": 23},
    #     "difficulty_version": "HARD",
    #     "last_event": "Bull market",
    #     "ai_model": "gemini-1.5",
    #     "check_sum": "seed2",
    #     "state_version": 1
    # }
# ]).execute()

print("Insert many response:", many_response.data)