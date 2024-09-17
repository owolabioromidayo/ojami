import os
import time
from dotenv import load_dotenv
import numpy as np
import uuid
import requests
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing import image
from pinecone import Pinecone
from pinecone import ServerlessSpec
from pydantic import BaseModel
from io import BytesIO


app = FastAPI()

load_dotenv()

api_key = os.getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=api_key)

base_model = ResNet50(weights="imagenet", include_top=False, pooling="avg")

index_name = "productimg-index"


class ImageURL(BaseModel):
    img_url: str


def create_index_if_not_exists():
    try:
        if index_name not in pc.list_indexes():
            pc.create_index(
                name=index_name,
                dimension=2048,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1"),
            )
            print(f"Index '{index_name}' created successfully.")
        else:
            print(f"Index '{index_name}' already exists.")
    except Exception as e:
        print(f"Error creating index: {str(e)}")


create_index_if_not_exists()


# Load and preprocess the image
def load_and_preprocess_image(img_url):
    try:
        response = requests.get(img_url)
        response.raise_for_status()

        img = image.load_img(BytesIO(response.content), target_size=(224, 224))

        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        return img_array
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error loading image: {str(e)}")


# Generate embeddings from the uploaded image
def get_image_embedding(model, img_url):
    img_array = load_and_preprocess_image(img_url)
    embedding = model.predict(img_array)
    return embedding.flatten().tolist()


@app.post("/api/upload_embedding")
async def upload_embedding(data: ImageURL):
    image_id = str(uuid.uuid4())
    embedding = get_image_embedding(base_model, data.img_url)
    while not pc.describe_index(index_name).status["ready"]:
        time.sleep(1)

    index = pc.Index(index_name)

    index.upsert(
        vectors=[
            {"id": image_id, "values": embedding},
        ],
        namespace="productimg-Embeddings",
    )

    return {"id": image_id, "message": "Embedding uploaded successfully."}


@app.post("/api/get_similar_embeddings")
async def get_similar_embeddings(data: ImageURL):
    try:
        embedding = get_image_embedding(base_model, data.img_url)

        index = pc.Index(index_name)

        query_response = index.query(
            namespace="productimg-Embeddings",
            vector=embedding,
            top_k=3,
            include_values=True,
            include_metadata=True,
        )

        results = [
            {
                "id": match["id"],
                "score": match["score"],
                # "values": match.get("values"),
                "metadata": match.get("metadata"),
            }
            for match in query_response["matches"]
        ]

        return {"similar_embeddings": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during query: {str(e)}")
