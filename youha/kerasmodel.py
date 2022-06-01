import pandas as pd
import tensorflow as tf
from tensorflow import keras
import numpy as np
from keras.preprocessing.text import Tokenizer
from sklearn.model_selection import train_test_split
from keras.preprocessing import sequence
from keras import backend as K
from tensorflow.keras.utils import plot_model
from keras.models import Sequential
from keras.layers import Dense, Activation,Embedding,Conv1D,MaxPooling1D,Flatten

class modelkeras():

    def kerasmd():
        initial_offset=0
        filename=test_model
        filepath = os.path.join('.\youha\output\keras_models', filename)


        x_train, x_test, y_train, y_test = train_test_split(total, labels, test_size=0.3)

        # It can be used to reconstruct the model identically.
        reconstructed_model = keras.models.load_model(filepath)

        # Let's check:
        print(reconstructed_model.predict(x_train))
        # np.testing.assert_allclose(
        #     model.predict(x_train), reconstructed_model.predict(x_train)
        # )

        filename1=test_model+".h5"
        filepath1 = os.path.join('.\youha\output\keras_models', filename1)

        # It can be used to reconstruct the model identically.
        reconstructed_model = keras.models.load_model(filepath1)

        # Let's check:
        reconstructed_model.predict(x_train)
        # np.testing.assert_allclose(
        #     model.predict(x_train), reconstructed_model.predict(x_train)
        # )