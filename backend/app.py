from flask import Flask, request, jsonify
from model import predict_energy

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    entity = data["entity"]
    year = int(data["year"])

    years, values = predict_energy(entity, year)
    return jsonify({
        "years": years,
        "values": values
    })

if __name__ == "__main__":
    app.run(debug=True)
