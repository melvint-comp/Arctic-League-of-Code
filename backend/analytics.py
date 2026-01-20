import polars as pl
import numpy as np
from models import train_model

def analyze(entity, model_type, future_year):
    df = pl.read_csv("data.csv")
    c = df.filter(pl.col("Entity") == entity)

    X = c["Year"].to_numpy().reshape(-1,1)
    y = c["Primary energy consumption per capita (kWh/person)"].to_numpy()

    model, transformer = train_model(X, y, model_type)

    years = np.arange(2000, future_year + 1).reshape(-1,1)
    Xf = transformer.transform(years) if transformer else years
    preds = model.predict(Xf)

    energy_mix = {
        "Fossil": float(c["Electricity from fossil fuels (TWh)"].mean()),
        "Renewables": float(c["Electricity from renewables (TWh)"].mean()),
        "Nuclear": float(c["Electricity from nuclear (TWh)"].mean())
    }

    return {
        "years": list(range(2000, future_year + 1)),
        "predictions": preds.tolist(),
        "energy_mix": energy_mix,
        "location": {
            "entity": entity,
            "lat": float(c["Latitude"][0]),
            "lon": float(c["Longitude"][0])
        }
    }
