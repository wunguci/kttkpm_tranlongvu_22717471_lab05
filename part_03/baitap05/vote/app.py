from flask import Flask, request, render_template_string
import redis

app = Flask(__name__)
r = redis.Redis(host='redis', port=6379, decode_responses=True)

html = """
<h1>🗳️ Voting App</h1>
<form method="POST">
    <button name="vote" value="A">Vote A</button>
    <button name="vote" value="B">Vote B</button>
    <button name="vote" value="C">Vote C</button>
</form>
<hr>
<h2>Results:</h2>
<p>A: {{ votes_a }}</p>
<p>B: {{ votes_b }}</p>
<p>C: {{ votes_c }}</p>
"""

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        vote = request.form.get("vote")
        if vote:
            r.lpush("votes", vote)
            print(f"Vote received: {vote}")
    
    # Get vote counts
    votes_a = r.get("votes_A") or "0"
    votes_b = r.get("votes_B") or "0"
    votes_c = r.get("votes_C") or "0"
    
    return render_template_string(html, votes_a=votes_a, votes_b=votes_b, votes_c=votes_c)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)