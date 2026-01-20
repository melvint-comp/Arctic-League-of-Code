from flask import Flask, request, jsonify
from analytics import analyze

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def run():
    data = request.json
    result = analyze(data["entity"], data["model"], int(data["year"]))

    result["insight"] = (
        f"Projected energy demand rises steadily, indicating "
        f"the need for accelerated renewable investment to meet SDG 7 targets."
    )

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
