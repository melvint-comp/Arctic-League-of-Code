import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.ensemble import RandomForestRegressor

def train_model(X, y, model_type):
    if model_type == "linear":
        model = LinearRegression()
        model.fit(X, y)
        return model, None

    if model_type == "poly":
        poly = PolynomialFeatures(degree=3)
        Xp = poly.fit_transform(X)
        model = LinearRegression().fit(Xp, y)
        return model, poly

    if model_type == "rf":
        model = RandomForestRegressor(n_estimators=200)
        model.fit(X, y)
        return model, None
