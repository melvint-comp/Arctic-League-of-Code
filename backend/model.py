import polars as pl
import numpy as np
from sklearn.linear_model import LinearRegression

def predict_energy(entity, future_year):
    df = pl.read_csv("data.csv")

    country = df.filter(pl.col("Entity") == entity)
    X = country["Year"].to_numpy().reshape(-1, 1)
    y = country["Primary energy consumption per capita (kWh/person)"].to_numpy()

    model = LinearRegression()
    model.fit(X, y)

    years = np.arange(2000, future_year + 1)
    predictions = model.predict(years.reshape(-1, 1))

    return years.tolist(), predictions.tolist()
